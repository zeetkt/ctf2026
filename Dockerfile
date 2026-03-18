# On utilise une image officielle PHP avec Apache intégré
# C'est beaucoup plus stable que d'installer Apache manuellement sur une Debian nue
FROM php:8.2-apache

# Metadonnées
LABEL maintainer="TonPseudo <tonmail@example.com>"

# 1. Installation des dépendances système et nettoyage en une seule couche
RUN apt-get update && apt-get install -y \
    openssl \
    libzip-dev \
    libicu-dev \
    libpng-dev \
    git \
    zip \
    unzip \
    nano \
    && rm -rf /var/lib/apt/lists/*

# 2. Installation des extensions PHP nécessaires
# (mysqli, pdo, gd, intl, zip sont les classiques pour les CTF/CMS)
RUN docker-php-ext-install mysqli pdo pdo_mysql gd intl zip

# 3. Configuration d'Apache
# Activation du SSL et de l'URL Rewriting (souvent nécessaire pour les CMS)
RUN a2enmod ssl rewrite

# Ajout du port 4242 à la configuration Apache (pour le challenge de Flo)
# RUN echo "Listen 4242" >> /etc/apache2/ports.conf

# 4. Génération du certificat SSL auto-signé
RUN mkdir -p /etc/apache2/certificate
RUN openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes \
    -out /etc/apache2/certificate/apache-certificate.crt \
    -keyout /etc/apache2/certificate/apache.key \
    -subj "/C=FR/ST=France/L=CTF/O=Adrar/CN=adrar-numerique.lan"

# 5. Copie des fichiers de configuration VirtualHost
# Assure-toi que ces fichiers sont bien dans le même dossier que le Dockerfile
COPY vhostyoann.conf /etc/apache2/sites-available/
COPY vhosttym.conf /etc/apache2/sites-available/
# COPY vhostflo.conf /etc/apache2/sites-available/

# 6. Activation des sites
RUN a2dissite 000-default.conf \
    && a2ensite vhostyoann.conf
    # && a2ensite vhostflo.conf

# 7. Copie des sources du CTF
# Note : C'est mieux de faire ça ici, mais le docker-compose pourra écraser ça avec des volumes.
# Je recrée la structure que tu avais.
WORKDIR /var/www/html
COPY CtfAdrar/ /var/www/html/CtfAdrar/
# --- AJOUT ICI ---
COPY yoyo/ /var/www/html/yoyo/

# Copie spécifique pour le challenge de Flo
# COPY flagswitch.html /var/www/html/flo/index.html

# Création des dossiers vides pour éviter les erreurs si les dossiers sources manquent
# RUN mkdir -p /var/www/html/flo

# 8. Permissions (CRITIQUE : Sécurité et fonctionnement)
# On donne la propriété à www-data (Apache) au lieu de faire chmod 777 partout
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Si tu as besoin d'un dossier upload accessible en écriture pour un exploit :
# RUN chmod 777 /var/www/html/CtfAdrar/upload/

EXPOSE 80 443 4242