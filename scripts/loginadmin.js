let usuarioAdmin =
    {
        usuario: "admin",
        pin: "Administrador*123",
    };

let btn = document.querySelector('#login');
let frm = document.querySelector('#formu');
btn.addEventListener('click', () => {
    let username = document.getElementById('username2').value; 
    let pin = document.getElementById('pin2').value;
    
    if (usuarioAdmin.usuario == username && usuarioAdmin.pin == pin){
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
    }else {
        Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'El usuario y clave son incorrectos',
        })
    }
})