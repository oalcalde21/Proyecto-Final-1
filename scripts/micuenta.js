let btc = document.getElementById("bitcoin");
let ltc = document.getElementById("litecoin");
let eth = document.getElementById("ethereum");
let doge = document.getElementById("dogecoin");
let str1 = ""
let str2 = ""
let stra = ""
let strb = ""

let listaGuardada1 = [];
listaGuardada1 = JSON.parse(localStorage.getItem('listaClientes')) ?? [];
let listaClientes1 = listaGuardada1;

fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Clitecoin%2Cethereum%2Cdogecoin&vs_currencies=usd")
    .then((response) => response.json())
    .then((json) => {
        btc.innerHTML = json.bitcoin.usd;
        ltc.innerHTML = json.litecoin.usd;
        eth.innerHTML = json.ethereum.usd;
        doge.innerHTML = json.dogecoin.usd;
    });

titulo = JSON.parse(localStorage.getItem('titulo'))    

cargarDatosCliente(titulo)

function cargarDatosCliente(titulo){
    let titulo1 = document.querySelector('#usuario');
    let html1 = "";
    for (i=0; i<listaClientes1.length; i++){
        let cliente1 = listaClientes1[i]
        //desestructurar cliente
        const {tarjeta, pin, saldo, username, nombre, apellido} = cliente1;
        firstUpperCase(nombre, apellido)
        if (titulo == username) {
            html1 += '<h2>';
            html1 += str2 + " " + strb;
            html1 += '</h2>';
            if (titulo != null){
            titulo1.innerHTML = html1;
    }
            break;
        }
    }
}

function firstUpperCase (name, lastname){
    str1 = name;
    str2 = str1.charAt(0).toUpperCase() + str1.slice(1);
    stra = lastname;
    strb = stra.charAt(0).toUpperCase() + stra.slice(1);
}

function retirarDinero(titulo) {
    for (let i =0; i < listaClientes1.length; i++){
            let cliente1 = listaClientes1[i];
            let monto = document.getElementById('saldo').value;
            if (cliente1.username == titulo){
                if(monto>cliente1.saldo){
                    Swal.fire({
                        title: 'Error',
                        icon: 'error',
                        text: 'Saldo insuficiente para este retiro, por favor escoja una cifra menor',
                    });
                } else {
                    cliente1.saldo -= monto;
                    document.getElementById('saldo').value = ""
                    document.getElementById('oculto').style.display = "none";
                    const guardarClientes = (clave, valor) => {localStorage.setItem(clave, valor)};
                    guardarClientes("listaClientes", JSON.stringify(listaClientes1));
                    Swal.fire({
                        title: 'Correcto',
                        icon: 'success',
                        text: 'Usted retiro el monto solicitado'
                    })
                }
            }
    }   
}

function consultarSaldo(titulo){
    for (let i =0; i < listaClientes1.length; i++){
        let cliente1 = listaClientes1[i];
        if (cliente1.username == titulo){
                text = `Su saldo es de $ ${cliente1.saldo}`
                Swal.fire({
                    title: 'Correcto',
                    icon: 'success',
                    text: text
                })
            }
        }
} 

function borrarCuenta(titulo){
    for (let i =0; i < listaClientes1.length; i++){
        let cliente1 = listaClientes1[i];
        if (cliente1.username == titulo){
                text = `Usted esta retirando $ ${cliente1.saldo} y borrando su cuenta`
                Swal.fire({
                    confirmButtonText: 'OK',
                    title: 'Correcto',
                    icon: 'success',
                    text: text
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location = "./loginuser.html";
                        window.location.href = "./loginuser.html";
                        window.location.assign("./loginuser.html");
                    }
                });
                listaClientes1.splice(i,1)
                const guardarClientes = (clave, valor) => {localStorage.setItem(clave, valor)};
                guardarClientes("listaClientes", JSON.stringify(listaClientes1));              
            }
        }
}   


let botonSacar = document.querySelector('#sacarDinero');
if (botonSacar != null){ 
botonSacar.addEventListener("click", () => {
    document.getElementById('oculto').style.display = "inline";
    document.getElementById('oculto').style.marginBottom = "50px";
});
}

let botonRetirar = document.querySelector('#retirar');
if (botonRetirar != null){ 
botonRetirar.addEventListener("click", () => {
    retirarDinero(titulo);
});
}

let botonConsultar = document.querySelector('#consultar');
if (botonConsultar != null){ 
botonConsultar.addEventListener("click", () => {
    consultarSaldo(titulo);
});
}

let botonBorrar = document.querySelector('#borrar');
if (botonBorrar != null){ 
botonBorrar.addEventListener("click", () => {
    borrarCuenta(titulo);
});
}