const https = require('https');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { audioBase64, referenceText, language } = req.body || {};
    if (!audioBase64 || !referenceText) {
      return res.status(200).json({ error: 'Ses veya referans metin alınamadı.' });
    }

    const key = process.env.AZURE_SPEECH_KEY || process.env.AZURESPEECHKEY || '9ef87b32c66d4001a1db93998f458e0a';
    const region = process.env.AZURE_SPEECH_REGION || process.env.AZURESPEECHREGION || 'eastus';

    let langCode = language || 'ar-SA';
    if (langCode.includes('ar')) langCode = 'ar-SA';
    if (langCode.includes('en')) langCode = 'en-US';
    if (langCode.includes('tr')) langCode = 'tr-TR';

    const pronParams = JSON.stringify({
      ReferenceText: referenceText,
      GradingSystem: 'HundredMark',
      Granularity: 'Word',
      Dimension: 'Comprehensive'
    });
    const pronHeader = Buffer.from(pronParams).toString('base64');
    const audioData = Buffer.from(audioBase64, 'base64');

    const options = {
      hostname: `${region}.stt.speech.microsoft.com`,
      path: `/speech/recognition/conversation/cognitiveservices/v1?language=${langCode}&format=detailed`,
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
        'Pronunciation-Assessment': pronHeader,
        'Accept': 'application/json',
        'Content-Length': audioData.length
      }
    };

    const azureReq = https.request(options, (azureRes) => {
      let responseBody = '';
      azureRes.on('data', (chunk) => { responseBody += chunk; });
      azureRes.on('end', () => {
        try {
          const data = JSON.parse(responseBody);
          if (data.RecognitionStatus === 'Success' && data.NBest && data.NBest[0]) {
            const nb = data.NBest[0];
            const pa = nb.PronunciationAssessment || {};
            const words = (nb.Words || []).map(w => ({
              word: w.Word,
              accuracyScore: (w.PronunciationAssessment && w.PronunciationAssessment.AccuracyScore) || 0
            }));
            return res.status(200).json({
              pronScore: pa.PronScore || 0,
              accuracyScore: pa.AccuracyScore || 0,
              fluencyScore: pa.FluencyScore || 0,
              words: words
            });
          }
          return res.status(200).json({
            error: 'Ses algılanamadı (' + (data.RecognitionStatus || 'Tekrar deneyin') + '). Lütfen mikrofona yakından okuyun.'
          });
        } catch (e) {
          return res.status(200).json({ error: 'Azure yanıtı işlenemedi: ' + responseBody.slice(0, 50) });
        }
      });
    });

    azureReq.on('error', (e) => {
      return res.status(200).json({ error: 'Azure bağlantı hatası: ' + e.message });
    });

    azureReq.write(audioData);
    azureReq.end();

  } catch (err) {
    return res.status(200).json({ error: 'Sunucu hatası: ' + err.message });
  }
};
