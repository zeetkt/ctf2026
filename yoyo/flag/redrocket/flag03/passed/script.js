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

    alert("tu dois d'abord trouver le Flag ComS@t pour continuer ... Let's go");
    window.location.href = '../flag03/index.html';
}

function printLines(lines) {
    let lineIndex = 0;
    let charIndex = 0;
    let delay = 26;
    let lineDelay = 1000;
    
    let terminalElement = document.getElementById('terminal');
    let footer = document.createElement('footer');
    document.body.appendChild(footer);

    checkCookieAndRedirect("ComS@t");

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
            footer.style.display = 'flex';
        }
    }

    printNextCharacter();
}

let userName = getUserNameCookie('userName');

let img = document.createElement('img');
img.src = '../images/MrAnderson.png';
img.style.width = '200px';
img.style.height = '200px';
img.style.display = 'block';
img.style.marginLeft = '100';
img.style.marginRight = 'auto';

let terminalElement = document.getElementById('terminal');
terminalElement.insertBefore(img, terminalElement.firstChild);

let lines = [
    'Hey ' + userName + ',',
    'Tu as réussi à trouver le Flag ComS@t !!!',
    'Je suis fier de toi, tu es sur la bonne voie pour devenir un vrai Agent.',
    '',
    'Le ComS@t est rétabli, et je vois que tu as avec toi mon Terminal.',
    '',
    'Il est dans un sale état, mais je vais t\'aider à le réparer.',
    'Tu pourras le garder, c\'est mon cadeau pour m\'avoir sorti de là.',
    '',
    'D\'ailleurs, tu arrive juste à temps je n\'ai plus de RedRocket... Tu pourrais m\'en trouver un ?',
    'Pense à en glisser une caisse dans la soute de la navette qui viendra me récupérer. ;)',
];

printLines(lines);

