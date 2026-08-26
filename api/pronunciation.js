export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  try {
    const { audioBase64, referenceText, language } = req.body || {};
    const key = process.env.AZURE_SPEECH_KEY;
    const region = process.env.AZURE_SPEECH_REGION || 'eastus';

    if (!key) return res.status(500).json({ error: 'Azure Speech Key bulunamadı.' });

    const lang = language || 'ar-SA';
    const cleanRef = (referenceText || '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').trim();

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

    const data = await azureRes.json();
    const nbest = data.NBest && data.NBest[0];

    if (!nbest) {
      return res.status(200).json({
        error: "Ses anlaşılamadı. Lütfen mikrofona daha yakın ve net okuyun."
      });
    }

    const pa = nbest.PronunciationAssessment || {};
    
    // Kelime kelime analiz ve hata tespiti
    const words = (nbest.Words || []).map(w => {
      const wScore = w.PronunciationAssessment ? w.PronunciationAssessment.AccuracyScore : 0;
      const errorType = w.PronunciationAssessment ? w.PronunciationAssessment.ErrorType : 'None';
      let durum = 'dogru';
      let durumMesaj = 'Doğru okundu';
      
      if (errorType === 'Mispronunciation' || wScore < 60) {
        durum = 'yanlis';
        durumMesaj = 'Hatalı telaffuz';
      } else if (errorType === 'Omission') {
        durum = 'atlanmis';
        durumMesaj = 'Okunmadı / Atlandı';
      } else if (wScore < 80) {
        durum = 'orta';
        durumMesaj = 'Geliştirilebilir';
      }

      return {
        kelime: w.Word,
        skor: Math.round(wScore),
        durum: durum,
        durumMesaj: durumMesaj
      };
    });

    const hataliKelimeler = words.filter(w => w.durum === 'yanlis' || w.durum === 'atlanmis');

    return res.status(200).json({
      genelSkor: Math.round(pa.PronScore || 0),
      dogruluk: Math.round(pa.AccuracyScore || 0),
      akicilik: Math.round(pa.FluencyScore || 0),
      kelimeler: words,
      hataliKelimeler: hataliKelimeler,
      okunanMetin: nbest.Display || cleanRef
    });

  } catch (err) {
    return res.status(500).json({ error: "Değerlendirme yapılamadı: " + err.message });
  }
}
