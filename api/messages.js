export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const SUPA_URL = process.env.SUPABASE_URL;
  const SUPA_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPA_URL || !SUPA_KEY) {
    res.status(200).json([]);
    return;
  }

  const headers = {
    "apikey": SUPA_KEY,
    "Authorization": "Bearer " + SUPA_KEY,
    "Content-Type": "application/json"
  };

  try {
    // --------------------------------------------------
    // GET: KONUŞMALARIN TAMAMINI GETİR
    // --------------------------------------------------
    if (req.method === "GET") {
      const { userId, dilId, hocaId } = req.query;

      if (!userId || !dilId || !hocaId) {
        res.status(400).json({ error: "Eksik parametre" });
        return;
      }

      const url =
        SUPA_URL +
        "/rest/v1/ders_mesajlar" +
        "?user_id=eq." + encodeURIComponent(userId) +
        "&dil_id=eq." + encodeURIComponent(dilId) +
        "&hoca_id=eq." + encodeURIComponent(hocaId) +
        "&select=role,content,created_at" +
        "&order=created_at.asc" +
        "&limit=5000";

      const response = await fetch(url, {
        headers
      });

      if (!response.ok) {
        const errorText = await response.text();
        res.status(500).json({
          error: "Mesajlar alınamadı",
          details: errorText
        });
        return;
      }

      const data = await response.json();

      res.status(200).json(
        (data || []).map(message => ({
          r: message.role,
          t: message.content
        }))
      );

      return;
    }

    // --------------------------------------------------
    // POST: YENİ MESAJLARI KAYDET
    // --------------------------------------------------
    if (req.method === "POST") {
      const { userId, dilId, hocaId, messages } = req.body || {};

      if (!userId || !dilId || !hocaId) {
        res.status(400).json({ error: "Eksik parametre" });
        return;
      }

      if (!Array.isArray(messages)) {
        res.status(400).json({ error: "Geçersiz messages verisi" });
        return;
      }

      const baseUrl =
        SUPA_URL +
        "/rest/v1/ders_mesajlar" +
        "?user_id=eq." + encodeURIComponent(userId) +
        "&dil_id=eq." + encodeURIComponent(dilId) +
        "&hoca_id=eq." + encodeURIComponent(hocaId) +
        "&select=id,role,content" +
        "&order=created_at.asc" +
        "&limit=5000";

      const existingResponse = await fetch(baseUrl, {
        headers
      });

      if (!existingResponse.ok) {
        const errorText = await existingResponse.text();
        res.status(500).json({
          error: "Mevcut mesajlar alınamadı",
          details: errorText
        });
        return;
      }

      const existing = await existingResponse.json();

      const oldMessages = (existing || []).map(message => ({
        r: message.role,
        t: message.content
      }));

      const incomingMessages = messages.filter(
        message =>
          message &&
          typeof message.r === "string" &&
          typeof message.t === "string" &&
          message.t.trim() !== ""
      );

      // --------------------------------------------------
      // ÖNEMLİ:
      // ARTIK existCount KULLANILMIYOR.
      //
      // Böylece konuşma 100 mesajı geçtiğinde:
      // "existing.length kadar slice et"
      // hatası oluşmayacak.
      // --------------------------------------------------

      let commonLength = 0;

      const maxCommonLength = Math.min(
        oldMessages.length,
        incomingMessages.length
      );

      while (
        commonLength < maxCommonLength &&
        oldMessages[commonLength].r === incomingMessages[commonLength].r &&
        oldMessages[commonLength].t === incomingMessages[commonLength].t
      ) {
        commonLength++;
      }

      const newMessages = incomingMessages.slice(commonLength);

      if (newMessages.length > 0) {
        const rows = newMessages.map(message => ({
          user_id: String(userId),
          dil_id: String(dilId),
          hoca_id: String(hocaId),
          role: message.r,
          content: message.t
        }));

        const insertResponse = await fetch(
          SUPA_URL + "/rest/v1/ders_mesajlar",
          {
            method: "POST",
            headers: {
              ...headers,
              "Prefer": "return=minimal"
            },
            body: JSON.stringify(rows)
          }
        );

        if (!insertResponse.ok) {
          const errorText = await insertResponse.text();

          res.status(500).json({
            ok: false,
            error: "Yeni mesajlar kaydedilemedi",
            details: errorText
          });

          return;
        }
      }

      res.status(200).json({
        ok: true,
        saved: newMessages.length,
        totalIncoming: incomingMessages.length,
        totalExisting: oldMessages.length
      });

      return;
    }

    res.status(405).json({
      error: "Method not allowed"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message || "Sunucu hatası"
    });
  }
}