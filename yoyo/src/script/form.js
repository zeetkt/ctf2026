// Récupération du lien de redirection
const link = document.querySelector("#admin-link");

link.addEventListener("click", event => {
    event.preventDefault();
    window.localStorage.setItem("formulaire", "T@F001");
    location.href = "connexion.html";
})

document.addEventListener('DOMContentLoaded', async () => {
    const pseudo = document.getElementById('prenom');
    const email = document.getElementById('email');
    const formDisplay = document.getElementById('myForm');
    const adminDisplay = document.getElementById('adminSection');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const cancelMessage = document.getElementById('cancelMessage');
    const userAgent = window.navigator.userAgent;
    let ipAddress = await fetchIpAddress(); // Récupérer l'adresse IP
    const browserType = window.navigator.appName;
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const progressBar = document.getElementById('progressBar');
    const progressBarCancel = document.getElementById('progressBarCancel');
    let progressInterval; // Déclarer une variable pour stocker l'intervalle
    const errorMessage = document.getElementById('errorMessage'); // Récupération de l'élément du message d'erreur

    document.getElementById('envoyerBtn').addEventListener('click', (event) => {
        event.preventDefault(); // Empêche le rechargement de la page par défaut
        if (validateForm()) {
            formSubmit();
        } else {
            displayErrorMessage(); // Affiche le message d'erreur si le formulaire n'est pas valide
        }
    });

    document.getElementById('effacerBtn').addEventListener('click', (event) => {
        event.preventDefault(); // Empêche le rechargement de la page par défaut
        formCancel();
    });

    document.getElementById('retourBtn').addEventListener('click', (event) => {
        event.preventDefault(); // Empêche le rechargement de la page par défaut
        formShow();
    });

    document.getElementById('retourBtnCancel').addEventListener('click', (event) => {
        event.preventDefault(); // Empêche le rechargement de la page par défaut
        formShow();
    });

    document.getElementById('admin-link').addEventListener('click', (event) => {
        event.preventDefault(); // Empêche le rechargement de la page par défaut
        adminShow();
    });

    function validateForm() {
        if (!pseudo.value.trim() || !email.value.trim() || !document.getElementById('conditions').checked) {
            // Affiche le message d'erreur si un champ obligatoire n'est pas rempli
            displayErrorMessage();
            return false;
        }
        // Cache le message d'erreur s'il y en avait un et que le formulaire est maintenant valide
        hideErrorMessage();
        return true;
    }

    function formSubmit() {
        formDisplay.style.display = 'none';
        confirmationMessage.style.display = 'block';
        displayFormInfo(confirmationMessage);
        startProgressInterval(increaseProgress);
    }

    function formCancel() {
        formDisplay.style.display = 'none';
        cancelMessage.style.display = 'block';
        displayFormCancel(cancelMessage);
        startProgressInterval(increaseProgressCancel);
    }

    function formShow() {
        formDisplay.style.display = 'block';
        confirmationMessage.style.display = 'none';
        cancelMessage.style.display = 'none';
    }

    function adminShow() {
        adminDisplay.style.display = 'block';
    }

    function startProgressInterval(callback) {
        let progress = 0;
        progressInterval = setInterval(() => {
            callback(progress);
            progress++;
            if (progress >= 100) {
                clearInterval(progressInterval);
            }
        }, 300); // Ajustez la vitesse de progression ici (plus petit pour plus rapide)
    }

    function increaseProgress(progress) {
        progressBar.style.width = `${progress}%`;
    }

    function increaseProgressCancel(progress) {
        progressBarCancel.style.width = `${progress}%`;
    }

    function displayFormInfo(messageElement) {
        messageElement.querySelector('#pseudoInfo').textContent = pseudo.value || 'Aucun (Bien Joué mais ...)';
        messageElement.querySelector('#emailInfo').textContent = email.value || 'Aucun (on a quand même récolté certaines données ...)';
        messageElement.querySelector('#userAgent').textContent = userAgent;
        messageElement.querySelector('#ipAddress').textContent = ipAddress || generateRandomIpAddress(); // Afficher l'adresse IP ou la valeur par défaut
        messageElement.querySelector('#browserType').textContent = browserType;
        messageElement.querySelector('#screenResolution').textContent = screenResolution;
    }

    function displayFormCancel(messageElement) {
        messageElement.querySelector('#pseudoCancel').textContent = pseudo.value || 'Aucun (Bien Joué mais ...)';
        messageElement.querySelector('#emailCancel').textContent = email.value || 'Aucun (on a quand même récolté certaines données ...)';
        messageElement.querySelector('#userAgentCancel').textContent = userAgent;
        messageElement.querySelector('#ipAddressCancel').textContent = ipAddress || generateRandomIpAddress(); // Afficher l'adresse IP ou la valeur par défaut
        messageElement.querySelector('#browserTypeCancel').textContent = browserType;
        messageElement.querySelector('#screenResolutionCancel').textContent = screenResolution;
    }

    async function fetchIpAddress() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'adresse IP :', error.message);
            return null;
        }
    }

    function generateRandomIpAddress() {
        const randomSegment = () => Math.floor(Math.random() * 256);
        return `${randomSegment()}.${randomSegment()}.${randomSegment()}.${randomSegment()}`;
    }

    // Ajout de la fonction pour afficher le message d'erreur
    function displayErrorMessage() {
        errorMessage.style.display = 'block';
    }

    // Ajout de la fonction pour cacher le message d'erreur
    function hideErrorMessage() {
        errorMessage.style.display = 'none';
    }
});
