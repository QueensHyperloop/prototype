#!/bin/bash

if ! grep -Fq "#queensu static" /etc/dhcpcd.conf; then
cp /etc/dhcpcd.conf /etc/dhcpcd.conf.backup
echo
ip -4 addr show | grep global
echo "Enter WiFi IP (eg: 10.1.1.31/24): "
read ip
echo
ip route | grep default | awk '{print $3}'
echo "Enter gateway address: "
read gate
echo
cat /etc/resolv.conf | grep "nameserver"
echo "Enter nameserver 1: "
read name1
echo "Enter nameserver 2 (or leave blank): "
read name2
echo "
#queensu static
interface wlan0
      static ip_address=$ip
      static routers=$gate
      static domain_name_servers=$name1
      static domain_name_servers=$name2" >> /etc/dhcpcd.conf
fi