const fetch = require("node-fetch");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const { number } = req.body;

  if (!number) {
    return res.json({ error: "Missing number" });
  }

  try {
    const api = await fetch(
      `https://api.nexray.web.id/whatsapp/pair?number=${number}`
    );

    const data = await api.json();

    return res.json({ code: data.code });
  } catch (e) {
    return res.json({ error: "Bot offline or API error" });
  }
};
