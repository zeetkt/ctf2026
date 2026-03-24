//R  cup  ration des   l  ments dans des constantes
const indiceOne = document.querySelector(".indiceOne");
const indiceTwo = document.querySelector(".indiceTwo");
const indiceThree = document.querySelector(".indiceThree");
const indices = document.querySelectorAll('.buttonIndice');
const paraphIndice = document.querySelector(".indice");
const flag = ["SuperT@F", "Spectrum", "SON@R", "Aud@cieux"]

//Cr  ation de variable
let indiceTab = [];

//Cr  ation des Indices
for (let indice of indices) {
    indice.addEventListener('click', event => {
        event.preventDefault();
        switch (true) {
            case indice.classList.contains("indiceOne") && (indice.classList.contains("button--retour") || indice.classList.contains("button--valider")):
                paraphIndice.innerText = `Saviez-vous que l'on peut repr  senter le son par un spectre visuel ?`;
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
                paraphIndice.innerText = "Cherchez avec audace comment analyser ce son !";
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
                paraphIndice.innerText = `L'audace pass  e, un clic suffit pour passer du son au message !`;

                if (!indiceTab.includes("indice 3")) {
                    indiceTab.push('indice 3');
                }
                if (indice.classList.contains("button--retour")) {
                    indice.classList.remove("button--retour");
                    indice.classList.add("button--valider");
                }
                break;
        }
    })
}

//Validation de la R  ponse
function checkAnswer() {
    const userAnswer = document.getElementById('answer').value;
    const correctAnswer = atob('VEBGMTk=');

    if (userAnswer === correctAnswer) {
        if (window.localStorage.getItem("spectre") == null) {
            document.getElementById('result').textContent = `C\'est la bonne r  ponse ! Le code de ce Flag est : ${flag[indiceTab.length]}`;
            localStorage.setItem("spectre", flag[indiceTab.length]);
            const data = { "nom": localStorage.getItem("team"), "flag": localStorage.getItem("spectre") };
            request("https://ctfpanel.adrardev.fr/api/score", "POST", data);
        } else {
            document.getElementById('result').textContent = `Tu as d  j   captur   ce Flag. Ce dernier est ${window.localStorage.getItem("spectre")}`;
        }
    } else {
        document.getElementById('result').textContent = 'Mauvaise r  ponse ! Ce n\'est pas le bon flag. R    coutez le message et r  essayez.';
    }
}


