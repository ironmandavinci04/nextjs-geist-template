#!/bin/bash
# Script to fix Kali Linux repository key issues

set -e

echo "Removing old Kali Linux keys..."
sudo apt-key del 44C6B3CF || true
sudo apt-key del 7D8D0BF6 || true

echo "Downloading and adding Kali Linux archive keyring..."
curl -fsSL https://archive.kali.org/archive-key.asc | sudo gpg --dearmor -o /usr/share/keyrings/kali-archive-keyring.gpg

echo "Updating sources.list to use signed-by option..."
if ! grep -q "signed-by=/usr/share/keyrings/kali-archive-keyring.gpg" /etc/apt/sources.list; then
    sudo sed -i 's|http://http.kali.org/kali|http://http.kali.org/kali signed-by=/usr/share/keyrings/kali-archive-keyring.gpg|g' /etc/apt/sources.list
fi

echo "Updating package lists..."
sudo apt update

echo "Kali Linux key issue should be fixed now."
