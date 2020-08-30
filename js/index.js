/* Emanuel Flores */

/* Funcion para enviar respuesta */
var b = 4;
var firsttime = true;
var nop = true;
var notwin = true;
var j;
function envie(){
    var a = document.getElementById("text").value;
    if (a === "aside"){
        notwin = false;
        if (!!document.getElementById("inco")){
            document.getElementById("inco").remove();
        }
        document.getElementById("text").insertAdjacentHTML("afterend","<br><br><div class='win alert alert-success' role='alert'>Ganaste!!</div>");
        j = document.getElementById("button");
        j.setAttribute("disabled","disabled");
        if (!!document.getElementById("pista")){
            document.getElementById("pista").setAttribute("disabled","disabled");
        }

    } else {
        if (nop == true){
            document.getElementById("text").insertAdjacentHTML("afterend","<span id='inco' style='color: red;'><br><br>Incorrecta</span>");
            nop = false;
        }
        
    }
    if (firsttime && notwin){
        document.getElementById("button").insertAdjacentHTML("afterend","<br><br><button onclick='pistas()' id='pista' type='submit'>Ver pista</button>");
        firsttime = false;
    }
    if (b > 0 && notwin){
        b--;
        document.getElementById("num").textContent = b;
        if (b==0) {
            if (notwin){
                document.getElementById("text").insertAdjacentHTML("afterend","<br><br><div class='lose alert alert-danger' role='alert'>Perdiste!!</div>");
            }
        j = document.getElementById("button");
        j.setAttribute("disabled","disabled");
        if (!!document.getElementById("pista")){
            document.getElementById("pista").setAttribute("disabled","disabled");
        }
    }
    }
    
}

/* Funcion para mostrar pistas */
var pista = 0;
var dado1 = false;
var dado2 = false;
function pistas() {
    if (b == 3 && !dado1) {
        document.getElementById("button").insertAdjacentHTML("afterend","<br><br><span id='a' style='color: blue;'>Empieza con a</span>");
        dado1 = true;
    } else if (b == 2 && !dado2) {
        if (!!document.getElementById("a")){
            document.getElementById("a").insertAdjacentHTML("afterend","<br><br><span style='color: blue;'>Termina con e</span>");
        } else {
            document.getElementById("button").insertAdjacentHTML("afterend","<br><br><span style='color: blue;'>Termina con e</span>");
        }
        dado2 = true;
    }
    
}
