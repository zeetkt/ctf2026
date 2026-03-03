//fermer le modal
const btclose = document.getElementById('bt-close');
btclose.addEventListener('click', (e) => {
    console.log(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.style.display = 'none';
});
//modal isncription
const btRegister = document.getElementById('bt_register');
btRegister.addEventListener('click', (e) => {
    e.preventDefault();
    //afficher le modal
    document.getElementById('modal').style.display = 'flex';
    //récupérer les boutons
    const bt_confirm = document.getElementById('bt_confirm');
    const bt_cancel = document.getElementById('bt_cancel');
    //recuperation du message
    const message = document.getElementById('message--modal');
    //afficher le modal
    document.getElementById('modal').style.display = 'flex';
    //récupérer les valeurs des champs
    let nom = document.getElementById('nom').value;
    let login = document.getElementById('login').value;
    let mdp = document.getElementById('mdp').value;
    if (nom != "" || login != "" || mdp != "") {
        //test si le login et password admin est valide
        if (login == "admin" && mdp == "Admin@Meet2024") {
            //test des boutons
            message.textContent = "Vous avez réussi à vous connecter," +
                " Vous avez gagné 100 pts, Cliquez sur le bouton confimer " +
                "pour créer votre compte";
            //request pour créer le compte
            bt_confirm.addEventListener('click', (e) => {
                const data = { "nom": nom, "prenom": nom };
                const data2 = { "nom": nom, "flag": "FLAG_1016" };
                const code = request("https://ctfpanel.adrardev.fr/api/participant/add", "POST", data);
                if (code == 200) {
                    //stocker les informations dans le localStorage
                    localStorage.setItem('team', nom);
                    localStorage.setItem('admin', "FLAG_1016");
                    console.log(e.parentNode.parentNode);
                }
                //api pour ajouter les points au compte
                //d'abord ceux de ce formulaire
                /*const score = request("https://ctfpanel.adrardev.fr/api/score", "POST", data2);
                //puis ceux du formulaire précédent
                const previousData = { "nom": nom, "flag": window.localStorage.getItem("formulaire") };
                const score2 = request("https://ctfpanel.adrardev.fr/api/score", "POST", previousData);*/
                //stocker les informations dans le localStorage
                localStorage.setItem('team', nom);
                localStorage.setItem('admin', "FLAG_1016");
                //fermer le modal
                e.target.parentNode.parentNode.parentNode.style.display = 'none';
                //redirection dans 3 secondes
                setTimeout(() => { location.href = "./accueil.html"; }, 3000);
            });
            //bt pour annuler
            bt_cancel.addEventListener('click', (e) => {
                e.target.parentNode.parentNode.parentNode.style.display = 'none';
            });
            //request pour ajouter les points au compte

        }
        //test si le login est valide
        else if (login == "admin") {
            //test des boutons
            message.textContent = "Vous avez réussi à vous connecter. Vous gagnez 50 points, mais" +
                " il vous manque le password pour gagner 50 points supplémentaires" +
                " cliquez sur le bouton confirmer pour créer le compte quand même" +
                " ou annuler pour recommencer";
            //request pour créer le compte
            bt_confirm.addEventListener('click', (e) => {
                const data = { "nom": nom, "prenom": nom };
                const data2 = { "nom": nom, "flag": "FLAG_1010" };
                const code = request("https://ctfpanel.adrardev.fr/api/participant/add", "POST", data);
                if (code == 200) {
                    //stocker les informations dans le localStorage
                    localStorage.setItem('team', nom);
                    localStorage.setItem('admin', "Flag_1010");
                    console.log(e.parentNode.parentNode);
                }
                //api pour ajouter les points au compte
                //d'abord ceux de ce formulaire
                /*const score = request("https://ctfpanel.adrardev.fr/api/score", "POST", data2);
                //puis ceux du formulaire précédent
                const previousData = { "nom": nom, "flag": window.localStorage.getItem("formulaire") };
                const score2 = request("https://ctfpanel.adrardev.fr/api/score", "POST", previousData);*/
                //stocker les informations dans le localStorage
                localStorage.setItem('team', nom);
                localStorage.setItem('admin', "Flag_1010");
                //fermer le modal
                e.target.parentNode.parentNode.parentNode.style.display = 'none';
                //redirection dans 3 secondes
                setTimeout(() => { location.href = "./accueil.html"; }, 3000);
            });
            //bt pour annuler
            bt_cancel.addEventListener('click', (e) => {
                e.target.parentNode.parentNode.parentNode.style.display = 'none';
            });
        }
        //test si le login n'est valide
        else {
            message.textContent = "Vous n'avez pas réussi à vous connecter, veuillez vérifier vos informations";
            //bt pour confirmer
            bt_confirm.addEventListener('click', (e) => {
                e.target.parentNode.parentNode.parentNode.style.display = 'none';
            });
            //bt pour annuler
            bt_cancel.addEventListener('click', (e) => {
                e.target.parentNode.parentNode.parentNode.style.display = 'none';
            });
        }
    } else if (nom == "") {
        message.textContent = "Vous n'avez pas réussi à vous connecter, veuillez vérifier vos informations";
        //bt pour confirmer
        bt_confirm.addEventListener('click', (e) => {
            e.target.parentNode.parentNode.parentNode.style.display = 'none';
        });
        //bt pour annuler
        bt_cancel.addEventListener('click', (e) => {
            e.target.parentNode.parentNode.parentNode.style.display = 'none';
        });
    }
});


/* modal information*/
const info = document.getElementById('bouton--info');
//ouvrir le modal
info.addEventListener('click', (e) => {
    document.getElementById('modal--info').style.display = 'flex';
    document.querySelector('main').classList.add('is-blurred');
    document.querySelector('header').classList.add('is-blurred');
});
const closeInfo = document.getElementById('btInfoClose');
//fermer le modal information
closeInfo.addEventListener('click', (e) => {
    document.getElementById('modal--info').style.display = 'none';
    document.querySelector('main').classList.remove('is-blurred');
    document.querySelector('header').classList.remove('is-blurred');
});

//méthode pour envoyer les données au serveur
function request(url, method, data, ) {
    fetch(url, {
        method: method,
        body: JSON.stringify(data),
    }).then(async response => {
        const json = await response.json();
        console.log(json);
        console.log(response.status);
        localStorage.setItem("json", json);
        localStorage.setItem("status", response.status);
        return response.status;
    });
}