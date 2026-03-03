//Test si formulaire a été complété
if (!window.localStorage.getItem("formulaire")) {
    window.location.href = "../../formulaire.html";
}
//Test si admin a été complété
else if (!window.localStorage.getItem("admin")) {
    window.location.href = "../../connexion.html";
}