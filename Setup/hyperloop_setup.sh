#!/bin/bash

echo "Queen's Hyperloop Team"
echo "Setup Script"
echo

while true; do
    read -p "Edit network settings? " yn
    case $yn in
        [Yy]* ) sudo sh ./network.sh; break;;
        [Nn]* ) break;;
        * ) echo "Please answer yes or no.";;
    esac
done

if grep -Fq "adafruit" /etc/apt/sources.list; then
  echo "adafruit repo already added to apt sources."
else
   echo "deb http://apt.adafruit.com/raspbian/jessie main" >> /etc/apt/sources.list
   wget -O - -q https://apt.adafruit.com/apt.adafruit.com.gpg.key | apt-key add -
fi
echo
while true; do
    read -p "Update? " yn
    case $yn in
        [Yy]* ) sh ./update.sh; break;;
        [Nn]* ) break;;
        * ) echo "Please answer yes or no.";;
    esac
done
echo
sudo apt-get install vlc
sudo apt-get install node
npm install npm@latest -g
sudo apt-get install git
echo
while true; do
    read -p "Git update? " yn
    case $yn in
        [Yy]* ) cd /home/pi
		if [ ! -d "prototype" ]; then
		   echo "clone"
		   git clone https://github.com/QueensHyperloop/prototype.git
		else
		   cd /home/pi/prototype
		   git fetch https://github.com/QueensHyperloop/prototype.git
		   npm install
		fi
		break;;
        [Nn]* ) break;;
        * ) echo "Please answer yes or no.";;
    esac
done

sh ./ start.sh
echo
while true; do
    read -p "Reboot? " yn
    case $yn in
        [Yy]* ) sudo reboot; break;;
        [Nn]* ) break;;
        * ) echo "Please answer yes or no.";;
    esac
done

$SHELL
