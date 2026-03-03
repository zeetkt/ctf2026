let blocs = document.querySelectorAll(".bloc");
const clues1 = document.getElementById("indice1");
const clues2 = document.getElementById("indice2");
const clues3 = document.getElementById("indice3");
const txtClues = document.getElementById("paraIndice");

/*Ecouteur d'evennement pour chaque bouton*/
clues1.addEventListener('click', function() {
    txtClues.innerHTML = "Perceval : C'est pas Faux...";
});
clues2.addEventListener('click', function() {
    txtClues.innerHTML = "Perceval : Non mais moi, j'ai jamais aimé ça les cartes !";
});
clues3.addEventListener('click', function() {
    txtClues.innerHTML = "Perceval : De toute façon, les cartes, selon comment c'est tourné ça change tout !";
});

/*Ecouteur d'evennement pour chaque bloc*/
for (let bloc of blocs) {
    bloc.addEventListener('click', event => {
        switch (true) {
            case bloc.classList.contains('rotate360'):
                bloc.classList.add('rotate0');
                bloc.classList.remove('rotate360');
                bloc.classList.add('rotate90');
                bloc.classList.remove('rotate0');
                break;
            case bloc.classList.contains('rotate90'):
                bloc.classList.add('rotate180');
                bloc.classList.remove('rotate90');
                break;
            case bloc.classList.contains('rotate180'):
                bloc.classList.add('rotate270');
                bloc.classList.remove('rotate180');
                break;
            case bloc.classList.contains('rotate270'):
                bloc.classList.add('rotate360');
                bloc.classList.remove('rotate270');
                break;
            default:
                bloc.classList.add('rotate90');
        }
    })
}

//Trouver la Route
//recupération des éléments
const buttonAnswer = document.querySelector('.answer__button');
const response = document.querySelector(".response");

buttonAnswer.addEventListener("click", event => {
    event.preventDefault();
    let answer = document.querySelector('.answer__input');
    answerValue = answer.value;
    answerValue = answerValue.toLowerCase();
    if (answerValue.includes("adrar")) {
        location.href = "pr2deo5.html";
    } else {
        response.innerText = "Vous êtes encore perdu. Regardez la carte de plus près pour trouver la bonne route."
    }

})