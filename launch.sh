#!/bin/bash

# Fonction pour obtenir l'IP locale
get_local_ip() {
    ip route get 1.1.1.1 2>/dev/null | awk '{print $7}' | head -n 1
}

# --- 1. DÉTECTION DE L'IP ---
DETECTED_IP=$(get_local_ip)

if [ -z "$DETECTED_IP" ]; then
    DETECTED_IP="127.0.0.1"
fi

echo "============================================="
echo "CTF LAUNCHER v3.0 (Fix DNS Config)"
echo "============================================="
echo "IP détectée : $DETECTED_IP"
echo ""
read -p "Voulez-vous utiliser cette IP ? (O/n) : " choice
choice=${choice:-O}

if [[ "$choice" =~ ^[Nn]$ ]]; then
    read -p "Entrez l'IP manuellement : " MANUAL_IP
    IP_FINAL=$MANUAL_IP
else
    IP_FINAL=$DETECTED_IP
fi

echo "-> Configuration avec l'IP : $IP_FINAL"

# --- 2. GESTION DES DOSSIERS ---
echo "-> Nettoyage et préparation des dossiers DNS..."
rm -rf ./configdns
mkdir -p ./configdns ./recordsdns ./cachedns
chmod -R 777 ./configdns ./recordsdns ./cachedns

# --- 3. MISE À JOUR DU SITE WEB ---
# (Ajuste le chemin si ton fichier est ailleurs, ex: ./CtfAdrar/yoyo/accueil.html)
TARGET_FILE="./yoyo/accueil.html"
if [ -f "$TARGET_FILE" ]; then
    echo "-> Mise à jour de l'IP dans $TARGET_FILE..."
    sed -i -E "s/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/$IP_FINAL/g" "$TARGET_FILE"
fi

# --- 4. CONFIGURATION BIND (CRITIQUE) ---
# On doit recréer la config de base car le volume écrase /etc/bind

echo "-> Génération de named.conf..."
cat <<EOF > ./configdns/named.conf
include "/etc/bind/named.conf.options";
include "/etc/bind/named.conf.local";
EOF

echo "-> Génération de named.conf.options..."
cat <<EOF > ./configdns/named.conf.options
options {
        directory "/var/cache/bind";
        recursion yes;
        allow-query { any; };
        dnssec-validation no;
        listen-on { any; };
        listen-on-v6 { any; };
};
EOF

echo "-> Génération de named.conf.local (Déclaration de la zone)..."
cat <<EOF > ./configdns/named.conf.local
zone "adrar.lan" {
    type master;
    file "/etc/bind/db.adrar.lan";
};
EOF

# --- 5. GÉNÉRATION DE LA ZONE DNS ---
DNS_FILE="./configdns/db.adrar.lan"
echo "-> Génération du fichier de zone : $DNS_FILE"

cat <<EOF > $DNS_FILE
\$ORIGIN adrar.lan.
\$TTL    604800
@       IN      SOA     srvdns.adrar.lan. root.localhost. (
                              3         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
;
@       IN      NS      srvdns.adrar.lan.
@       IN      A       $IP_FINAL
srvdns  IN      A       $IP_FINAL

; Les Challenges
www     IN      A       $IP_FINAL
mm      IN      A       $IP_FINAL
tym     IN      A       $IP_FINAL
jeff    IN      A       $IP_FINAL
flo     IN      A       $IP_FINAL
EOF

echo "============================================="
echo "Configuration terminée !"
echo "1. Relancez le conteneur DNS : docker restart srvdns"
echo "2. Testez : nslookup www.adrar.lan 127.0.0.1"
echo "============================================="
sudo docker compose up -d --build
docker compose up -d --build
