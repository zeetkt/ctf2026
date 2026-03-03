#!/bin/bash
useradd -m test
echo "test:tulpn" | chpasswd
#sed -i '/^test:x:1000:1000:.*:\/home\/test:\/bin\/sh/s#/bin/sh#/bin/bash#' /etc/passwd
# Définition de la ligne à modifier
sed -i '$ d' /etc/passwd
echo "test:x:1000:1000::/home/test:/bin/bash" >> /etc/passwd
mkdir /supersecret
chmod 000 /supersecret
chmod 700 /usr/local/bin/keepalive.sh
/usr/sbin/sshd
while true; do sleep 1000; done
