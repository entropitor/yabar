#!/bin/bash

PATH="/usr/local/bin:$PATH"
# Check if yabai exists
if ! [[ -x "$(command -v yabai)" ]]; then
  echo "{\"error\":\"yabai binary : $(test -x /usr/local/bin/yabai && echo 'hello' || echo 'test')\"}"
  exit 1
fi

CURRENT_DESKTOP=$(yabai -m query --displays --display last)
DESKTOP_ACTIVE=$(yabai -m query --spaces --space recent | jq .id -r)
DESKTOP_START=$(yabai -m query --spaces --display last | jq 'map(.index)[]' | head -n 1)
DESKTOP_END=$(yabai -m query --spaces --display last | jq 'map(.index)[]' | tail -n 1)

echo $(cat <<-EOF
{
	"desktop": {
		"active": $DESKTOP_ACTIVE,
		"start": $DESKTOP_START,
    "end": $DESKTOP_END
	}
}
EOF
)
