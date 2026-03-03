function checkCookieAndRedirect(cookieName) {
    var cookieArr = document.cookie.split(";");

    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        if(cookieName == cookiePair[0].trim()) {
            return;
        }
    }

    alert("tu dois d'abord trouver le Flag Co0k1e pour continuer ... Let's go");
    window.location.href = '../cookie.html';
}

checkCookieAndRedirect("Co0k1e");

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
            button.innerText = "Acceder à l'ordinateur";
            button.className = 'centered-button';
            button.onclick = function() {
                window.location.href = 'bureau/index.html';
            };
            footer.appendChild(button);
            footer.style.display = 'flex';
        }
    }

    printNextCharacter();
}

let lines = [
    '',
    'Nous voila dans le Bureau de M. Anderson',
    'Ferme la porte derrière toi, nous ne voulons pas être dérangés',
    '',
    'Comme je m\'en doutais, Mr. Anderson n\'est pas là',
    '',
    'Il a laissé son ordinateur ouvert',
    'Etrange...',
    '',
    'Il est souvent distrait, mais il ne laisse jamais son ordinateur ouvert',
    'Il doit être parti en urgence',
    '',
    'Jetons un oeil à son ordinateur',
];

printLines(lines);

