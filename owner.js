const { ownerNumber } = require("../config");

let mode = "public";

module.exports = {
  name: "owner",
  getMode: () => mode,
  run: async (sock, msg, from, sender, args, command) => {
    const isOwner = sender.includes(ownerNumber);
    if (!isOwner)
      return sock.sendMessage(from, { text: "Owner only." }, { quoted: msg });

    if (command === "public") {
      mode = "public";
      return sock.sendMessage(from, { text: "Mode: PUBLIC" }, { quoted: msg });
    }

    if (command === "self") {
      mode = "self";
      return sock.sendMessage(from, { text: "Mode: SELF" }, { quoted: msg });
    }

    if (command === "mode") {
      return sock.sendMessage(from, { text: `Mode: ${mode}` }, { quoted: msg });
    }

    if (command === "owner") {
      return sock.sendMessage(from, { text: `Owner: wa.me/${ownerNumber}` });
    }
  }
};
