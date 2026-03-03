const reset = document.querySelector('input');
const buttonReset = document.querySelector('.reset');

if (window.localStorage.length !== 0) {
    buttonReset.classList.remove("button--gris");
    buttonReset.classList.add("button--retour");
}

buttonReset.addEventListener("click", event => {
    if (buttonReset.classList.contains("button--retour") && reset.value === "reset") {
        window.localStorage.clear();
        buttonReset.classList.remove("button--retour");
        buttonReset.classList.add("button--gris");
        reset.value = "";
    }
})