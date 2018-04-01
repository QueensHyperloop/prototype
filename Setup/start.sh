#!/bin/bash

sudo raspi-config nonint do_camera 0
sudo raspi-config nonint do_ssh 0
sudo raspi-config nonint do_i2c 0
sudo raspi-config nonint do_expand_rootfs
sudo raspi-config nonint do_boot_behaviour B1
sudo raspi-config nonint do_wifi_country "CA"