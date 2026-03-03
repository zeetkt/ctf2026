//Recupération des éléments
const codeFlag = document.querySelectorAll('.flag__code');
const displayCodeFlag = document.querySelector('.displayCodeFlag');
const flagStars = document.querySelectorAll('.flag__star');
const bastienInput = document.querySelector('.bastienInput');
const bastienAcitvate = document.querySelector('.bastien');
const displayBastien = document.querySelector('.displayBastien');
let tab = Array.from(codeFlag);

//Activation de la carte allié
bastienInput.addEventListener("keyup", event => {
    let string = document.querySelector('.bastienInput').value;
    string = string.toLowerCase();
    if (string == "bastien") {
        bastienAcitvate.classList.remove('button--gris');
        bastienAcitvate.classList.add('button--valider');
    } else {
        bastienAcitvate.classList.add('button--gris');
        bastienAcitvate.classList.remove('button--valider');
    }
})

bastienAcitvate.addEventListener("click", event => {
    event.preventDefault();
    if (bastienAcitvate.classList.contains('button--valider')) {
        window.localStorage.setItem("bastien", "Le nom que vous avez crié est un bon nom. Vous pouvez maintenant appelé un membre de l'Adrar pour vous guider dans l'Ultime Epreuve.");
        let bastien = window.localStorage.getItem("bastien");
        displayBastien.innerText = bastien;
        displayBastien.classList.toggle("zoom");
        displayBastien.classList.toggle("reduce");
        displayBastien.classList.toggle("displayNone");
        displayBastien.classList.toggle("displayFlex");
    }
})

for (let button of codeFlag) {
    if (window.localStorage.getItem(button.id) !== null) {
        button.classList.remove("button--gris");
        button.classList.add("button--annuler");
        let index = tab.indexOf(button);
        flagStars[index].classList.remove('displayNone');

    }
    button.addEventListener('click', event => {
        event.preventDefault();
        if (button.classList.contains('button--annuler')) {
            let flag = window.localStorage.getItem(button.id);
            displayCodeFlag.innerText = `Le code de ce Flag est : ${flag}`;
            displayCodeFlag.classList.toggle("zoom");
            displayCodeFlag.classList.toggle("reduce");
            displayCodeFlag.classList.toggle("displayNone");
            displayCodeFlag.classList.toggle("displayFlex");
        }
    })
}

displayCodeFlag.addEventListener('click', event => {
    event.preventDefault();

    displayCodeFlag.classList.toggle("zoom");
    displayCodeFlag.classList.toggle("reduce");
    setTimeout(() => {
        displayCodeFlag.innerText = "";
        displayCodeFlag.classList.toggle("displayNone");
        displayCodeFlag.classList.toggle("displayFlex");
    }, 1000);
})

displayBastien.addEventListener('click', event => {
    event.preventDefault();

    displayBastien.classList.toggle("zoom");
    displayBastien.classList.toggle("reduce");
    setTimeout(() => {
        displayBastien.innerText = "";
        displayBastien.classList.toggle("displayNone");
        displayBastien.classList.toggle("displayFlex");
    }, 1000);
})


//Ajout des points obtenus lors du formulaire et de connexion admin
//on vérifie que les flag ont été récupéré
if (localStorage.getItem("formulaire") != null && localStorage.getItem("admin") != null) {
    //api pour ajouter les points au compte
    //d'abord ceux de ce formulaire
    const dataAdmin = { "nom": localStorage.getItem("team"), "flag": localStorage.getItem("admin") };
    const score = request("https://ctfpanel.adrardev.fr/api/score", "POST", dataAdmin);
    //puis ceux du formulaire précédent
    setTimeout(() => {
        const dataForm = { "nom": localStorage.getItem("team"), "flag": localStorage.getItem("formulaire") };
        const score2 = request("https://ctfpanel.adrardev.fr/api/score", "POST", dataForm);
    }, 500);
}


//Désactivation du second Flag de Tym si le premier Flag n'est pas fini :
const cookieButton = document.querySelector('#Co0k1e');
const cosmocatLink = document.querySelector('#CosmoCatLink');
const cosmocatButtonLancer = document.querySelector('#CosmoCatButton');
const cosmocatButton = document.querySelector('#CosmoCat');
const comsatLink = document.querySelector('#ComSatLink');
const comsatButtonLancer = document.querySelector('#ComSatButton');
const comsatButton = document.querySelector('#ComSat');

if(cookieButton.classList.contains("button--annuler")){
    cosmocatButtonLancer.classList.add("button--valider");
    cosmocatButtonLancer.classList.remove("button--gris");
}

if(cosmocatButton.classList.contains("button--annuler")){
    comsatButtonLancer.classList.add("button--valider");
    comsatButtonLancer.classList.remove("button--gris");
}

cosmocatButtonLancer.addEventListener("click",event=>{
    event.preventDefault();
    if(cosmocatButtonLancer.classList.contains("button--valider")){
        location.href="./flag/redrocket/flag02/cosmocat.html";
    }
})

comsatButtonLancer.addEventListener("click",event=>{
    event.preventDefault();
    if(comsatButtonLancer.classList.contains("button--valider")){
        location.href="./flag/redrocket/flag03/comsat.html";
    }
})