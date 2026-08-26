export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { audioBase64, referenceText, language } = req.body || {};
    const key = process.env.AZURE_SPEECH_KEY;
    const region = process.env.AZURE_SPEECH_REGION || 'eastus';

    if (!key) {
      return res.status(200).json({ error: 'Azure Speech Key Vercel ortam değişkenlerinde eksik.' });
    }
    if (!audioBase64) {
      return res.status(200).json({ error: 'Ses kaydı alınamadı, lütfen tekrar konuşun.' });
    }

    const lang = language || 'ar-SA';
    const cleanRef = (referenceText || 'مرحبا').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').trim();

    const pronConfig = {
      ReferenceText: cleanRef,
      GradingSystem: "HundredMark",
      Granularity: "Word",
      Dimension: "Comprehensive",
      EnableMiscue: true
    };

    const pronHeader = Buffer.from(JSON.stringify(pronConfig)).toString('base64');
    const audioBuffer = Buffer.from(audioBase64, 'base64');
    const url = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${lang}&format=detailed`;

    const azureRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
        'Ocp-Apim-Subscription-Key': key,
        'Pronunciation-Assessment': pronHeader
      },
      body: audioBuffer
    });

    const resText = await azureRes.text();
    if (!resText || resText.trim().length === 0) {
      return res.status(200).json({ error: 'Ses algılanamadı. Lütfen mikrofona biraz daha yakın ve net okuyun.' });
    }

    let data;
    try {
      data = JSON.parse(resText);
    } catch (e) {
      return res.status(200).json({ error: 'Ses formatı işlenemedi. Lütfen tekrar deneyin.' });
    }

    const nbest = data.NBest && data.NBest[0];
    if (!nbest) {
      return res.status(200).json({ error: 'Okuma anlaşılamadı. Lütfen tekrar okuyun.' });
    }

    const pa = nbest.PronunciationAssessment || {};
    const words = (nbest.Words || []).map(w => {
      const wScore = w.PronunciationAssessment ? w.PronunciationAssessment.AccuracyScore : 0;
      const errorType = w.PronunciationAssessment ? w.PronunciationAssessment.ErrorType : 'None';
      let durumMesaj = '✅ Doğru';
      if (errorType === 'Mispronunciation' || wScore < 60) durumMesaj = '❌ Hatalı';
      else if (errorType === 'Omission') durumMesaj = '⚠️ Atlandı';
      else if (wScore < 80) durumMesaj = '🟡 Geliştirilmeli';

      return {
        word: w.Word,
        accuracyScore: Math.round(wScore),
        durumMesaj: durumMesaj
      };
    });

    return res.status(200).json({
      pronScore: Math.round(pa.PronScore || 0),
      accuracyScore: Math.round(pa.AccuracyScore || 0),
      fluencyScore: Math.round(pa.FluencyScore || 0),
      words: words,
      okunanMetin: nbest.Display || cleanRef
    });

  } catch (err) {
    return res.status(200).json({ error: 'Değerlendirme yapılamadı: ' + err.message });
  }
}
