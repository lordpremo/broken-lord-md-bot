module.exports = {
  name: "group",
  run: async (sock, msg, from, sender, args, command) => {
    const isGroup = from.endsWith("@g.us");
    if (!isGroup)
      return sock.sendMessage(from, { text: "Group only." }, { quoted: msg });

    const meta = await sock.groupMetadata(from);
    const admins = meta.participants.filter(p => p.admin);
    const isAdmin = admins.some(a => a.id === sender);

    if (!isAdmin)
      return sock.sendMessage(from, { text: "Admin only." }, { quoted: msg });

    if (command === "tagall") {
      const mentions = meta.participants.map(p => p.id);
      const text = mentions.map(m => "@" + m.split("@")[0]).join(" ");
      return sock.sendMessage(from, { text, mentions }, { quoted: msg });
    }

    const target =
      msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
      args[0];

    if (["kick", "promote", "demote"].includes(command)) {
      if (!target)
        return sock.sendMessage(from, { text: "Tag user." }, { quoted: msg });

      const jid = target.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

      const action =
        command === "kick"
          ? "remove"
          : command === "promote"
          ? "promote"
          : "demote";

      await sock.groupParticipantsUpdate(from, [jid], action);
    }

    if (command === "open") {
      await sock.groupSettingUpdate(from, "not_announcement");
      sock.sendMessage(from, { text: "Group opened." });
    }

    if (command === "close") {
      await sock.groupSettingUpdate(from, "announcement");
      sock.sendMessage(from, { text: "Group closed." });
    }

    if (command === "link") {
      const code = await sock.groupInviteCode(from);
      sock.sendMessage(from, {
        text: `https://chat.whatsapp.com/${code}`
      });
    }

    if (command === "resetlink") {
      await sock.groupRevokeInvite(from);
      const code = await sock.groupInviteCode(from);
      sock.sendMessage(from, {
        text: `New link: https://chat.whatsapp.com/${code}`
      });
    }
  }
};
