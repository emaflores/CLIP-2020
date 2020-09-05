/* Emanuel Flores */

/* Funcion para enviar la adivinanza cuando se aprete enter */
var input = document.getElementById("text");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("button").click();
    }
});

/* Variables para enviar respuesta */
var b = 4;
var showIncorrecta = true;
var showPista = true;
var notwin = true;

/* Funcion para enviar respuesta */
function envie() {

    // Obtener el valor que ingreso en el campo de texto
    var a = document.getElementById("text").value;

    // Si es la respuesta correcta
    if (a.toLowerCase() === "head") {
        notwin = false;

        // Borramos el cartel de incorrecta en el caso de haber errado antes
        if (!!document.getElementById("inco")) {
            document.getElementById("inco").remove();
        }

        // Insertamos el cartel de victoria
        document.getElementById("text").insertAdjacentHTML("afterend", "<div id='win'><br><div class='win alert alert-success' role='alert'>Ganaste!!</div><br></div>");

        // variable para la funcion de abajo
        var index = 1;

        // Esta funcion recorre el titulo y cambia de color blanco a rojo (y viceversa) a cada letra
        function myLoop() {
            setTimeout(function() {
                document.getElementById(`s${index}`).style.color = "red";
                if (index > 1) { document.getElementById(`s${index-1}`).style.color = "white"; }
                index++;
                if (index == 21) { document.getElementById(`s${index-1}`).style.color = "white"; }
                if (index < 21) {
                    myLoop();
                }
            }, 100)
        }

        // Llamando de la funcion
        myLoop();

        // Agregamos una clase al titulo para darle la animacion de transformacion
        document.getElementById("adivina").setAttribute("class", "adivinaste");

        // Sonido de victoria oculto
        document.getElementById("sound_win").play();

        // Deshabilitar los botones de enviar respuesta y ver pista
        document.getElementById("button").setAttribute("disabled", "disabled");
        if (!!document.getElementById("pista")) {
            document.getElementById("pista").setAttribute("disabled", "disabled");
        }

        // Aparece nuevo boton para jugar de nuevo
        document.getElementById("button").insertAdjacentHTML("afterend", "<button id='nuevo' onclick='reset()' type='submit'>Jugar de nuevo</button>");

    }
    // Si la respuesta no es correcta, se inserta un cartel de "Incorrecto" y se cambia el showIncorrecta para que solo se muestre una vez
    else {
        if (showIncorrecta == true) {
            document.getElementById("text").insertAdjacentHTML("afterend", "<span id='inco' style='color: red;'><br>Incorrecta</span>");
            showIncorrecta = false;
        }
    }

    // Si no gano y le quedan 2 intentos se habilita el boton ver pista. Se cambia showPista para evitar mas botones de pistas
    if (showPista && notwin && b == 3) {
        document.getElementById("button").insertAdjacentHTML("afterend", "<div id='id_pista'><br><button id='pista' onclick='pistas()' type='submit'>Ver pista</button></div>");
        showPista = false;
    }

    // Si quedan intentos disponibles y todavia no gano
    if (b > 0 && notwin) {

        // Descontar intento y actualizar en el html
        b--;
        document.getElementById("num").textContent = b;

        // Quitamos y agregamos la clase para renovar la animacion sobre el num de intentos
        const ee = document.getElementById("num");
        ee.classList.remove('fail');
        void ee.offsetWidth;
        ee.classList.add('fail');

        // Si el boton ver pistas existe y estamos en alguno de los 2 ultimos intentos lo habilitamos
        if (!!document.getElementById("pista")) {
            (b == 1 || b == 2) ? document.getElementById("pista").removeAttribute("disabled", "disabled"): document.getElementById("pista").setAttribute("disabled", "disabled");

        }

        // Si no hay mas intentos
        if (b == 0) {

            // Si no gano, remover el cartel "incorrecto" y agregar el cartel "perdiste"
            if (notwin) {
                if (!!document.getElementById("inco")) {
                    document.getElementById("inco").remove();
                }
                document.getElementById("text").insertAdjacentHTML("afterend", "<div id='lose'><br><div class='lose alert alert-danger' role='alert'>Perdiste!!</div><br></div>");

                // Sonido de derrota oculto
                document.getElementById("sound_lose").play();
            }

            // Deshabilitar boton enviar y de pistas
            document.getElementById("button").setAttribute("disabled", "disabled");
            if (!!document.getElementById("pista")) {
                document.getElementById("pista").setAttribute("disabled", "disabled");
            }

            // Aparece nuevo boton para jugar de nuevo
            document.getElementById("button").insertAdjacentHTML("afterend", "<button id='nuevo' onclick='reset()' type='submit'>Jugar de nuevo</button>");
        }
    }

}

/* Variables para mostrar pistas */
var dado1 = false;
var dado2 = false;

/* Funcion para mostrar pistas */
function pistas() {

    // Si es el intento 3 y no te di la primera pista, te la doy y deshabilito el boton
    if (b == 2 && !dado1) {
        document.getElementById("button").insertAdjacentHTML("afterend", "<span id='a' style='color: blue;'><br><br>Empieza con h</span>");
        dado1 = true;

        document.getElementById("pista").setAttribute("disabled", "disabled");
    }
    // Si es el intento 4 y no te di la segunda pista, te la doy y deshabilito el boton
    else if (b == 1 && !dado2) {

        // Si ya te habia dado una pista, se agrega la nueva pista abajo de ella. Sino abajo del boton enviar respuesta
        if (!!document.getElementById("a")) {
            document.getElementById("a").insertAdjacentHTML("afterend", "<span id='b' style='color: blue;'><br><br>Termina con d</span>");
        } else {
            document.getElementById("button").insertAdjacentHTML("afterend", "<span id='b' style='color: blue;'><br><br>Termina con d</span>");
        }
        dado2 = true;

        document.getElementById("pista").setAttribute("disabled", "disabled");
    }

}

/* Funcion para resetar el juego */
function reset() {

    // Volvemos todos las variables a su valor original
    b = 4;
    document.getElementById("num").textContent = b;
    const ee = document.getElementById("num");
    ee.classList.remove('fail');
    void ee.offsetWidth;
    ee.classList.add('fail');
    showIncorrecta = true;
    showPista = true;
    notwin = true;
    dado1 = false;
    dado2 = false;

    // Removemos todos los elementos que no corresponden
    if (!!document.getElementById("a")) {
        document.getElementById("a").remove();
    }

    if (!!document.getElementById("b")) {
        document.getElementById("b").remove();
    }

    if (!!document.getElementById("win")) {
        document.getElementById("win").remove();
    }

    if (!!document.getElementById("lose")) {
        document.getElementById("lose").remove();
    }

    if (!!document.getElementById("inco")) {
        document.getElementById("inco").remove();
    }

    if (!!document.getElementById("id_pista")) {
        document.getElementById("id_pista").remove();
    }

    // Quitamos la animacion al titulo
    document.getElementById("adivina").removeAttribute("class", "adivinaste");

    // Quitamos el boton de jugar de nuevo
    document.getElementById("nuevo").remove();

    // Quitamos el valor ingresado en el campo de respuesta
    document.getElementById("text").value = "";

    // Habilitamos el boton de enviar respuesta nuevamente
    document.getElementById("button").removeAttribute("disabled", "disabled");
}