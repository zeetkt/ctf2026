


//Recupération des éléments
const result = document.querySelector('#result');
const button = document.querySelector('button');
const code = "T@f2024{TerminalAmi31}";

//Validation de la réponse
button.addEventListener('click', event => {
    event.preventDefault();
    let answer = document.querySelector('input').value;
    if (answer == code) {
        if (window.localStorage.getItem("Co0k1e") == null) {
            result.innerText = `Bravo, tu as trouvé le bon flag : T@f2024{TerminalAmi31}`;
            //Enregistrement du flag en Local Storage
            localStorage.setItem("Co0k1e", "T@f2024{TerminalAmi31}");
            //Envoie du flag à la BDD
            const data = { "nom": localStorage.getItem("team"), "flag": localStorage.getItem("Co0k1e") };
            const score = request("https://ctfpanel.adrardev.fr/api/score", "POST", data);
        } else {
            result.innerText = `Tu as déjà capturé ce Flag. Ce dernier est ${window.localStorage.getItem("Co0k1e")}`;
        }
    } else {
        result.innerText = "Ce n'est pas la bonne réponse !";
    }

})