#!/bin/bash

# Mettre à jour les paquets
sudo apt-get update

# Installer Apache2
sudo apt-get install -y apache2 nodejs npm && sudo npm install -g @vue/cli

# Activer le module rewrite/alias
sudo a2enmod rewrite

# Créer le répertoire du site
sudo mkdir -p /var/www/ctfadrar

# Créer un utilisateur adminweb avec le mot de passe Qwerty77
sudo useradd -m -p $(openssl passwd -1 Qwerty77) adminweb

# Changer le groupe du répertoire à www-data
sudo chgrp -R www-data /var/www/ctfadrar

# Donner à www-data les droits sur le répertoire
sudo chmod -R g+rwx /var/www/ctfadrar

# Donner à l'utilisateur adminweb l'appartenance au groupe www-data/sudo
sudo usermod -aG www-data adminweb
sudo usermod -aG sudo adminweb

# Créer un fichier de configuration pour le site
echo "<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/ctfadrar
    <Directory /var/www/ctfadrar>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Require all granted
    </Directory>
    RewriteEngine on
    RewriteRule ^/flag01$ /var/www/ctfadrar/flag01 [L]
    RewriteRule ^/flag02$ /var/www/ctfadrar/flag02 [L]
    RewriteRule ^/flag03$ /var/www/ctfadrar/flag03 [L]
    RewriteRule ^/intro$ /var/www/ctfadrar/intro [L]
    RewriteRule ^/bienvenue$ /var/www/ctfadrar/index.html [L]
</VirtualHost>" | sudo tee /etc/apache2/sites-available/ctfadrar.conf

# Désactiver le site par défaut
sudo a2dissite 000-default.conf

# Activer le nouveau site
sudo a2ensite ctfadrar.conf

# Redémarrer Apache pour que les modifications prennent effet
sudo systemctl restart apache2