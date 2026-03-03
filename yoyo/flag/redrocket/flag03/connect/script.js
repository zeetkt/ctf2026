function getUserNameCookie() {
    let cookieArr = document.cookie.split(";");
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if('userName' == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

function checkCookieAndRedirect(cookieName) {
    var cookieArr = document.cookie.split(";");

    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        if(cookieName == cookiePair[0].trim()) {
            return;
        }
    }

    window.location.href = '../computer/index.html';
}

function printLines(lines) {
    let lineIndex = 0;
    let charIndex = 0;
    let delay = 26;
    let lineDelay = 1000;
    
    let terminalElement = document.getElementById('terminal');
    let footer = document.createElement('footer');
    document.body.appendChild(footer);

    checkCookieAndRedirect("CosmoC@t");

    function printNextCharacter() {
        if(lineIndex < lines.length) {
            if(charIndex < lines[lineIndex].length) {
                terminalElement.innerHTML += lines[lineIndex][charIndex];
                charIndex++;
                setTimeout(printNextCharacter, delay);
            } else {
                terminalElement.innerHTML += '<br>';
                charIndex = 0;
                lineIndex++;
                setTimeout(printNextCharacter, lineDelay);
            }
            terminalElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } else {
            let button = document.createElement('button');
            button.innerText = "Retourner sur le bureau";
            button.className = 'centered-button';
            button.onclick = function() {
                window.location.href = '../bureau/index.html';
            };
            footer.appendChild(button);
            footer.style.display = 'flex';
        }
    }

    printNextCharacter();
}

let userName = getUserNameCookie('userName');

let lines = [
    'Ok ' + userName + ', je me connecte à distance sur le terminal de ComS@t....',
    '...',
    '...ROUTAGE EN COURS...',
    '...',
    '...CONNEXION ÉTABLIE...',
    '...',
    '...BIENVENUE SUR LE TERMINAL DE COMS@T...',
    '...',
    '..E0x0000000....Sous ROUTINE DETECTEE....',
    '..LANCEMENT DES CONTREMEUSURES...',
    '...',
    'A..tenDz...',
    'ViRus DETECTE...',
    '...' + userName + '..AiDe M01',
    '.0n meuuuuuu... Pir@t....Euuuuu...',
    '...',
    '..',
    '.',
];

printLines(lines);

