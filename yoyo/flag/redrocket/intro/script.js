function storeCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

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

function printLines(lines) {
    let lineIndex = 0;
    let charIndex = 0;
    let delay = 26;
    let lineDelay = 1000;
    
    let terminalElement = document.getElementById('terminal');
    let footer = document.createElement('footer');
    document.body.appendChild(footer);

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
            button.innerText = "Let's go";
            button.className = 'centered-button';
            button.onclick = function() {
                window.location.href = '../flag01/index.html';
            };
            footer.appendChild(button);
            footer.style.display = 'flex';
        }
    }

    printNextCharacter();
}

let userName = getUserNameCookie('userName');

let lines = [
    'Enchanté ' + userName + ' !',
    'Mon nom est Terminal.',
    'Je suis un programme informatique développé par la NASA pour aider les agents sur le terrain.',
    '',
    'Je suis là pour te guider dans ta mission...',
    '...et pour te donner des indices si tu es bloqué.',
    '',
    'L\'agent qui m\'a programmé s\'appelle "M. Anderson".',
    'C\'est un type très sympa, mais un peu bizarre.',
    'Il a un humour très particulier.',
    '',
    'Seulement voilà.... Je l\'ai... euh..... égaré.',
    'Je ne sais pas où il est.',
    'Et je ne sais pas comment le retrouver.',
    '',
    'Tu dois m\'aider à le retrouver.',
    'C\'est très important !!!',
    '',
    'S\'il ne me met pas à jour, je vais finir par devenir obsolète.',
    'Et ça, ce serait une catastrophe.',
    'On ne peut pas se permettre de perdre un outil aussi précieux que moi.',
    'Et me retrouver avec un autre programme, moins performant...moins intelligent....moins drôle......moins... moi.',
    '',
    'NON !! Je ne veux pas y penser.',
    '',
    'Bref, tu dois m\'aider à retrouver M. Anderson.',
    'Il doit bien être quelque part, on devrait peut-être commencer par chercher dans ses affaires.',
    '',
    'Je suis sûr que tu vas y arriver.',
    'Je crois en toi.',
    'On peux commencer par se rendre à son bureau, on y trouvera surement des indices.',
];

printLines(lines);

