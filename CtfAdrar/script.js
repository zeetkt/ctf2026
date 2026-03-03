function storeCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

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

// Fonction pour attendre la validation du cookie
async function waitForCookieAndGoToIntro(cookieName) {
    while(true) {
        let cookieValue = getCookie(cookieName);
        if(cookieValue !== null) {
            window.location.href = 'intro/index.html'; // Redirige vers la page intro/index.html
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); // Attendre 1 seconde avant de vérifier à nouveau
    }
}

function printLines(lines) {
    let lineIndex = 0;
    let charIndex = 0;
    let delay = 26;
    let lineDelay = 1000;

    let terminalElement = document.getElementById('terminal');
    
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
        } else {
            let userName = prompt("On m'appelle ...");
            storeCookie('userName', userName, 1);
            waitForCookieAndGoToIntro('userName');
        }
    }

    printNextCharacter();
}

let lines = [
    'Bienvenue dans Terminal !',
    'Si tu es là, c\'est que tu as été choisi pour une mission très spéciale.',
    'Retrouver le code secret pour désamorcer la bombe qui va faire exploser ton ordinateur.',
    'Bonne chance !',
    '',
    'Compte à rebours : 10',
    '9',
    '8',
    '7',
    '19',
    'non, 6',
    '3',
    '...2',
    '## ERREUR ##',
    '',
    '',
    'Heu non, oublie ce que je viens de dire.',
    'Je suis un peu fatigué en ce moment..',
    'Comment ça, tu as vu une bombe ?',
    'Non, non, c\'était juste une blague.',
    'Ces humains, toujours à s\'inquiéter pour rien !!!',
    '...',
    'Comment tu t\'appelles ?',    
];

let userName = getCookie('userName');
if (userName !== null) {
    window.location.href = 'intro/index.html'; // Redirige vers la page intro/index.html
} else {
    printLines(lines);
}