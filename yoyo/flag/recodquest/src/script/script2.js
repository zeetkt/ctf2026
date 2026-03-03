//Enregistrement du flag dans le Local Storage
localStorage.setItem("recodquest", "PerceCode");

//Envoie du code à la BDD
const data = { "nom": localStorage.getItem("team"), "flag": localStorage.getItem("recodquest") };
const score = request("https://ctfpanel.adrardev.fr/api/score", "POST", data);