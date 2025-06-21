#!/bin/bash
# Script to persistently fix PATH environment variable by adding /bin and /usr/bin to shell profile

set -e

PROFILE_FILE=""

# Detect shell profile file
if [ -n "$BASH_VERSION" ]; then
  PROFILE_FILE="$HOME/.bashrc"
elif [ -n "$ZSH_VERSION" ]; then
  PROFILE_FILE="$HOME/.zshrc"
else
  PROFILE_FILE="$HOME/.profile"
fi

echo "export PATH=/bin:/usr/bin:\$PATH" >> "$PROFILE_FILE"
echo "Added /bin and /usr/bin to PATH in $PROFILE_FILE"
echo "Please restart your terminal or run 'source $PROFILE_FILE' to apply changes."
