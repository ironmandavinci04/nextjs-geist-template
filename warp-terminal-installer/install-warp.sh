#!/bin/bash

# Script to download and install Warp Terminal on Debian/Ubuntu-based systems

set -e

echo "Downloading Warp Terminal .deb package..."
curl -L -o /tmp/warp-terminal.deb "https://releases.warp.dev/stable/v0.2025.06.11.08.11.stable_05/warp-terminal_0.2025.06.11.08.11.stable.05_amd64.deb"

echo "Installing Warp Terminal..."
sudo dpkg -i /tmp/warp-terminal.deb || true

echo "Fixing missing dependencies..."
sudo apt-get install -f -y

echo "Cleaning up..."
rm /tmp/warp-terminal.deb

echo "Warp Terminal installation completed."
echo "You can launch Warp Terminal by running the command: warp"
