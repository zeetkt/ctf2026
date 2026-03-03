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
            button.innerText = "Accepter la connection entrante";
            button.className = 'centered-button';
            button.onclick = function() {
                window.location.href = '../../flag03/index.html';
            };
            footer.appendChild(button);
            footer.style.display = 'flex';
        }
    }

    printNextCharacter();
}

let userName = getUserNameCookie('userName');

let lines = [
    'Félicitation agent ' + userName + ' !',
    'Tu as trouvé où se cachait le Flag {CosmoC@t} !!',
    '',
    'On va pouvoir poursuivre la mission.',
    'On ne sait toujours pas où se trouve Mr. Anderson, il faut absolument trouver un moyen de le localiser.',
    '...',
    '...INCOMING CONNECTION...',
    '...',
    '...',
    'Hey, on dirait que nous avons une connexion entrante...',
    'Je vais essayer de la tracer pour voir d\'où elle provient.',
    '...',
    '!!! C\'est Mr. Anderson !!!',
    'Il est en train de nous envoyer sa position.',
    '...',
    'Mais que fait-il dans un endroit pareil ?',
    '...',
    'Accepte la connection et écoutons ce qu\'il a à nous dire.',
];

printLines(lines);

