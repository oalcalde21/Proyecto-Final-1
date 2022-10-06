let listaGuardada1 = [];
listaGuardada1 = JSON.parse(localStorage.getItem('listaClientes')) ?? [];
let listaClientes1 = listaGuardada1;

let btn = document.querySelector('#login');
let frm = document.querySelector('#formu');
let titulo = ""
console.log(listaClientes1);
btn.addEventListener('click', () => {
    let username2 = document.getElementById('username2').value; 
    let pin2 = document.getElementById('pin2').value;
    for (i=0; i<listaClientes1.length; i++){
        let cliente1 = listaClientes1[i]
        console.log(cliente1)
        const {tarjeta, pin, saldo, username, nombre, apellido} = cliente1;
        if (username == username2 && pin == pin2){
            titulo = username
            console.log(titulo)
            const guardarUsuario = (clave, valor) => {localStorage.setItem(clave, valor)};
            guardarUsuario("titulo", JSON.stringify(titulo));
            Swal.fire({
                confirmButtonText: 'OK',
                title: 'Correcto',
                icon: 'success',
                text: 'Ha iniciado sesion correctamente'
            }).then((result) => {
                if (result.isConfirmed) {
                    document.forms["formu"].submit();
                }
            });
            break
        }else {
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: 'El usuario y clave son incorrectos',
            })
        }
    }
    
})



