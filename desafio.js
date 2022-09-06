let saldoTotal = 10000
let errorPin = 0
const listaClientes = []

class Cliente{
    constructor(tarjeta, pin, saldo, username, nombre, apellido){
        this.tarjeta = tarjeta;
        this.pin = pin;
        this.saldo = saldo;
        this.username = username
        this.nombre = nombre
        this.apellido = apellido
    }
}


function newCliente(){
    let tarjeta = confirm("Crear nueva tarjeta?");
    if (tarjeta){
        let pin = prompt("Crear nuevo pin:");
        if (pin != ""){
            let saldo = prompt("Ingrese su saldo inicial:");
            if (saldo != ""){
                let username = prompt("Ingrese su nombre de usuario") 
                if (username != ""){
                    let nombre = prompt("Ingrese su nombre");
                    if (nombre != ""){
                        let apellido = prompt("Ingrese su apellido");
                        if (apellido != ""){
                            const cliente = new Cliente(tarjeta, pin, saldo, username, nombre, apellido);
                            listaClientes.push(cliente);
                            inicio()
                            }else{
                                alert("No ingreso su apellido, el proceso a finalizado")
                                salir()
                            }
                    }else {
                        alert("No ingreso su nombre, el proceso a finalizado")
                        salir()
                    }
                }else{
                    alert("No ingreso su nombre de usuario, el proceso a finalizado")
                    salir() 
                } 
            }else {
                alert("El saldo inicial no puede ser o vacio, el proceso a finalizado")
                salir() 
            }
        }else {
            alert("No ha ingresado un numero de pin, el programa ha finalizado");
            salir()
        }

    }else {
        alert("Selecciono no crear una tarjeta, el programa finalizo");
        salir();
    }
}
1

inicio ();
// Empieza el trabajo

function inicio(){
    console.clear();
    console.log("------------------------")
    console.log("1: Crear Cliente")
    console.log("2- Cajero")
    console.log("3- Salir")
    console.log("------------------------")
    let opcionElegida = prompt("Ingrese opcicion elegida");
    if (opcionElegida == 1){
        newCliente()
    }else if(opcionElegida == 2){
        cajero()
    }else if (opcionElegida == 3){
        salir()
    }else if (opcionElegida != 1 && opcionElegida != 2) {
        alert("Opcion elegida no valida, el programa va a finalizar");
        salir()
    }else{
    salir()
    }
}

function cajero() {
    console.clear();
    console.log("------------------------")
    console.log("1: Retirar Dinero")
    console.log("2- Consultar Saldo")
    console.log("3- Salir")
    console.log("------------------------")
    let username = prompt("Ingrese su nombre de usuario");
    if (username === "" || username == null){
        salir()
    }else {
        validarUsername(username);
    }
    salir()
}
// True ingresa y pide pin, false sale del programa y se reinicia


function validarUsername (username){
    let cliente1 ={}
    for (let i =0; i < listaClientes.length; i++){
        cliente1 = listaClientes[i];
        console.log(cliente1.username)
        if (cliente1.username == username){
            alert("El usuario es correcto")
            console.table(listaClientes)
            let pin = prompt("Ingrese su Pin");
            validarClave(username, pin);
        }else{
            console.log(cliente1.username); 
        }
    }
    alert("El usuario no existe");
    if (username == "" || username == null){
        salir()
    }else{
    cajero();
    }
}


// Agrgar validacion de clave y borrar la funcion anterior

function validarClave(username, pin) {
    let cliente1 = {}
    for (let i =0; i < listaClientes.length; i++){
        cliente1 = listaClientes[i];
        if (errorPin < 3){
            if(cliente1.username == username) {
                if (cliente1.pin == pin){
                alert("Pin Correcto")
                seleccionarOperacion(username);
                }else {
                    errorPin ++;
                    console.log(cliente1.username)
                    console.log(cliente1.pin)
                    if (cliente1.pin == "" || cliente1.pin == null){
                        salir()
                    }else{
                        alert("El pin es incorrecto");
                        let pin1 = prompt("Ingrese el pin");
                        validarClave(username, pin1);
                    }
                }
            }else {
                console.log(cliente1.pin);
            }
        }else{
            alert("Su cuenta esta bloqueada")
            let bloqueo = confirm("Desea desbloquear la cuenta?")
            if (bloqueo == false){
                    salir()
            }else{
                    errorPin = 0
                    cajero()
            }
        }
    }    
}

function seleccionarOperacion(username) {
    console.log("------------------------")
    console.log("1: Retirar Dinero")
    console.log("2- Consultar Saldo")
    console.log("3- Salir")
    console.log("------------------------")

    let elegirOpcion = prompt("Ingresar Opcion");
    switch(elegirOpcion){
        case "1":
            let monto = Number(prompt("Monto a Retirar"));
            retirarDinero(username, monto)
            break;
        case "2":
            consultarSaldo(username)
            break;
        case "3":
            salirCajero()
            break;
        default:
            console.log("Operacion no valida")
            break;
    }
}

function retirarDinero(username ,dinero) {
    for (let i =0; i < listaClientes.length; i++){
            let cliente1 = listaClientes[i];
            if (cliente1.username == username){
                if(dinero>cliente1.saldo){
                    alert("Saldo insuficiente")
                } else {
                    cliente1.saldo -= dinero;
                    alert("Retiraste $" + dinero)
                }
                seleccionarOperacion(username)
            }
    }   
}

function consultarSaldo(username) {
    let cliente1 = {}
    for (let i =0; i < listaClientes.length; i++){
    cliente1 = listaClientes[i];
        if (cliente1.username == username){
            alert("Su saldo es: $" + cliente1.saldo)
            seleccionarOperacion(username)
        }else{
            seleccionarOperacion(username)
        }
    }
    
    seleccionarOperacion(username)
}

function salirCajero() {
    alert("Menu Principal");
    inicio()
}

function salir() {
    alert("Fin de la Operacion");
}