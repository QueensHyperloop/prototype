#!/bin/bash

echo "Updating....."
sudo apt update > /dev/null 2>&1
sudo apt full-upgrade
sudo apt-get update -y > /dev/null 2>&1
sudo apt-get upgrade
sudo apt-get autoremove -y > /dev/null 2>&1