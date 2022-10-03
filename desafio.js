let errorPin = 0;
let listaGuardada = [];
listaGuardada = JSON.parse(localStorage.getItem('listaClientes')) ?? [];
let listaClientes = listaGuardada;
const guardarClientes = (clave, valor) => {localStorage.setItem(clave, valor)};
agregarListaClientes();
let validarDatos = 0
let validarNomUsuario = 0
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
if (botonSubmit != null){ 
botonSubmit.addEventListener("click", () => {
    validarDatos=0
    validarCliente()
    agregarListaClientes();
    spreadNombreDeClientes()
    if (validarNomUsuario == 0){
        if (validarDatos==1) {
        Swal.fire({
            title: 'Correcto',
            icon: 'success',
            text: 'El usuario fue creado correctamente'
        })
        }else{
        let texto = "El usuario no fue creado, debe cumplir con estos requisitos: " + "\n" +  "-La tarjeta debe ser creada" + "\n" + "-El pin no puede ser vacio y debe ser numerico " + "\n" + "-El saldo no puede ser 0"  + "\n" + "-El username no puede ser vacio" + "\n" +  "-El nombre no puede ser vacio" + "\n" + "-El apellido no puede ser vacio";
        Swal.fire({
            title: 'Error',
            icon: 'error',
            text: texto,
        })
        }
    } else{
        Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'El nombre de usuario ya existe, por favor elija otro',
        }); 
    }
});
}


function validarCliente() {
    let tarjeta = document.getElementById('myToggle').checked;
    let pin = document.getElementById('password').value;
    let saldo = document.getElementById('saldo').value;
    let username = document.getElementById('username').value; 
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;

    console.log(tarjeta);
    console.log(pin);
    console.log(saldo);
    console.log(username);
    console.log(nombre);
    console.log(apellido);

    validarNombreUsuario(username)
    if (validarNomUsuario==1){
        Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'El nombre de usuario ya existe, por favor elija otro',
        });
    }else if (validarNomUsuario==0){
        if (tarjeta==false || pin=="" || saldo == 0 || saldo == "" || username== "" || nombre == "" || apellido == "") { 
            validarDatos = 0
            }else{
                newCliente(tarjeta, pin, saldo, username, nombre, apellido);
                validarDatos=1;
            }
    }
}

function newCliente(tarjeta, pin, saldo, username, nombre, apellido){
        const cliente = new Cliente(tarjeta, pin, saldo, username, nombre, apellido);
        let listaGuardada = [];
        listaGuardada = JSON.parse(localStorage.getItem('listaClientes'));
        listaClientes = listaGuardada;
        listaClientes.push(cliente);
        document.getElementById('myToggle').checked = false;
        document.getElementById('password').value = "";
        document.getElementById('saldo').value = "";
        document.getElementById('username').value = "";
        document.getElementById('nombre').value = "";
        document.getElementById('apellido').value = "";                       
}

function validarNombreUsuario(username1){
    validarNomUsuario = 0
    console.log(validarNomUsuario);
    for (i=0; i<listaClientes.length; i++){
        let cliente1 = listaClientes[i]
        //desestructurar cliente
        console.log(cliente1)
        const {tarjeta, pin, saldo, username, nombre, apellido} = cliente1;
        if (username1 == username) {
            console.log(username);
            console.log(username1);
            validarNomUsuario=1;
            break;
        }
    }
}

function agregarListaClientes(){
    const guardarClientes = (clave, valor) => {localStorage.setItem(clave, valor)};
    guardarClientes("listaClientes", JSON.stringify(listaClientes));
    let html = "";
    for (i=0; i<listaClientes.length; i++){
        let cliente1 = listaClientes[i]
        //desestructurar cliente
        const {tarjeta, pin, saldo, username, nombre, apellido} = cliente1;
        html += '<tr>';
        html += '<td>' + tarjeta + '</td>';
        html += '<td>' + pin + '</td>';
        html += '<td>' + saldo + '</th>';
        html += '<td>' + username + '</th>';
        html += '<td>' + nombre + '</th>';
        html += '<td>' + apellido + '</td>';
        html += '</tr>';
    }
    let tabla = document.querySelector('#tabla')
    tabla ?? console.log("tabla es null")
    if (tabla != null){
    tabla.innerHTML = html;
    }

}


//Spread
function spreadNombreDeClientes(){
    const guardarClientes = (clave, valor) => {localStorage.setItem(clave, valor)};
    guardarClientes("listaClientes", JSON.stringify(listaClientes));
    const listaDeNombres = []
    for (i=0; i<listaClientes.length; i++){
        let cliente1 = listaClientes[i]
        //desestructurar cliente
        const {tarjeta, pin, saldo, username, nombre, apellido} = cliente1;
        listaDeNombres.push(nombre)
    }
    console.log(...listaDeNombres)
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


function validarUsername (username1){
    let cliente1 ={}
    for (let i =0; i < listaClientes.length; i++){
        cliente1 = listaClientes[i];
        //Desestructuracion de Cliente1
        const {tarjeta, pin, saldo, username, nombre,apellido} = cliente1
        console.log(username)
        //Se usa la variable username del cliente1 para validar si es igual al username recibido al principio de la funcion, antes era validado como cliente1.username
        if (username == username1){
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