window.onload = function() {
    console.log("Cargado");
    const btnIngresar = document.getElementById("btnIngresar");
    btnIngresar.addEventListener("click", iniciarSesion);

    const btnRegister = document.getElementById("btnRegister");
    btnRegister.addEventListener("click", registrar);

    const btnLogout = document.getElementById("btnLogout");
    btnLogout.addEventListener("click", cerrarSesion);

    // si el usuario ya esta logueado quita el formulario de login y registro
    var usuario = localStorage.getItem("usuario");
    if (usuario) {
        document.querySelector(".login").style.display = "none";
        document.querySelector(".register").style.display = "none";
        mostrarPerfil();
    } else {
        document.querySelector(".perfil").style.display = "none";
    }
}

function iniciarSesion(e) {
    e.preventDefault();
    var usuario = document.getElementById("email").value;
    var password = document.getElementById("constrasenial").value;

    const usuarioEncontrado = validarUsuario(usuario, password);
    console.log(usuario, password, usuarioEncontrado)

    if (usuarioEncontrado) {
        // guarda el usuario en el local storage
        localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
        // recarga la pagina
        location.reload();
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

function registrar(e) {
    console.log("registrar");
    
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("emailr").value;
    const password = document.getElementById("constraseniar").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;

    // verifica que los datos sean validos
    if (!nombre || !apellido || !email || !password || !fechaNacimiento) {
        alert("Todos los campos son obligatorios");
        return;
    }

    // verifica que el email no este registrado
    if (existeUsuario(email)) {
        alert("El email ya esta registrado");
        return;
    }

    const usuario = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        password: password,
        fechaNacimiento: fechaNacimiento
    };
    guardarUsuario(usuario);

    // guarda el usuario en el local storage
    localStorage.setItem("usuario", JSON.stringify(usuario));
    // recarga la pagina
    location.reload();
}

function cerrarSesion() {
    localStorage.removeItem("usuario");
    location.reload();
    // scroll arriba
    window.scrollTo(0, 0);
}

function guardarUsuario(usuario) {
    const usuarios = localStorage.getItem("usuarios") ? JSON.parse(localStorage.getItem("usuarios")) : [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function validarUsuario(email, password) {
    const usuarios = localStorage.getItem("usuarios") ? JSON.parse(localStorage.getItem("usuarios")) : [];
    const usuario = usuarios.find(function(u) {
        return u.email === email && u.password === password;
    });
    return usuario;
}

function existeUsuario(email) {
    const usuarios = localStorage.getItem("usuarios") ? JSON.parse(localStorage.getItem("usuarios")) : [];
    const usuario = usuarios.find(function(u) {
        return u.email === email;
    });
    return usuario;
}

function mostrarPerfil() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    document.getElementById("nombrePerfil").innerHTML = usuario.nombre;
    document.getElementById("apellidoPerfil").innerHTML = usuario.apellido;
    document.getElementById("emailPerfil").innerHTML = usuario.email;
    document.getElementById("fechaNacimientoPerfil").innerHTML = usuario.fechaNacimiento;
}