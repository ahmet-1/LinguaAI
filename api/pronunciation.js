export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION || "switzerlandwest";

  if (!key) {
    return res.status(500).json({ error: "AZURE_SPEECH_KEY tanımlı değil." });
  }

  try {
    const { audioBase64, referenceText, language, audioMimeType } = req.body;

    if (!audioBase64 || !referenceText) {
      return res.status(400).json({ error: "Ses veya referans metin eksik." });
    }

    const audioBuffer = Buffer.from(audioBase64, "base64");
    const lang = language || "tr-TR";

    // Tarayıcının gönderdiği ses tipine göre Azure Content-Type belirleme
    let contentType = "audio/ogg; codecs=opus";
    const mime = (audioMimeType || "").toLowerCase();

    if (mime.includes("wav")) {
      contentType = "audio/wav; codecs=audio/pcm; samplerate=16000";
    } else if (mime.includes("ogg")) {
      contentType = "audio/ogg; codecs=opus";
    } else if (mime.includes("webm")) {
      contentType = "audio/webm; codecs=opus";
    }

    const pronParams = {
      ReferenceText: referenceText,
      GradingSystem: "HundredMark",
      Granularity: "Word",
      Dimension: "Comprehensive",
      ScenarioId: ""
    };

    const pronHeader = Buffer.from(JSON.stringify(pronParams)).toString("base64");
    const endpoint = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${encodeURIComponent(lang)}&format=detailed`;

    const azureRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Pronunciation-Assessment": pronHeader,
        "Content-Type": contentType,
        "Accept": "application/json;text/xml"
      },
      body: audioBuffer
    });

    const rawText = await azureRes.text();
    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      return res.status(azureRes.status || 400).json({
        error: "Azure ses biçimini çözümleyemedi. Lütfen tekrar deneyin.",
        raw: rawText
      });
    }

    if (!azureRes.ok) {
      return res.status(azureRes.status).json({
        error: data.Message || data.RecognitionStatus || "Azure API Hatası",
        details: data
      });
    }

    const nbest = (data.NBest && data.NBest[0]) ? data.NBest[0] : null;

    if (!nbest || !nbest.PronunciationAssessment) {
      return res.status(200).json({
        pronScore: 60,
        accuracyScore: 60,
        fluencyScore: 60,
        completenessScore: 60,
        words: []
      });
    }

    const pa = nbest.PronunciationAssessment;
    const words = (nbest.Words || []).map(w => ({
      word: w.Word,
      accuracyScore: w.PronunciationAssessment ? w.PronunciationAssessment.AccuracyScore : 0
    }));

    return res.status(200).json({
      pronScore: pa.PronScore !== undefined ? pa.PronScore : (pa.AccuracyScore || 0),
      accuracyScore: pa.AccuracyScore || 0,
      fluencyScore: pa.FluencyScore || 0,
      completenessScore: pa.CompletenessScore || 0,
      words: words
    });
  } catch (err) {
    return res.status(500).json({ error: "Sunucu hatası: " + err.message });
  }
}
