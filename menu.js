module.exports = {
  name: "menu",
  run: async (sock, msg, from) => {
    const text = `
╔══════════════════════╗
║      BROKEN LORD MD       ║
╚══════════════════════╝

🌷 OWNER COMMANDS
  • .owner
  • .public
  • .self
  • .mode

🌸 GROUP COMMANDS
  • .tagall
  • .kick
  • .promote
  • .demote
  • .open
  • .close
  • .link
  • .resetlink

🎵 DOWNLOADER
  • .play
  • .ytmp3

🤖 AI
  • .chatgpt
  • .mathgpt

🛠 TOOLS
  • .vcc visa
  • .vcc mastercard
`;

    sock.sendMessage(from, { text }, { quoted: msg });
  }
};
