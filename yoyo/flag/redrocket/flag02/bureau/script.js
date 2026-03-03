function updateDateTime() {
    var now = new Date();
    now.setFullYear(now.getFullYear() + 100);
    var datetime = document.getElementById('datetime');
    datetime.textContent = now.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) + '   ' + now.toLocaleTimeString();
}
setInterval(updateDateTime, 1000);

function transp(base64) {
    return atob(base64);
}

function checkCookieAndRedirect(cookieName) {
    var cookieArr = document.cookie.split(";");

    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        if(cookieName == cookiePair[0].trim()) {
            return;
        }
    }

    window.history.back();
}

function checkPassword() {
    var storedPasswordBase64 = "YW1p";
    var storedPassword = transp(storedPasswordBase64);
    var enteredPassword = document.getElementById("password").value;
    if (enteredPassword === storedPassword) {
        document.cookie = "desktoppass=true; path=/";
        window.location.href = "../computer/index.html";
    } else {
        $("<div title='Erreur'>Mot de passe erroné</div>").dialog({
            modal: true,
            buttons: {
                "Essayer à nouveau": function() {
                    $(this).dialog("close");
                }
            }
        });
    }
}

document.getElementById("password").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        checkPassword();
    }
});

function printLines(lines) {
    let lineIndex = 0;
    let charIndex = 0;
    let delay = 26;
    let lineDelay = 1000;

    function printNextCharacter() {
        if(lineIndex < lines.length) {
            if(charIndex < lines[lineIndex].length) {
                footer.innerHTML += lines[lineIndex][charIndex];
                charIndex++;
                setTimeout(printNextCharacter, delay);
            } else {
                footer.innerHTML += '<br>';
                charIndex = 0;
                lineIndex++;
                setTimeout(printNextCharacter, lineDelay);
            }
            footer.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } else {
            footer.style.display = 'flex';
        }
    }

    printNextCharacter();
}

window.onload = function() {
    
    checkCookieAndRedirect("Co0k1e");
    var img = document.getElementById('draggable');
    img.style.backgroundImage = 'url("images/Postit01.png")';
    var contextMenu = document.getElementById('contextMenu');
    var flip = document.getElementById('flip');
    

    img.onmousedown = function(event) {
        img.style.position = 'absolute';
        img.style.zIndex = 1000;
        function moveAt(pageX, pageY) {
            img.style.left = pageX - img.offsetWidth / 2 + 'px';
            img.style.top = pageY - img.offsetHeight / 2 + 'px';
        }
        moveAt(event.pageX, event.pageY);
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }
        document.addEventListener('mousemove', onMouseMove);
        img.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            img.onmouseup = null;
        };
    };

    img.oncontextmenu = function(event) {
        event.preventDefault();
        contextMenu.style.top = `${event.clientY}px`;
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.style.display = 'block';
    };

    flip.onclick = function() {
        if (img.style.backgroundImage.includes('Postit01.png')) {
            img.style.backgroundImage = 'url("images/Postit02.png")';
        } else {
            img.style.backgroundImage = 'url("images/Postit01.png")';
        }
        contextMenu.style.display = 'none';
    };

    document.onclick = function(event) {
        if (event.button !== 2) {
            contextMenu.style.display = 'none';
        }
    };

    img.ondragstart = function() {
        return false;
    };

    
};

let footer = document.createElement('footer');
    footer.style.position = 'fixed';
    footer.style.bottom = '0';
    footer.style.width = '100%';
    footer.style.height = '120px';
    footer.style.overflow = 'auto';
    footer.style.color = 'rgba(66, 216, 201, 1)';
    footer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    footer.style.borderTop = '1px solid #dee2e6';
    footer.style.paddingLeft = '100px';
    document.body.appendChild(footer);

    let lines = [
        'Arff !!! Je ne me souviens plus de son mot de passe',
        'Connaissant Mr Anderson et sa mémoire ératique, il a du l\'écrire quelque part sur son bureau',
        'En attendant, je vais essayer de trouver un moyen de me distraire',
    ];
    
    printLines(lines);