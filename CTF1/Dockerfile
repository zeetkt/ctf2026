# On prend une version récente et stable
FROM ubuntu:22.04

# Installation des dépendances
# libcap2-bin sert à la commande setcap
RUN apt-get update && apt-get install -y \
    openssh-server \
    libcap2-bin \
    nano \
    tar \
    && rm -rf /var/lib/apt/lists/*

# Configuration SSH
RUN mkdir /var/run/sshd

# Création de l'utilisateur 'test' avec mdp 'tulpn'
# On lui donne /bin/bash direct, plus propre que le sed dans le script
RUN useradd -m -s /bin/bash test && \
    echo "test:tulpn" | chpasswd

# Mise en place du Flag
# On le met chez root pour qu'il soit illisible par défaut
COPY flag.txt /root/flag.txt
RUN chmod 400 /root/flag.txt

# --- LE CŒUR DU CHALLENGE ---
# On donne la capacité CAP_DAC_OVERRIDE à tar.
# Cela permet à tar d'ignorer les permissions de lecture/écriture (Read/Write Bypass)
RUN setcap cap_dac_override+ep /usr/bin/tar

# On expose le port SSH
EXPOSE 22

# On lance le démon SSH en premier plan (remplace le script keepalive)
CMD ["/usr/sbin/sshd", "-D"]