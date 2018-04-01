#!/bin/bash

echo "Testing WiFi connection"

if ping -c1 -q google.ca; then
   sh ./static_ip.sh
   echo "WiFi test successful."
   exit
else

if ! grep -Fq "QueensuSecure_WPA2" /etc/wpa_supplicant/wpa_supplicant.conf; then

cp /etc/wpa_supplicant/wpa_supplicant.conf /etc/wpa_supplicant/wpa_supplicant.conf.backup
   echo "Enter username (NetID):"
   read user
   echo "Enter password:"
   read pass
   echo "network={
    ssid="QueensuSecure_WPA2"
    scan_ssid=1
    key_mgmt=WPA-EAP
    group=CCMP TKIP
    eap=PEAP
    identity="$user"
    password="$pass"
    phase1="peapver=0"
    phase2="MSCHAPV2"
   }" >> /etc/wpa_supplicant/wpa_supplicant.conf
fi
if false; then
   cp /etc/network/interfaces /etc/network/interfaces.backup
   echo "
auto lo
iface lo inet loopback
iface eth0 inet dhcp
allow-hotplug wlan0
iface wlan0 inet dhcp
   pre-up wpa_supplicant -B -Dwext -i wlan0 -c /etc/wpa_supplicant/wpa_supplicant
   post-down killall -q wpa_supplicant" >> /etc/network/interfaces
fi
   if ping -c1 -q google.ca; then
      sh ./static_ip.sh
      echo "WiFi test successful."
      exit
   else
      echo "WiFi failed."
      exit
   fi
fi