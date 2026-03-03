//recup du lien deredirection
const link = document.querySelector("#admin-link");

link.addEventListener("click", event => {
    event.preventDefault();
    window.localStorage.setItem("formulaire", "T@F001");
    location.href = "connexion.html";
})