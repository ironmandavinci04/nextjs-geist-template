#!/bin/bash
# Script to rollback Kali Linux repositories to stable kali-rolling release

set -e

echo "Backing up current sources.list to sources.list.bak..."
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak

echo "Replacing sources.list with stable kali-rolling repositories..."
cat <<EOF | sudo tee /etc/apt/sources.list
deb http://http.kali.org/kali kali-rolling main non-free contrib
# For source packages
deb-src http://http.kali.org/kali kali-rolling main non-free contrib
EOF

echo "Adding Kali Linux archive keyring..."
curl -fsSL https://archive.kali.org/archive-key.asc | sudo gpg --dearmor -o /usr/share/keyrings/kali-archive-keyring.gpg

echo "Updating sources.list to use signed-by option..."
sudo sed -i 's|http://http.kali.org/kali|http://http.kali.org/kali signed-by=/usr/share/keyrings/kali-archive-keyring.gpg|g' /etc/apt/sources.list

echo "Updating package lists..."
sudo apt update

echo "Upgrading packages to stable kali-rolling versions..."
sudo apt full-upgrade -y

echo "Rollback to stable Kali Linux kali-rolling release completed."
