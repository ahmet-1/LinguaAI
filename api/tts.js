export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION || "switzerlandwest";

  if (!key) {
    return res.status(500).json({ error: "AZURE_SPEECH_KEY eksik." });
  }

  try {
    const { text, language, gender } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Metin eksik." });
    }

    const lang = (language || "tr-TR").toLowerCase();
    const isMale = gender === "male" || gender === "erkek" || true; // varsayılan erkek hoca

    // Dile ve cinsiyete göre Azure Neural Ses Seçimi
    let voice = "tr-TR-AhmetNeural";
    if (lang.startsWith("ar")) {
      voice = isMale ? "ar-SA-HamedNeural" : "ar-SA-ZariyahNeural";
    } else if (lang.startsWith("en")) {
      voice = isMale ? "en-US-GuyNeural" : "en-US-JennyNeural";
    } else if (lang.startsWith("de")) {
      voice = isMale ? "de-DE-ConradNeural" : "de-DE-KatjaNeural";
    } else if (lang.startsWith("fr")) {
      voice = isMale ? "fr-FR-HenriNeural" : "fr-FR-DeniseNeural";
    } else if (lang.startsWith("ru")) {
      voice = isMale ? "ru-RU-DmitryNeural" : "ru-RU-SvetlanaNeural";
    }

    const ssml = `<speak version='1.0' xml:lang='${language || "ar-SA"}'>
      <voice name='${voice}'>${text}</voice>
    </speak>`;

    const endpoint = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;

    const azureRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
        "User-Agent": "LisanOgrenApp"
      },
      body: ssml
    });

    if (!azureRes.ok) {
      const errText = await azureRes.text();
      return res.status(azureRes.status).json({ error: errText });
    }

    const audioArrayBuffer = await azureRes.arrayBuffer();
    const buffer = Buffer.from(audioArrayBuffer);

    res.setHeader("Content-Type", "audio/mpeg");
    return res.status(200).send(buffer);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
