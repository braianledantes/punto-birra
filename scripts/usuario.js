window.onload = function() {
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
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("constrasenial");

    const usuario = inputEmail.value;
    const password = inputPassword.value;

    const usuarioEncontrado = validarUsuario(usuario, password);

    if (usuarioEncontrado) {
        // guarda el usuario en el local storage
        localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
        // recarga la pagina
        location.reload();
    } else {
        inputEmail.style.border = "2px solid red";
        inputPassword.style.border = "2px solid red";
    }
}

function registrar(e) {
    e.preventDefault();
    const nombreInput = document.getElementById("nombre");
    const apellidoInput = document.getElementById("apellido");
    const emailInput = document.getElementById("emailr");
    const passwordInput = document.getElementById("constraseniar");
    const fechaNacimientoInput = document.getElementById("fechaNacimiento");

    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const fechaNacimiento = fechaNacimientoInput.value;

    let valido = true;

    // valida que el nombre no este vacio
    if (!nombre || nombre === "") {
        nombreInput.style.border = "2px solid red";
        valido = false;
    } else {
        nombreInput.style.border = "none";
    }

    // valida que el apellido no este vacio
    if (!apellido || apellido === "") {
        apellidoInput.style.border = "2px solid red";
        valido = false;
    } else {
        apellidoInput.style.border = "none";
    }

    // valida que el email no este vacio
    if (!email || email === "") {
        emailInput.style.border = "2px solid red";
        valido = false;
    } else {
        emailInput.style.border = "none";
    }

    // valida que el password no este vacio
    if (!password || password === "") {
        passwordInput.style.border = "2px solid red";
        valido = false;
    } else {
        passwordInput.style.border = "none";
    }

    // no valida la fecha de nacimiento

    if (!valido) {
        return;
    }

    // verifica que el email no este registrado
    if (existeUsuario(email)) {
        alert("El email ya esta registrado");
        nombreInput.style.border = "2px solid red";
        apellidoInput.style.border = "2px solid red";
        emailInput.style.border = "2px solid red";
        passwordInput.style.border = "2px solid red";
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