#!/bin/bash
# Fixed script to rollback Kali Linux repositories to stable kali-rolling release with correct signed-by syntax

set -e

echo "Backing up current sources.list to sources.list.bak..."
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak

echo "Replacing sources.list with stable kali-rolling repositories with correct signed-by syntax..."
cat <<EOF | sudo tee /etc/apt/sources.list
deb [signed-by=/usr/share/keyrings/kali-archive-keyring.gpg] http://http.kali.org/kali kali-rolling main non-free contrib
# For source packages
deb-src [signed-by=/usr/share/keyrings/kali-archive-keyring.gpg] http://http.kali.org/kali kali-rolling main non-free contrib
EOF

echo "Adding Kali Linux archive keyring (force overwrite)..."
curl -fsSL https://archive.kali.org/archive-key.asc | sudo gpg --dearmor --yes -o /usr/share/keyrings/kali-archive-keyring.gpg

echo "Updating package lists..."
sudo apt update

echo "Upgrading packages to stable kali-rolling versions..."
sudo apt full-upgrade -y

echo "Rollback to stable Kali Linux kali-rolling release completed."
