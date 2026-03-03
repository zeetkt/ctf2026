//Récupération des éléments dans des constantes
const indiceOne = document.querySelector(".indiceOne");
const indiceTwo = document.querySelector(".indiceTwo");
const indiceThree = document.querySelector(".indiceThree");
const indices = document.querySelectorAll('button');
const button = document.querySelector(".submit");
const paraphResponse = document.querySelector(".response");
const paraphIndice = document.querySelector(".indice");
const code = "morgane";
const flag = ["FILIGRANE", "Waterm@rk", "BewareTheTrees", "GO@L!!!"]

//Création de variable
let indiceTab = [];

//Création des Indices
for (let indice of indices) {
    indice.addEventListener('click', event => {
        event.preventDefault();
        switch (true) {
            case indice.classList.contains("indiceOne") && (indice.classList.contains("button--retour") || indice.classList.contains("button--valider")):
                paraphIndice.innerText = "As-tu essayé de regarder les arbres ?"
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
                paraphIndice.innerText = "C'est peut-être une histoire de contraste et de luminosité. On devrait pouvoir trouver une application de retouche d'image en ligne."

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
                paraphIndice.innerText = "Je pense qu'il faudrait trouver un moyen de modifier le contraste et la luminosité à plusieurs reprises."

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

//Validation du code
button.addEventListener("click", event => {
    event.preventDefault();
    let answer = document.querySelector(".answer");
    answer = answer.value.toLowerCase();
    console.log(answer);
    console.log(code);
    if (answer == code) {
        if (window.localStorage.getItem("exifs") == null) {
            paraphResponse.innerText = `Félicitation, tu as capturé le flag avec ${indiceTab.length} indices ! Ce dernier est ${flag[indiceTab.length]}`;
            window.localStorage.setItem("exifs", flag[indiceTab.length]);
            //Envoie du flag à la BDD
            const data = { "nom": localStorage.getItem("team"), "flag": localStorage.getItem("exifs") };
            const score = request("https://ctfpanel.adrardev.fr/api/score", "POST", data);
        } else {
            paraphResponse.innerText = `Tu as déjà capturé ce Flag. Ce dernier est ${window.localStorage.getItem("exifs")}`;
        }
    } else {
        paraphResponse.innerText = "Cherchez encore !";
    }
})