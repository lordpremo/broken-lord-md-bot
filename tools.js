const fetch = require("node-fetch");

module.exports = {
  name: "tools",
  run: async (sock, msg, from, sender, args, command) => {
    if (command === "vcc") {
      const type = args[0] || "visa";
      const url = `https://api.nexray.web.id/tools/vcc?type=${type}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        sock.sendMessage(
          from,
          {
            text:
              `VCC (${type.toUpperCase()})\n\n` +
              "```" +
              JSON.stringify(data, null, 2) +
              "```"
          },
          { quoted: msg }
        );
      } catch {
        sock.sendMessage(from, { text: "VCC error." });
      }
    }
  }
};
