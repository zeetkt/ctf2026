# AGENTS.md - CTF 2026 Infrastructure

This repository contains CTF (Capture The Flag) challenge infrastructure. It uses Docker Compose to orchestrate multiple services including web challenges, DNS, and SSH challenges.

## Project Structure

```
ctf2026/
├── CTF1/                    # SSH tar challenge
├── CtfAdrar/                # Main CTF web challenges
│   ├── flag01/              # Challenge 1 (terminal-style)
│   ├── flag02/astrobooking/ # Vue.js challenge
│   └── intro/               # Introduction page
├── yoyo/                    # CTF interface
│   ├── flag/                # All challenges
│   │   ├── spygame/         # Morse code challenge
│   │   ├── spectre/         # Audio spectrogram challenge
│   │   ├── switch/          # Switch challenge (disabled)
│   │   ├── recodquest/      # QR code challenge
│   │   ├── notexifs/        # Image EXIF challenge
│   │   ├── anagramme/       # Anagram challenge
│   │   ├── rmqr/            # rMQR challenge
│   │   ├── capture/         # Network capture (pcap)
│   │   └── cap/             # SSH capture challenge
│   └── src/                 # Shared resources
├── configdns/               # BIND9 DNS configuration
├── cachedns/                # DNS cache
├── recordsdns/              # DNS records
├── docker-compose.yml       # Main orchestration
├── Dockerfile               # Apache/PHP container
└── launch.sh                # Launch script
```

## Build/Lint/Test Commands

### Docker Infrastructure

```bash
# Build and start all services
docker-compose up -d --build

# Start existing containers
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose build apachephp
```

### Vue.js Challenge (astrobooking)

```bash
cd CtfAdrar/flag02/astrobooking

# Install dependencies
npm install

# Start development server
npm run serve

# Build for production
npm run build

# Run linter
npm run lint

# Run linter with auto-fix
npm run lint -- --fix
```

### Running a Single Test

There are no automated tests in this codebase. Tests would need to be added using Jest or Vue Test Utils if required.

## Code Style Guidelines

### JavaScript (Vanilla)

- Use `let` and `const` - avoid `var`
- Use camelCase for variables and functions
- Use PascalCase for constructor functions and classes
- Use meaningful variable names
- Prefer template literals over string concatenation
- Use async/await over raw promises where appropriate
- Always use strict equality (`===` and `!==`)
- Use semicolons at the end of statements
- Indent with 4 spaces

Example:
```javascript
function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}
```

### Vue.js (astrobooking)

The project uses Vue 3 with Vue CLI. Configuration is in `package.json`:

- ESLint extends: `plugin:vue/vue3-essential`, `eslint:recommended`
- Parser: `@babel/eslint-parser`
- Node.js environment
- Browserslist: `> 1%`, `last 2 versions`, `not dead`, `not ie 11`

Follow Vue 3 Composition API patterns for new code. Use existing component structure as reference.

### HTML/CSS

- Use semantic HTML5 elements
- Keep CSS in separate `.css` files
- Use meaningful class names (kebab-case)
- Avoid inline styles

### Shell Scripts

- Use `#!/bin/bash` shebang
- Make scripts executable (`chmod +x`)
- Use `set -e` for error handling where appropriate

## Error Handling

- JavaScript: Use try/catch for async operations, check for null/undefined
- Docker: Always check container logs on failure
- DNS: Verify configuration with `named-checkzone` before applying

## Docker Best Practices

- Always rebuild after config changes: `docker-compose up -d --build`
- Check logs first: `docker-compose logs [service_name]`
- Use `docker exec -it [container] bash` for debugging
- Keep secrets out of docker-compose.yml

## Common Development Tasks

### Adding a New Challenge

1. Create directory under `CtfAdrar/`
2. Add to Apache config or create new container
3. Update docker-compose.yml if new service needed
4. Test locally before committing

### Modifying DNS Records

1. Edit files in `configdns/` or `recordsdns/`
2. Test with `named-checkzone`
3. Restart bind9 container: `docker-compose restart bind9`

### Debugging Web Challenges

```bash
# View Apache logs
docker-compose logs apachephp

# Access container shell
docker exec -it ctf_web bash

# Check PHP error logs
cat logs_apache/error.log
```

## Notes

- This is CTF infrastructure, not a production web application
- No automated test framework is currently configured
- All challenges are designed to be exploitable (intentionally vulnerable)
- Use for educational/CTF purposes only
