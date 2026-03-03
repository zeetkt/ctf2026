// //Enregistrement du flag dans le Local Storage
// localStorage.setItem("CosmoCat", "Taf31{CtonT@f}");

// //Envoie du code à la BDD
// const data = { "nom": localStorage.getItem("team"), "flag": localStorage.getItem("CosmoCat") };
// const score = request("https://ctfpanel.adrardev.fr/api/score", "POST", data);


//Recupération des éléments
const result = document.querySelector('#result');
const button = document.querySelector('button');
const code = "Taf31{CtonT@f}";

//Validation de la réponse
button.addEventListener('click', event => {
    event.preventDefault();
    let answer = document.querySelector('input').value;
    if (answer == code) {
        if (window.localStorage.getItem("CosmoCat") == null) {
            result.innerText = `Bravo, tu as trouvé le bon flag : Taf31{CtonT@f}`;
            //Enregistrement du flag en Local Storage
            localStorage.setItem("CosmoCat", "Taf31{CtonT@f}");
            //Envoie du flag à la BDD
            const data = { "nom": localStorage.getItem("team"), "flag": localStorage.getItem("CosmoCat") };
            const score = request("https://ctfpanel.adrardev.fr/api/score", "POST", data);
        } else {
            result.innerText = `Tu as déjà capturé ce Flag. Ce dernier est ${window.localStorage.getItem("CosmoCat")}`;
        }
    } else {
        result.innerText = "Ce n'est pas la bonne réponse !";
    }

})