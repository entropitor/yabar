#!/bin/bash

# Check if pmset exists
if ! [ -x "$(command -v pmset)" ]; then
  echo "{\"error\":\"pmset binary not found\"}"
  exit 1
fi

# Check if egrep exists
if ! [ -x "$(command -v egrep)" ]; then
  echo "{\"error\":\"egrep binary not found\"}"
  exit 1
fi

# Check if cut exists
if ! [ -x "$(command -v cut)" ]; then
  echo "{\"error\":\"cut binary not found\"}"
  exit 1
fi

# Check if memory_pressure exists
if ! [ -x "$(command -v memory_pressure)" ]; then
  echo "{\"error\":\"memory_pressure binary not found\"}"
  exit 1
fi

# Check if sysctl exists
if ! [ -x "$(command -v sysctl)" ]; then
  echo "{\"error\":\"sysctl binary not found\"}"
  exit 1
fi

# Check if osascript exists
if ! [ -x "$(command -v osascript)" ]; then
  echo "{\"error\":\"osascript binary not found\"}"
  exit 1
fi

# Check if df exists
if ! [ -x "$(command -v df)" ]; then
  echo "{\"error\":\"df binary not found\"}"
  exit 1
fi

# Check if grep exists
if ! [ -x "$(command -v grep)" ]; then
  echo "{\"error\":\"grep binary not found\"}"
  exit 1
fi

# Check if awk exists
if ! [ -x "$(command -v awk)" ]; then
  echo "{\"error\":\"awk binary not found\"}"
  exit 1
fi

# Check if networksetup exists
if ! [ -x "$(command -v networksetup)" ]; then
  echo "{\"error\":\"networksetup binary not found\"}"
  exit 1
fi

BATTERY_PERCENTAGE=$(pmset -g batt | egrep '([0-9]+\%).*' -o --colour=auto | cut -f1 -d'%')

BATTERY_STATUS=$(pmset -g batt | grep "'.*'" | sed "s/'//g" | cut -c 18-19)

BATTERY_CHARGING=""
if [ "$BATTERY_STATUS" == "Ba" ]; then
  BATTERY_CHARGING="false"
elif [ "$BATTERY_STATUS" == "AC" ]; then
  BATTERY_CHARGING="true"
fi

# LOAD_AVERAGE=$(sysctl -n vm.loadavg | awk '{print $2}')

# VOLUME=$(osascript -e 'output volume of (get volume settings)')
# IS_MUTED=$(osascript -e 'output muted of (get volume settings)')

# HDD_TOTAL_BYTES=$(df | grep -m 1 /disk1 | awk -F" " '{print $2}')
# HDD_FREE_BYTES=$(df | grep -m 1 /disk1 | awk -F" " '{print $4}')

# MEMORY_FREE=$(memory_pressure | grep "Pages free" | grep -o -E '[0-9]+')
# MEMORY_TOTAL=$(memory_pressure | grep system | awk -F" " '{print $5}' | grep -o -E '[0-9]+')

WIFI_SSID=$(networksetup -getairportnetwork en0 | cut -c 24-)


  # "cpu": {
  #   "loadAverage": $LOAD_AVERAGE
  # },
	# "hdd": {
	#   "freeBytes": $HDD_FREE_BYTES,
	#   "totalBytes": $HDD_TOTAL_BYTES
	# },
	# "memory": {
	#   "total": $MEMORY_TOTAL,
	#   "free": $MEMORY_FREE
	# },
	# "volume": {
	#   "volume": $VOLUME,
	#   "muted": $IS_MUTED
	# },

echo $(cat <<-EOF
{
  "battery": {
    "percentage": $BATTERY_PERCENTAGE,
    "charging": $BATTERY_CHARGING
  },
	"wifi": {
		"ssid": "$WIFI_SSID"
	}
}
EOF
)
