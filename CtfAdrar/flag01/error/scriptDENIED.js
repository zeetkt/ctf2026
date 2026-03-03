// Votre texte
var text1 = "### ERROR ###";
var text2 = "### ACCESS DENIED ###";
// Convertir le texte en un tableau de caracteres
var chars1 = text1.split("");
var chars2 = text2.split("");
// Les éléments HTML où le texte sera affiché
var outputElement1 = document.getElementById('output1');
var outputElement2 = document.getElementById('output2');

// Fonction pour afficher le texte caractere par caractere
function displayText() {
    if (chars1.length > 0) {
        // Ajouter le prochain caractere au texte de l'element de sortie
        outputElement1.textContent += chars1.shift();
        // Appeler cette fonction avec un delai
        setTimeout(displayText, 24);
    } else if (chars2.length > 0) {
        // Ajouter le prochain caractere au texte de l'element de sortie
        outputElement2.textContent += chars2.shift();
        // Appeler cette fonction avec un delai
        setTimeout(displayText, 24);
    }
}

// Commencer à afficher le texte
displayText();

var countdownElement = document.getElementById('countdown');
var countdown = 5; // Durée du compte à rebours en secondes

// Fonction pour mettre à jour le compte à rebours
function updateCountdown() {
    if (countdown > 0) {
        // Mettre à jour le texte de l'élément de compte à rebours
        countdownElement.textContent = 'Redémarrage dans ' + countdown + ' secondes...';

        // Décrémenter le compte à rebours
        countdown--;

        // Appeler cette fonction avec un délai d'une seconde
        setTimeout(updateCountdown, 1000);
    } else {
        // Rediriger vers page après que le compte à rebours a atteint 0
        window.location.href = "../retry/flag01.html";
    }
}

// Commencer le compte à rebours
updateCountdown();