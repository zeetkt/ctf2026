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
                window.location.href = '../../flag02/index.html';
            };
            footer.appendChild(button);
            footer.style.display = 'flex';
        }
    }

    printNextCharacter();
}

let userName = getUserNameCookie('userName');

let lines = [
    'Bravo ' + userName + ' !',
    'Tu as réussi à passer la première étape !!',
    '',
    'Tu es maintenant prêt pour la suite.',
    'Ce n\'étais pas trop difficile, n\'est-ce pas ?',
    'Je te préviens, connaissant Mr Anderson, ça va se corser...',
    '',
    'En tout cas, je suis fier de toi !',
    'Mais n\'attendons pas plus longtemps, allons-y !',
    '',
    '"Le but ici est de suivre le fil de l\'enquête."',
    '"Tu devras trouver des indices pour avancer, et résoudre des énigmes."',
    '',
    '"Prends ton temps... pas trop quand même, je ne veux pas finir recyclé en grille-pain."',
    '"Je te conseille de bien regarder partout, et de ne pas hésiter à fouiller."',
    '"Comprends ce que tu fais, et pourquoi tu le fais."',
    '',
    '"Je te souhaite bonne chance, et que la force soit avec toi... Agent ' + userName + '."',
];

printLines(lines);

