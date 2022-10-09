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
    for (i=0; i<listaClientes.length; i++){
        let cliente1 = listaClientes[i]
        //desestructurar cliente
        const {tarjeta, pin, saldo, username, nombre, apellido} = cliente1;
        if (username1 == username) {
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





