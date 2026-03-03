const flag = ["ChampionT@f!!!2024", "BastienT@f!!!2024"];
let indiceTab = []

//Validation de la Réponse
function checkAnswer() {
    const userAnswer = document.getElementById('answer').value;

    // Hash the user's answer using SHA-256
    const hashedAnswer = '5a292ba23110f11b3467e2089c02b36205675ec1b5667aedd3cfd1b4bf09cfb1'; // Replace with the hashed answer

    // Generate the SHA-256 hash of the user's input
    const crypto = window.crypto || window.msCrypto; // Get the crypto object
    const encoder = new TextEncoder();
    const data = encoder.encode(userAnswer);
    crypto.subtle.digest('SHA-256', data).then(function(hash) {
        const hashedUserAnswer = Array.from(new Uint8Array(hash)).map(byte => byte.toString(16).padStart(2, '0')).join('');

        if (hashedUserAnswer === hashedAnswer) {
            if (localStorage.getItem("bastien") != null && indiceTab.length == 0) {
                indiceTab.push("bastien");
            }
            if (window.localStorage.getItem("cap") == null) {
                document.getElementById('result').textContent = `C\'est la bonne réponse ! Le code de ce Flag est : ${flag[indiceTab.length]}`;
                //ajout du Flag en localStorage
                localStorage.setItem("cap", flag[indiceTab.length]);
                //Envoie du flag à la BDD
                const data = { "nom": localStorage.getItem("team"), "flag": localStorage.getItem("cap") };
                const score = request("https://ctfpanel.adrardev.fr/api/score", "POST", data);
            } else {
                document.getElementById('result').textContent = `Tu as déjà capturé ce Flag. Ce dernier est ${window.localStorage.getItem("cap")}`;
            }
        } else {
            document.getElementById('result').textContent = 'Perdu !';
        }
    }).catch(function(error) {
        console.error(error);
    });
}