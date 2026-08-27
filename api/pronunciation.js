module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { audioBase64, referenceText, language } = req.body || {};
    if (!audioBase64 || !referenceText) {
      return res.status(400).json({ error: 'Ses veya referans metin eksik.' });
    }

    const key = process.env.AZURE_SPEECH_KEY || process.env.AZURESPEECHKEY;
    const region = process.env.AZURE_SPEECH_REGION || process.env.AZURESPEECHREGION || 'eastus';

    if (!key) {
      return res.status(500).json({ error: 'Azure Speech API anahtarı yapılandırılmamış.' });
    }

    // Dil kodunu Azure standartlarına zorla
    let langCode = language || 'ar-SA';
    if (langCode === 'ar' || langCode.includes('ar')) langCode = 'ar-SA';
    if (langCode === 'en' || langCode.includes('en')) langCode = 'en-US';
    if (langCode === 'tr' || langCode.includes('tr')) langCode = 'tr-TR';

    const audioBuffer = Buffer.from(audioBase64, 'base64');

    const pronAssessmentParams = {
      ReferenceText: referenceText,
      GradingSystem: 'HundredMark',
      Granularity: 'Word',
      Dimension: 'Comprehensive'
    };
    const pronHeader = Buffer.from(JSON.stringify(pronAssessmentParams)).toString('base64');

    const endpoint = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${langCode}&format=detailed`;

    const azureRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
        'Pronunciation-Assessment': pronHeader,
        'Accept': 'application/json'
      },
      body: audioBuffer
    });

    const data = await azureRes.json();

    if (data.RecognitionStatus === 'Success' && data.NBest && data.NBest[0]) {
      const nbest = data.NBest[0];
      const pa = nbest.PronunciationAssessment || {};
      const words = (nbest.Words || []).map(w => ({
        word: w.Word,
        accuracyScore: (w.PronunciationAssessment && w.PronunciationAssessment.AccuracyScore) || 0,
        errorType: (w.PronunciationAssessment && w.PronunciationAssessment.ErrorType) || 'None'
      }));

      return res.status(200).json({
        pronScore: pa.PronScore || 0,
        accuracyScore: pa.AccuracyScore || 0,
        fluencyScore: pa.FluencyScore || 0,
        completenessScore: pa.CompletenessScore || 0,
        words: words
      });
    }

    // Eğer Azure sessizlik veya tanıma hatası verdiyse detaylı bilgi dön
    return res.status(200).json({
      error: 'Ses algılanamadı (' + (data.RecognitionStatus || 'NoMatch') + '). Lütfen mikrofona konuşup tekrar deneyin.'
    });

  } catch (err) {
    return res.status(500).json({ error: 'Değerlendirme servisinde hata: ' + err.message });
  }
};
