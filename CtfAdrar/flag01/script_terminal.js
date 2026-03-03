// Penser à supprimer les commentaires !!!

// Fonction pour générer une date aléatoire
function gettimeTodate() {
    var length = 12,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

// Stocker la date en variable
var tmp = gettimeTodate();

// Convertion du message en binaire
var hiddenMessage = '';
for (var i = 0; i < tmp.length; i++) {
    hiddenMessage += tmp[i].charCodeAt(0).toString(2).padStart(8, '0') + ' ';
}
hiddenMessage = hiddenMessage.trim();

// Stocker le message dans un cookie
document.cookie="pass=" + hiddenMessage + "; path=/";

// Convertir le message en un tableau de caracteres
var binaryChars = hiddenMessage.split("");

// Variable pour suivre l'index du caractere actuel
var currentIndex = 0;

function createStar() {
    var star = document.createElement('div');
    star.className = 'star';
    star.style.right = Math.random() * window.innerWidth + 'px';
    star.style.animationDuration = Math.random() * 3 + 2 + 's'; // entre 2 et 5 secondes
    star.style.opacity = Math.random();

    // Ajouter le caractere actuel comme contenu a afficher
    star.textContent = binaryChars[currentIndex];

    // Augmenter l'index pour le prochain caractere
    currentIndex = (currentIndex + 1) % binaryChars.length;

    document.body.appendChild(star);

    // Supprimer le caractere après 3 secondes
    setTimeout(function() {
        document.body.removeChild(star);
    }, 3000);
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
            let inputWrapper = document.createElement('div');
            inputWrapper.id = 'codeInputWrapper';
            let inputField = document.createElement('input');
            inputField.id = 'codeInput';
            inputField.type = 'text';
            inputField.placeholder = 'Entrez le flag ici ...';
            inputWrapper.appendChild(inputField);
            footer.appendChild(inputWrapper);
            let validateButton = document.createElement('button');
            validateButton.innerText = "Valider la clé";
            validateButton.className = 'centered-button';
            validateButton.onclick = function() {
                let userInput = inputField.value;
                if (userInput === hiddenMessage) {
                    window.location.href = "error/denied.html";
                } else if (userInput === tmp) {
                    document.cookie = "flag01passed=true; path=/";
                    window.location.href = "passed/index.html";
                } else {
                    window.location.href = "denied/denied.html";
                }
            };
            footer.appendChild(validateButton);
            let reloadButton = document.createElement('button');
            reloadButton.innerText = "Recharger la page";
            reloadButton.className = 'centered-button';
            reloadButton.onclick = function() {
                window.location.href = '/flag01/flag01.html';
            };
            footer.appendChild(reloadButton);

            footer.style.display = 'flex';
        }
    }
    
    printNextCharacter();

}

let lines = [
    'Des Zero et des Un ...',
    'Mon langage préféré !!',
    '',
    'On dirait que M. Anderson a laissé un message pour nous.',
    'Sauras-tu le décoder ?',
    '',
    'A toi de jouer ...',

];

// Creation du timer
function startTimer() {
    // Message de connection
    alert("Bienvenue dans le terminal de M. Anderson. Vous avez 4 minutes pour décoder le message.\n\nAprès quoi la page se rechargera et la clé sera réinitialisée.\n\nMême chose si vous validez une clé erronée !!\n\n### Bonne chance ###");

    var timerElement = document.getElementById('timer');
    var timeLeft = 240; // 4 minutes

    var timerInterval = setInterval(function() {
        timeLeft--;
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;
        timerElement.textContent = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            window.location.reload(); // Recharger la page
        }
    }, 1000);

    // Lancer le binaire quand le timer commence
    setInterval(createStar, 100);

    // Afficher le message
    setTimeout(function() {
        printLines(lines);
    }, 2000);
}
