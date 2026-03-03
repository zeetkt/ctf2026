//Constante
const output = document.querySelector('.output');
const trad = document.querySelector('button');

//Fonction
function toAscii(binary){
    return binary.replace(/\s*[01]{8}\s*/g, function(binary) {
        return String.fromCharCode(parseInt(binary, 2))
      })
}

//Event
trad.addEventListener('click',event => {
    const input = document.querySelector('.input');
    const binary = input.value;
    output.innerText = toAscii(binary);
})