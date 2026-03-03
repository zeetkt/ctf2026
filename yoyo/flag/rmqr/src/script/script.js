//Récupération des éléments dans des constantes
const indiceOne = document.querySelector(".indiceOne");
const indiceTwo = document.querySelector(".indiceTwo");
const indiceThree = document.querySelector(".indiceThree");
const indiceFour = document.querySelector(".indiceFour");
const indices = document.querySelectorAll('.buttonIndice');
const paraphIndice = document.querySelector(".indice");
const flag = ["CodeT@F2024", "QR-King", "NotMicro", "SquareCode", "MicroT@F"]

//Création de variable
let indiceTab = [];

//Création des Indices
for (let indice of indices) {
    indice.addEventListener('click', event => {
        event.preventDefault();
        switch (true) {
            case indice.classList.contains("indiceOne") && (indice.classList.contains("button--retour") || indice.classList.contains("button--valider")):
                paraphIndice.innerText = `Est-ce vraiment un rMQR code ?`;
                if (!indiceTab.includes("indice 1")) {
                    indiceTab.push('indice 1');
                }
                if (indice.classList.contains("button--retour")) {
                    indice.classList.remove("button--retour");
                    indice.classList.add("button--valider");
                    indiceTwo.classList.add("button--retour");
                    indiceTwo.classList.remove("button--gris");
                }
                break;
            case indice.classList.contains("indiceTwo") && (indice.classList.contains("button--retour") || indice.classList.contains("button--valider")):
                paraphIndice.innerText = "Le stagiaire utilise souvent paint.net";
                if (!indiceTab.includes("indice 2")) {
                    indiceTab.push('indice 2');
                }
                if (indice.classList.contains("button--retour")) {
                    indice.classList.remove("button--retour");
                    indice.classList.add("button--valider");
                    indiceThree.classList.add("button--retour");
                    indiceThree.classList.remove("button--gris");
                }
                break;
            case indice.classList.contains("indiceThree") && (indice.classList.contains("button--retour") || indice.classList.contains("button--valider")):
                paraphIndice.innerText = `Il n'y a pas que les méninges qu'il faut tourner`;

                if (!indiceTab.includes("indice 3")) {
                    indiceTab.push('indice 3');
                }
                if (indice.classList.contains("button--retour")) {
                    indice.classList.remove("button--retour");
                    indice.classList.add("button--valider");
                }
                break;
            case indice.classList.contains("indiceFour") && (indice.classList.contains("button--retour") || indice.classList.contains("button--valider")):
                paraphIndice.innerText = `SpeVrai QR code`;

                if (!indiceTab.includes("indice 4")) {
                    indiceTab.push('indice 4');
                }
                if (indice.classList.contains("button--retour")) {
                    indice.classList.remove("button--retour");
                    indice.classList.add("button--valider");
                }
                break;
        }
    })
}

//Validation de la réponse
function checkAnswer() {
    const userAnswer = document.getElementById('answer').value;

    // Hash the user's answer using SHA-256
    const hashedAnswer = '76e388911bbe02b7326b2b7b94dbd7ffeb6a131afe84206b98192227cd426d9f'; // Replace with the hashed answer

    // Generate the SHA-256 hash of the user's input
    const crypto = window.crypto || window.msCrypto; // Get the crypto object
    const encoder = new TextEncoder();
    const data = encoder.encode(userAnswer);
    crypto.subtle.digest('SHA-256', data).then(function(hash) {
        const hashedUserAnswer = Array.from(new Uint8Array(hash)).map(byte => byte.toString(16).padStart(2, '0')).join('');

        if (hashedUserAnswer === hashedAnswer) {
            if (window.localStorage.getItem("rmqr") == null) {
                document.getElementById('result').textContent = `C\'est la bonne réponse ! Le code de ce Flag est : ${flag[indiceTab.length]}`;
                //ajout du Flag en localStorage
                localStorage.setItem("rmqr", flag[indiceTab.length]);
                //Envoie du flag à la BDD
                const data = { "nom": localStorage.getItem("team"), "flag": localStorage.getItem("rmqr") };
                const score = request("https://ctfpanel.adrardev.fr/api/score", "POST", data);
            } else {
                document.getElementById('result').textContent = `Tu as déjà capturé ce Flag. Ce dernier est ${window.localStorage.getItem("rmqr")}`;
            }
        } else {
            document.getElementById('result').textContent = 'Perdu !';
        }
    }).catch(function(error) {
        console.error(error);
    });
}