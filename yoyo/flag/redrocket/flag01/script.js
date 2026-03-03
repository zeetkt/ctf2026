function printLines(lines) {
    let lineIndex = 0;
    let charIndex = 0;
    let delay = 30;
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
            button.innerText = "Acceder au Terminal";
            button.className = 'centered-button';
            button.onclick = function() {
                window.location.href = 'flag01.html';
            };
            footer.appendChild(button);
            footer.style.display = 'flex';
        }
    }

    printNextCharacter();
}

let lines = [
    '',
    'Nous voila devant le Bureau de M. Anderson.',
    'La porte est fermée !!',
    '',
    'TOC TOC ...',
    '...',
    'TOC TOC TOC ...',
    '...',
    'Personne ne répond ...',
    '',
    'Il doit y avoir un moyen d\'ouvrir cette fichue porte.',
    '',
    'Nous allons pouvoir tester tes compétences en informatique.',
    '',
    'Je vois un terminal sur la porte, essayons de l\'utiliser.',
    'Si tu m\'y connectes, je pourrais peut-etre trouver un moyen de contourner la sécurité.',
    '',
    'Mais avant, je dois te prévenir que M. Anderson est un homme très secret.',
    'Il ne fait confiance à personne.',
    'Il a du mettre en place un système de sécurité très complexe.',
    '',
    'Regardons ce terminal de plus près.',
];

printLines(lines);

