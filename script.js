//VARIABLES
const x= "X";
const o="O";

let estadoJuego= "P1";
const modal = document.querySelector("dialog");
const textoMod= modal.querySelector("h2");
const cuadrados= Array.from(document.querySelectorAll(".cuadrado"));

//FUNCIONES

cuadrados.forEach( (cuadrado, i)=>{
    cuadrado.addEventListener("click", ()=>{
        if(estadoJuego==="Pausa") return; //si hay un ganador deja de funcionar el programa
        if (cuadrado.textContent !== "") return; //para que no se haga doble click en un mismo cuadrado
        cuadrado.innerText = estadoJuego === "P1" ? x : o;
        const posGanadora= hayGanador();
        if(typeof posGanadora === "object"){
            ganar(posGanadora);
            return
        }
        if (posGanadora=== "Empate") {
            mostrarModal("Empate");
        }
        estadoJuego = estadoJuego=== "P1" ? "P2" : "P1";
    })
})

function hayGanador (){
    const tablero =cuadrados.map(cuadrado => cuadrado.textContent);
    
    //Revisar Horizontales
    for (let i = 0; i <= 9; i+=3) {
        
        if( tablero[i] &&
            tablero[i]===tablero[i+1] && 
            tablero[i]===tablero[i+2]){
            return [i,i+1,i+2]
        }
    }


    //Verticales
    for (let i = 0; i <= 3; i++) {
        
        if( tablero[i] &&
            tablero[i]===tablero[i+3] && 
            tablero[i]===tablero[i+6]){
            return [i,i+3,i+6];
        }
    }


    //Diagonales
    if( tablero[0] &&
        tablero[0]===tablero[4] && 
        tablero[0]===tablero[8]){
        return [0,4,8]
    }
    if( tablero[2] &&
        tablero[2]===tablero[4] && 
        tablero[2]===tablero[6]){
        return [2,4,6]
        }
    
    if(tablero.includes("")) return false;
    return "Empate"

    

}

function ganar(posGanadora){
    
    posGanadora.forEach(posicion=>{
        cuadrados[posicion].classList.toggle("ganador", true);
    })
    mostrarModal("Ganador: " + estadoJuego );
    estadoJuego= "Pausa";
}

function mostrarModal(texto){
    textoMod.innerText = texto;
    modal.showModal();
}

modal.querySelector("button").addEventListener("click", ()=> {
    cuadrados.forEach(cuadrado =>{
        cuadrado.textContent= "";
        cuadrado.classList.toggle("ganador", false);
        modal.close();
        estadoJuego= "P1";
    });
    
})