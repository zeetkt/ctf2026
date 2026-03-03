//méthode pour envoyer les données au serveur
function request(url, method, data, ) {
    fetch(url, {
        method: method,
        body: JSON.stringify(data),
    }).then(async response => {
        const json = await response.json();
        console.log(json);
        console.log(response.status);
        return response.status;
    });
}

/*exemple :
Envoie du flag à la BDD
            const data = { "nom": localStorage.getItem("team"), "flag": localStorage.getItem("anagramme") };
            const score = request("https://ctfpanel.adrardev.fr/api/score", "POST", data);
*/