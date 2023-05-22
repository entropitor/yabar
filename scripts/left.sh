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

display_index=$(yabai -m query --displays | jq -r "sort_by(.id) | .[$1].index")

cat <<EOF
{
  "spaces": $(yabai -m query --spaces --display $display_index),
  "windows": $(yabai -m query --windows --display $display_index),
  "focus": "$($HOME/.bin/zabai focus)",
  "mode": "$($HOME/.bin/zabai mode)"
}
EOF
