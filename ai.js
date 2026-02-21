const fetch = require("node-fetch");

module.exports = {
  name: "ai",
  run: async (sock, msg, from, sender, args, command) => {
    const text = args.join(" ");

    if (command === "chatgpt") {
      const url = `https://api.nexray.web.id/ai/turbochat?text=${encodeURIComponent(
        text
      )}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        sock.sendMessage(from, { text: data.result });
      } catch {
        sock.sendMessage(from, { text: "AI error." });
      }
    }

    if (command === "mathgpt") {
      const url = `https://api.nexray.web.id/ai/mathgpt?text=${encodeURIComponent(
        text
      )}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        sock.sendMessage(from, { text: data.result });
      } catch {
        sock.sendMessage(from, { text: "Math error." });
      }
    }
  }
};
