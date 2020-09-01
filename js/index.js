/* Emanuel Flores */

function reload()
{ 
    
}


/* Funcion para enviar cuando se aprete enter */
var input = document.getElementById("text");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("button").click();
  }
});

/* Funcion para enviar respuesta */
var b = 4;
var firsttime = true;
var nop = true;
var notwin = true;
var j;
var i = 1;
function envie(){
    var a = document.getElementById("text").value;
    if (a === "aside"){
        notwin = false;
        if (!!document.getElementById("inco")){
            document.getElementById("inco").remove();
        }
        document.getElementById("text").insertAdjacentHTML("afterend","<div id='win'><br><br><div class='win alert alert-success' role='alert'>Ganaste!!</div></div>");
        j = document.getElementById("button");
        j.setAttribute("disabled","disabled");
        if (!!document.getElementById("pista")){
            document.getElementById("pista").setAttribute("disabled","disabled");
        }
        document.getElementById("button").insertAdjacentHTML("afterend","<button id='nuevo' onclick='reset()' type='submit'>Jugar de nuevo</button>");

    } else {
        if (nop == true){
            document.getElementById("text").insertAdjacentHTML("afterend","<span id='inco' style='color: red;'><br>Incorrecta</span>");
            nop = false;
        }
        
    }
    if (firsttime && notwin){
        document.getElementById("button").insertAdjacentHTML("afterend","<div id='id_pista'><br><button id='pista' onclick='pistas()' type='submit'>Ver pista</button></div>");
        firsttime = false;
    }
    if (b > 0 && notwin){
        b--;
        
        // document.getElementById("num").style.animationPlayState = "running";
        
        document.getElementById("num").textContent = b;
        const ee = document.getElementById("num");

        ee.classList.remove('fail'); // reset animation
        void ee.offsetWidth; // trigger reflow
        ee.classList.add('fail'); // start animation


        b==1 ? document.getElementById("pista").setAttribute("disabled","disabled") : document.getElementById("pista").removeAttribute("disabled","disabled");
        if (b==0) {
            if (notwin){
                if (!!document.getElementById("inco")){
                    document.getElementById("inco").remove();
                }
                document.getElementById("text").insertAdjacentHTML("afterend","<div id='lose'><br><br><div class='lose alert alert-danger' role='alert'>Perdiste!!</div></div>");
            }
            j = document.getElementById("button");
            j.setAttribute("disabled","disabled");
            if (!!document.getElementById("pista")){
                document.getElementById("pista").setAttribute("disabled","disabled");
            }
            document.getElementById("button").insertAdjacentHTML("afterend","<button id='nuevo' onclick='reset()' type='submit'>Jugar de nuevo</button>");
        }
    }
    
}

/* Funcion para mostrar pistas */
var dado1 = false;
var dado2 = false;
function pistas() {
    if (b == 3 && !dado1) {
        document.getElementById("button").insertAdjacentHTML("afterend","<span id='a' style='color: blue;'><br><br>Empieza con a</span>");
        dado1 = true;
        
        document.getElementById("pista").setAttribute("disabled","disabled");
    
    } else if (b == 2 && !dado2) {

        if (!!document.getElementById("a")){
            document.getElementById("a").insertAdjacentHTML("afterend","<span id='b' style='color: blue;'><br><br>Termina con e</span>");
        } else {
            document.getElementById("button").insertAdjacentHTML("afterend","<span id='b' style='color: blue;'><br><br>Termina con e</span>");
        }
        dado2 = true;

        document.getElementById("pista").setAttribute("disabled","disabled");
    }
    
}

/* Funcion para resetar el juego */
function reset() {
    b = 4;
    document.getElementById("num").textContent = b;
    const ee = document.getElementById("num");
    ee.classList.remove('fail'); // reset animation
    void ee.offsetWidth; // trigger reflow
    ee.classList.add('fail'); // start animation
    firsttime = true;
    nop = true;
    notwin = true;
    dado1 = false;
    dado2 = false;

    if (!!document.getElementById("a")){
        document.getElementById("a").remove();
    }

    if (!!document.getElementById("b")){
        document.getElementById("b").remove();
    }

    if (!!document.getElementById("win")){
        document.getElementById("win").remove();
    }

    if (!!document.getElementById("lose")){
        document.getElementById("lose").remove();
    }

    if (!!document.getElementById("inco")){
        document.getElementById("inco").remove();
    }

    if (!!document.getElementById("id_pista")){
        document.getElementById("id_pista").remove();
    }
    document.getElementById("nuevo").remove();
    document.getElementById("text").value = "";
    j = document.getElementById("button");
    j.removeAttribute("disabled", "disabled");
}