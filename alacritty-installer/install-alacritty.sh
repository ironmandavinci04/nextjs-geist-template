#!/bin/bash

# Script to build and install Alacritty terminal emulator from source on Debian/Ubuntu/Kali Linux

set -e

echo "Updating package lists..."
sudo apt-get update

echo "Installing dependencies..."
sudo apt-get install -y \
  cmake \
  pkg-config \
  libfreetype6-dev \
  libfontconfig1-dev \
  libxcb-xfixes0-dev \
  libxkbcommon-dev \
  python3 \
  curl \
  git \
  cargo \
  rustc

echo "Cloning Alacritty repository..."
git clone https://github.com/alacritty/alacritty.git /tmp/alacritty

echo "Building Alacritty..."
cd /tmp/alacritty
cargo build --release

echo "Installing Alacritty binary..."
sudo cp target/release/alacritty /usr/local/bin/

echo "Installing desktop entry and terminfo..."
sudo cp extra/logo/alacritty-term.svg /usr/share/pixmaps/Alacritty.svg
sudo desktop-file-install extra/linux/Alacritty.desktop
sudo update-desktop-database
sudo tic -xe alacritty,alacritty-direct extra/alacritty.info

echo "Cleaning up..."
rm -rf /tmp/alacritty

echo "Alacritty installation completed."
echo "You can launch Alacritty by running the command: alacritty"
