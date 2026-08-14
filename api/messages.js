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
    res.status(500).json({ error: "Supabase yapılandırması eksik" });
    return;
  }

  const headers = {
    apikey: SUPA_KEY,
    Authorization: "Bearer " + SUPA_KEY,
    "Content-Type": "application/json"
  };

  try {
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
        "&select=client_id,role,content,created_at" +
        "&order=created_at.asc" +
        "&limit=5000";

      const response = await fetch(url, { headers });

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
          id:
            message.client_id ||
            crypto.randomUUID(),
          r: message.role,
          t: message.content
        }))
      );

      return;
    }

    if (req.method === "POST") {
      const {
        userId,
        dilId,
        hocaId,
        messages
      } = req.body || {};

      if (!userId || !dilId || !hocaId) {
        res.status(400).json({ error: "Eksik parametre" });
        return;
      }

      if (!Array.isArray(messages)) {
        res.status(400).json({
          error: "Geçersiz messages verisi"
        });
        return;
      }

      const temizMesajlar = messages.filter(
        message =>
          message &&
          typeof message.r === "string" &&
          typeof message.t === "string" &&
          message.t.trim() !== ""
      );

      if (temizMesajlar.length === 0) {
        res.status(200).json({
          ok: true,
          saved: 0
        });
        return;
      }

      const eksikId = temizMesajlar.some(
        message =>
          !message.id ||
          typeof message.id !== "string"
      );

      if (eksikId) {
        res.status(400).json({
          error: "Mesajlarda benzersiz id bulunamadı"
        });
        return;
      }

      const rows = temizMesajlar.map(message => ({
        user_id: String(userId),
        dil_id: String(dilId),
        hoca_id: String(hocaId),
        client_id: String(message.id),
        role: message.r,
        content: message.t
      }));

      const response = await fetch(
        SUPA_URL +
        "/rest/v1/ders_mesajlar" +
        "?on_conflict=user_id,dil_id,hoca_id,client_id",
        {
          method: "POST",
          headers: {
            ...headers,
            Prefer:
              "resolution=ignore-duplicates,return=minimal"
          },
          body: JSON.stringify(rows)
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        res.status(500).json({
          error: "Mesajlar kaydedilemedi",
          details: errorText
        });
        return;
      }

      res.status(200).json({
        ok: true,
        saved: rows.length
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