let errorPin = 0;
let listaGuardada = [];
listaGuardada = JSON.parse(localStorage.getItem('listaClientes'));
let listaClientes = listaGuardada;
const guardarClientes = (clave, valor) => {localStorage.setItem(clave, valor)};
// let guardarClientes = JSON.stringify(listaClientes);
agregarListaClientes();
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

let botonSubmit = document.querySelector('#enviar');
botonSubmit.addEventListener("click", () => {
    newCliente()
    agregarListaClientes();
    // inicio()
});

function newCliente(){
    // let tarjeta = confirm("Crear nueva tarjeta?");
    let tarjeta = document.getElementById('tarjeta').checked;
    if (tarjeta){
        console.log(tarjeta.checked);
        let pin = document.getElementById('password').value;
        if (pin != ""){
            let saldo = document.getElementById('saldo').value;
            if (saldo != ""){
                let username = document.getElementById('username').value; 
                if (username != ""){
                    let nombre = document.getElementById('nombre').value;
                    if (nombre != ""){
                        let apellido = document.getElementById('apellido').value;
                        if (apellido != ""){
                            const cliente = new Cliente(tarjeta, pin, saldo, username, nombre, apellido);
                                let listaGuardada = [];
                                listaGuardada = JSON.parse(localStorage.getItem('listaClientes'));
                                // listaGuardada = JSON.parse(listaClientes);
                                listaClientes = listaGuardada;
                                listaClientes.push(cliente);
                                console.log(cliente);
                                document.getElementById('tarjeta').checked = false;
                                document.getElementById('password').value = "";
                                document.getElementById('saldo').value = "";
                                document.getElementById('username').value = "";
                                document.getElementById('nombre').value = "";
                                document.getElementById('apellido').value = "";
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


inicio ();
// Empieza el trabajo

function agregarListaClientes(){
    const guardarClientes = (clave, valor) => {localStorage.setItem(clave, valor)};
    guardarClientes("listaClientes", JSON.stringify(listaClientes));
    let html = "";
    for (i=0; i<listaClientes.length; i++){
        let cliente1 = listaClientes[i]
        html += '<tr>';
        html += '<td>' + cliente1.tarjeta + '</td>';
        html += '<td>' + cliente1.pin + '</td>';
        html += '<td>' + cliente1.saldo + '</th>';
        html += '<td>' + cliente1.username + '</th>';
        html += '<td>' + cliente1.nombre + '</th>';
        html += '<td>' + cliente1.apellido + '</td>';
        html += '</tr>';
    }
    console.log(html);
    document.querySelector('#tabla').innerHTML = html


}


function inicio(){
    
}

function cajero() {
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
    agregarListaClientes()
    inicio()
}

function salir() {
    alert("Fin de la Operacion");
    agregarListaClientes()
}