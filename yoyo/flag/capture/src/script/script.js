//Récupération des éléments dans des constantes
const indiceOne = document.querySelector(".indiceOne");
const indiceTwo = document.querySelector(".indiceTwo");
const indices = document.querySelectorAll('.buttonIndice');
const paraphIndice = document.querySelector(".indice");
const flag = ["J@WS!", "Piranha3D", "Sharknado"]

//Création de variable
let indiceTab = [];

//Création des Indices
for (let indice of indices) {
    indice.addEventListener('click', event => {
        event.preventDefault();
        paraphIndice.innerText = '';
        switch (true) {
            case indice.classList.contains("indiceOne") && (indice.classList.contains("button--retour") || indice.classList.contains("button--valider")):
                let img = document.createElement("img");
                img.setAttribute("src", "./src/img/wireshark.png")
                img.setAttribute("alt", "R&R : Requin et Réseau");
                img.classList.add("indice__img");
                paraphIndice.append(img);
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
                paraphIndice.innerText = `Pour y voir plus clair, les fichiers .pcap s'ouvrent avec Wireshark !`;
                if (!indiceTab.includes("indice 2")) {
                    indiceTab.push('indice 2');
                }
                if (indice.classList.contains("button--retour")) {
                    indice.classList.remove("button--retour");
                    indice.classList.add("button--valider");
                }
                break;
        }
    })
}

//Validation de la Réponse :
function checkAnswer() {
    const userAnswer = document.getElementById('answer').value;

    // Hash the user's answer using SHA-256
    const hashedAnswer = 'c736bbba5daea7ffba425a7a57a1c60e6314d5967b03a59e71bc200b5bb9ecd9'; // Replace with the hashed answer

    // Generate the SHA-256 hash of the user's input
    const crypto = window.crypto || window.msCrypto; // Get the crypto object
    const encoder = new TextEncoder();
    const data = encoder.encode(userAnswer);
    crypto.subtle.digest('SHA-256', data).then(function(hash) {
        const hashedUserAnswer = Array.from(new Uint8Array(hash)).map(byte => byte.toString(16).padStart(2, '0')).join('');

        if (hashedUserAnswer === hashedAnswer) {
            if (window.localStorage.getItem("capture") == null) {
                document.getElementById('result').textContent = `C\'est la bonne réponse ! Le code de ce Flag est : ${flag[indiceTab.length]}`;
                //ajout du Flag en localStorage
                localStorage.setItem("capture", flag[indiceTab.length]);
                //Envoie du flag à la BDD
                const data = { "nom": localStorage.getItem("team"), "flag": localStorage.getItem("capture") };
                const score = request("https://ctfpanel.adrardev.fr/api/score", "POST", data);
            } else {
                document.getElementById('result').textContent = `Tu as déjà capturé ce Flag. Ce dernier est ${window.localStorage.getItem("capture")}`;
            }
        } else {
            document.getElementById('result').textContent = 'Perdu !';
        }
    }).catch(function(error) {
        console.error(error);
    });
}