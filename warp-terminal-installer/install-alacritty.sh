#!/bin/bash

# Script to install Alacritty terminal emulator and configure zsh autocomplete on Debian/Ubuntu

set -e

echo "Updating package lists..."
sudo apt-get update

echo "Installing dependencies for Alacritty build..."
sudo apt-get install -y cmake g++ pkg-config libfontconfig1-dev libxcb-xfixes0-dev libxkbcommon-dev python3 curl git zsh

echo "Installing Rust compiler via rustup..."
if ! command -v rustup &> /dev/null
then
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source $HOME/.cargo/env
else
    echo "rustup already installed"
fi

echo "Setting Rust stable toolchain..."
rustup override set stable
rustup update stable

echo "Cloning Alacritty source code..."
if [ ! -d "$HOME/Documents/alacritty" ]; then
    git clone https://github.com/alacritty/alacritty.git $HOME/Documents/alacritty
else
    echo "Alacritty source already cloned"
fi

cd $HOME/Documents/alacritty

echo "Building Alacritty..."
cargo build --release

echo "Installing terminfo..."
if ! infocmp alacritty &> /dev/null; then
    sudo tic -xe alacritty,alacritty-direct extra/alacritty.info
else
    echo "Alacritty terminfo already installed"
fi

echo "Installing desktop entry..."
sudo cp target/release/alacritty /usr/local/bin
sudo cp extra/logo/alacritty-term.svg /usr/share/pixmaps/Alacritty.svg
sudo desktop-file-install extra/linux/Alacritty.desktop
sudo update-desktop-database

echo "Installing manual pages..."
sudo mkdir -p /usr/local/share/man/man1
sudo mkdir -p /usr/local/share/man/man5
if command -v scdoc &> /dev/null; then
    scdoc < extra/man/alacritty.1.scd | gzip -c | sudo tee /usr/local/share/man/man1/alacritty.1.gz > /dev/null
    scdoc < extra/man/alacritty-msg.1.scd | gzip -c | sudo tee /usr/local/share/man/man1/alacritty-msg.1.gz > /dev/null
    scdoc < extra/man/alacritty.5.scd | gzip -c | sudo tee /usr/local/share/man/man5/alacritty.5.gz > /dev/null
    scdoc < extra/man/alacritty-bindings.5.scd | gzip -c | sudo tee /usr/local/share/man/man5/alacritty-bindings.5.gz > /dev/null
else
    echo "scdoc not found, skipping manual page installation"
fi

echo "Installing shell completions for zsh..."
mkdir -p ~/.zsh/completions
cp extra/completions/_alacritty ~/.zsh/completions/_alacritty

if ! grep -q "fpath+=~/.zsh/completions" ~/.zshrc; then
    echo "fpath+=~/.zsh/completions" >> ~/.zshrc
fi

if ! grep -q "autoload -Uz compinit && compinit" ~/.zshrc; then
    echo "autoload -Uz compinit && compinit" >> ~/.zshrc
fi

echo "Installing zsh-autosuggestions plugin..."
if [ ! -d "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-autosuggestions" ]; then
    git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
else
    echo "zsh-autosuggestions already installed"
fi

if ! grep -q "zsh-autosuggestions" ~/.zshrc; then
    sed -i 's/plugins=(/plugins=(zsh-autosuggestions /' ~/.zshrc
fi

echo "Installing zsh-completions plugin..."
if [ ! -d "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-completions" ]; then
    git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-completions
else
    echo "zsh-completions already installed"
fi

if ! grep -q "zsh-completions" ~/.zshrc; then
    sed -i 's/plugins=(/plugins=(zsh-completions /' ~/.zshrc
fi

echo "Setting zsh as default shell..."
if [ "$SHELL" != "$(which zsh)" ]; then
    chsh -s $(which zsh)
fi

echo "Installation complete. Please restart your terminal or run 'exec zsh' to start using Alacritty with zsh autocomplete."
