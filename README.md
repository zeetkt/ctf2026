# CTF 2026 - Infrastructure de Challenges

Infrastructure Docker pour un événement CTF (Capture The Flag) comprenant des challenges web, DNS et SSH.

## Structure du Projet

```
ctf2026/
├── docker-compose.yml       # Orchestration des services Docker
├── Dockerfile               # Image Apache/PHP pour les challenges web
├── launch.sh                # Script de lancement rapide
├── AGENTS.md                # Documentation pour agents IA
│
├── CTF1/                    # Challenge SSH (tar)
│   ├── Dockerfile           # Image Docker du challenge
│   ├── flag.tar             # Fichier tar contenant le flag
│   ├── flag.txt             # Le flag à récupérer
│   └── keepalive.sh         # Script keepalive SSH
│
├── CtfAdrar/                # Challenges principaux (style terminal)
│   ├── index.html           # Page d'accueil
│   ├── script.js            # Script d'accueil
│   ├── intro/               # Page d'introduction
│   ├── flag01/              # Challenge 1 - Codage binaire
│   ├── flag02/              # Challenge 2
│   │   └── astrobooking/    # Application Vue.js
│   └── style.css            # Styles globaux
│
├── yoyo/                    # Interface CTF complète
│   ├── accueil.html         # Page principale des challenges
│   ├── challenges-config.json # Configuration enable/disable des challenges
│   ├── flag/                # Tous les challenges
│   │   ├── spygame/        # Challenge Morse
│   │   ├── spectre/        # Challenge Audio
│   │   ├── switch/          # Challenge Switch
│   │   ├── recodquest/      # Challenge QR Code
│   │   ├── notexifs/        # Challenge Image
│   │   ├── anagramme/       # Challenge Anagramme
│   │   ├── rmqr/            # Challenge rMQR
│   │   ├── capture/          # Challenge Network Capture
│   │   └── cap/             # Challenge SSH Final
│   └── src/                 # Ressources (CSS, JS, images)
│
├── configdns/               # Configuration BIND9
├── cachedns/                # Cache DNS
├── recordsdns/              # Enregistrements DNS
├── vhost*.conf              # Configurations VirtualHost Apache
└── logs_apache/             # Logs Apache (volume mounté)
```

## Services Docker

| Service | Description | Port |
|---------|-------------|------|
| `apachephp` | Serveur web Apache/PHP | 80, 443 |
| `bind9` | Serveur DNS | 53 |
| `challenge_tar` | Challenge SSH | 5000 |

## Configuration des Challenges

Le fichier `yoyo/challenges-config.json` permet d'activer/désactiver les challenges dynamiquement :

```json
{
  "challenges": {
    "formulaire": true,
    "admin": true,
    "spygame": true,
    "spectre": true,
    "switch": false,
    "recodquest": true,
    "exifs": true,
    "anagramme": true,
    "rmqr": true,
    "capture": true
  }
}
```

Placez `false` pour masquer un challenge. Les changements sont immédiats (rafraîchir la page).

## Lancement Rapide

```bash
# Lancer tous les services
./launch.sh

# Ou avec Docker Compose
docker-compose up -d --build
```

## Arrêt

```bash
docker-compose down
```

## Logs

```bash
# Voir tous les logs
docker-compose logs -f

# Logs Apache
docker-compose logs apachephp

# Logs DNS
docker-compose logs bind9
```

## Accès aux Challenges

- Web principal : `http://localhost`
- Challenge SSH : `ssh -p 5000 user@localhost`
- DNS : `localhost:53`

## Développement

Voir `AGENTS.md` pour les guidelines de code et les commandes de build/lint.
