const {
  default: makeWASocket,
  useMultiFileAuthState
} = require("@whiskeysockets/baileys");

const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const { port } = require("./config");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth");
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const from = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    const body =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    const prefix = ".";
    if (!body.startsWith(prefix)) return;

    const args = body.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const cmdPath = path.join(__dirname, "commands", `${command}.js`);
    if (fs.existsSync(cmdPath)) {
      const cmd = require(cmdPath);
      cmd.run(sock, msg, from, sender, args, command);
    }
  });

  console.log("BOT READY ✓");
}

startBot();
