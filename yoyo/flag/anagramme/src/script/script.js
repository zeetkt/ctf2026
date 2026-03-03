/*MOTS A DEVINER
Fichier
Upgrade
Transfert
USB
Reseau

Mot de passe du coffre : Futur
*/
//Création des tableaux de lettre pour chaque mot
const fichier = ["C", "R", "E", "I", "F", "H", "I"];
const upgrade = ["E", "P", "D", "U", "A", "G", "R"];
const transfert = ["S", "T", "A", "R", "E", "R", "F", "T", "N"];
const usb = ["S", "U", "B"];
const reseau = ["U", "R", "E", "E", "S", "A"];
const password = "futur";
const flag = "Netrunner";

//Récupération des zones
const box = document.querySelector('.box');
const anagrammeButton = document.querySelector('.anagramme__button');
const words = document.querySelector('.words');
const vaultButton = document.querySelector('.vault__combinaison__button');
const message = document.querySelector('.message');
const response = document.querySelector('.response');

//Création des fonctions
//Insertion de lettre
function insert(letter, target) {
    let paraph = document.createElement("p");
    paraph.innerText = letter;
    target.append(paraph);
}
//Insertion des anagrammes
function anagramme(lettersTab) {
    //vider la box
    box.innerText = "";
    for (let element of lettersTab) {
        insert(element, box);
    }
}
//Insertion des mots trouvé
function word(string, target) {
    //transforme le mot en tableau
    let tab = Array.from(string);
    //création d'une boite pour le mot
    let div = document.createElement("div");
    //insert des lettres dans la div
    for (let element of tab) {
        insert(element, div);
    }
    //insert du mot dans la cible
    target.append(div);
}

//vérification de la réponse du joueur
function verifPhase(answer, word) {
    let verif = answer.toUpperCase();
    return (verif == word);
}

//Passage de phase :
function phase(phase, nextPhase, word) {
    //on termine la phase en cours
    anagrammeButton.classList.remove(phase);
    //on passe à la phase suivante
    anagrammeButton.classList.add(nextPhase);
    //on ajoute les lettres
    anagramme(word);
}

//Validation de phase
function validatePhase(answer, goodWord, runningPhase, nextPhase, nextWord) {
    if (verifPhase(answer.value, goodWord)) {
        //insert le mot trouvé
        word(goodWord, words);
        //on passe à la phase suivante
        phase(runningPhase, nextPhase, nextWord);
        return true;
    } else {
        message.innerText = "Mauvaise Réponse."
        return false;
    }
}

//Initialisation de la partie : Phase One
anagramme(fichier);

//Déroulement de la partie
//click sur le bouton réponse :
anagrammeButton.addEventListener("click", event => {
    event.preventDefault();
    //on vide le message d'erreur
    message.innerText = "";
    //recup de la réponse
    let answer = document.querySelector('.anagramme__input');
    //Vérifier la phase à laquel on est :
    //Si la réponse est bonne :
    //1) on l'ajoute à la liste des mots
    //2) on passe à la phase suivante
    //3) on ajoute les nouvelles lettres
    //Sinon on affiche une erreur
    switch (true) {
        case anagrammeButton.classList.contains("phaseTwo"):
            validatePhase(answer, "UPGRADE", "phaseTwo", "phaseThree", transfert);
            answer.value = "";
            break;
        case anagrammeButton.classList.contains("phaseThree"):
            validatePhase(answer, "TRANSFERT", "phaseThree", "phaseFour", usb);
            answer.value = "";
            break;
        case anagrammeButton.classList.contains("phaseFour"):
            validatePhase(answer, "USB", "phaseFour", "phaseFive", reseau);
            answer.value = "";
            break;
        case anagrammeButton.classList.contains("phaseFive"):
            if (validatePhase(answer, "RESEAU", "phaseFour", "phaseFinal", "")) {
                message.innerText = "Vous avez trouvé les 5 anagrammes. Maintenant, vous devriez pouvoir trouver le mot de passe."
                document.querySelector('.anagramme').classList.add('displayNone');
            }
            answer.value = "";
            break;
        default:
            validatePhase(answer, "FICHIER", "phaseOne", "phaseTwo", upgrade);
            answer.value = "";
    }
})

//Dévérouillage du Coffre
vaultButton.addEventListener('click', event => {
    event.preventDefault();
    let combinaison = document.querySelector('.vault__combinaison__input');
    combinaison.value = combinaison.value.toLowerCase();
    if (combinaison.value == password) {
        if (window.localStorage.getItem("anagramme") == null) {
            response.innerText = `Félicitation, le coffre s'ouvre ! Le mot clé de ce flag est ${flag}`;
            window.localStorage.setItem("anagramme", flag);
            //Envoie du flag à la BDD
            const data = { "nom": localStorage.getItem("team"), "flag": localStorage.getItem("anagramme") };
            const score = request("https://ctfpanel.adrardev.fr/api/score", "POST", data);
        } else {
            response.innerText = `Tu as déjà capturé ce Flag. Ce dernier est ${window.localStorage.getItem("anagramme")}`;
        }
    } else {
        response.innerText = "Le coffre reste vérouillé !";
    }
})