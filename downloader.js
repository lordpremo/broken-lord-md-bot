const fetch = require("node-fetch");

module.exports = {
  name: "downloader",
  run: async (sock, msg, from, sender, args, command) => {
    if (["play", "ytmp3"].includes(command)) {
      const query = args.join(" ");
      if (!query)
        return sock.sendMessage(from, { text: "Type song name." });

      const url = `https://api.nexray.web.id/downloader/ytplay?q=${encodeURIComponent(
        query
      )}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        await sock.sendMessage(
          from,
          {
            audio: { url: data.result.url },
            mimetype: "audio/mpeg",
            caption: data.result.title
          },
          { quoted: msg }
        );
      } catch {
        sock.sendMessage(from, { text: "Error fetching audio." });
      }
    }
  }
};
