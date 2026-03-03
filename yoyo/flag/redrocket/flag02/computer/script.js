function updateDateTime() {
    var now = new Date();
    now.setFullYear(now.getFullYear() + 100);
    var datetime = document.getElementById('datetime');
    datetime.textContent = now.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) + '   ' + now.toLocaleTimeString();
}
setInterval(updateDateTime, 1000);

function checkCookieAndRedirectcc() {
    var cookieArr = document.cookie.split(";");

    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        if("CosmoC@t" == cookiePair[0].trim()) {
            window.location.href = '../passed/index.html';
            return;
        }
    }
}

setInterval(checkCookieAndRedirectcc, 5000);

function checkCookieAndRedirect(cookieName) {
    var cookieArr = document.cookie.split(";");

    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        if(cookieName == cookiePair[0].trim()) {
            return;
        }
    }

    window.location.href = '../bureau/index.html';
}

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
    checkCookieAndRedirect("desktoppass");
    var img = document.getElementById('draggable');
    var contextMenu = document.getElementById('contextMenu');
    var open = document.getElementById('open');
    
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

    open.onclick = function() {
        window.open('files/CosmoCat.txt', '_blank');
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

    let notificationCircle = document.createElement('div');
    notificationCircle.style.position = 'absolute';
    notificationCircle.style.top = '0';
    notificationCircle.style.right = '0';
    notificationCircle.style.width = '16px';
    notificationCircle.style.height = '16px';
    notificationCircle.style.borderRadius = '50%';
    notificationCircle.style.backgroundColor = 'red';

    let button1 = document.getElementById('button1');
    button1.style.position = 'relative';
    button1.appendChild(notificationCircle);

    button1.onclick = function() {
        window.open('https://mail.nasa.futur', '_blank');
        notificationCircle.remove();
    };

    document.getElementById('button2').onclick = function() {
        window.open('https://www.google.com', '_blank');
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
        'Tu as réussi !!!',
        'On peut dire que tu as du flair pour trouver les mots de passe.',
        'Tu as maintenant accès à la machine de Mr. Anderson.',
        'Tu peux maintenant commencer l\'enquête pour trouver le flag... euh Mr. Anderson.',
        'Je te laisse fouiller dans ses fichiers, je suis sûr que tu trouveras des indices.',
        'Je vais chercher de mon côté sur le Darknet, on ne sait jamais.. Bonne chance !',
    ];
    
    printLines(lines);