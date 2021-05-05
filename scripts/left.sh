#!/bin/bash

PATH="/usr/local/bin:$PATH"
# Check if yabai exists
if ! [[ -x "$(command -v yabai)" ]]; then
  echo "{\"error\":\"yabai binary not found\"}"
  exit 1
fi
if ! [[ -x "$(command -v jo)" ]]; then
  echo "{\"error\":\"jo binary not found\"}"
  exit 1
fi
if ! [[ -x "$(command -v jq)" ]]; then
  echo "{\"error\":\"jq binary not found\"}"
  exit 1
fi

cat <<EOF
{
  "spaces": $(yabai -m query --spaces --display $1),
  "windows": $(yabai -m query --windows --display $1),
  "focus": "$($HOME/.bin/zabai focus)",
  "mode": "$($HOME/.bin/zabai mode)"
}
EOF
