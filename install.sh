#!/data/data/com.termux/files/usr/bin/bash

echo "Installing BROKEN LORD MD..."

pkg update -y
pkg upgrade -y

pkg install -y nodejs git ffmpeg imagemagick

npm install

echo "Installation complete."
