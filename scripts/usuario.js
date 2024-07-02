import { iniciarSession, registrarUsuario, obtenerUsuarioLogueado, cerrarSession } from "./data.js";

const formLogin = document.getElementById("formLogin");
formLogin.addEventListener("submit", iniciarSesion);

const formRegister = document.getElementById("formRegister");
formRegister.addEventListener("submit", registrar);

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

function iniciarSesion(e) {
    e.preventDefault();
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("constrasenial");

    const email = inputEmail.value;
    const password = inputPassword.value;

    const exito = iniciarSession(email, password);

    if (exito) {
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
    const errorNombre = document.getElementById("errorNombre");

    const apellidoInput = document.getElementById("apellido");
    const errorApellido = document.getElementById("errorApellido");

    const emailInput = document.getElementById("emailr");
    const errorEmail = document.getElementById("errorEmail");

    const passwordInput = document.getElementById("constraseniar");
    const errorPassword = document.getElementById("errorPassword");

    const fechaNacimientoInput = document.getElementById("fechaNacimiento");
    const errorFechaNacimiento = document.getElementById("errorFechaNacimiento");

    const telefonoInput = document.getElementById("telefono");
    const errorTelefono = document.getElementById("errorTelefono");

    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const fechaNacimiento = fechaNacimientoInput.value;
    const telefono = telefonoInput.value;

    let camposValidos = true;

    if (nombre === "" || nombre.length < 3) {
        nombreInput.style.border = "2px solid red";
        errorNombre.innerHTML = "El nombre debe tener al menos 3 caracteres";
        errorNombre.style.display = "block";
        camposValidos = false;
    } else {
        nombreInput.style.border = "2px solid green";
        errorNombre.style.display = "none";
    }

    if (apellido === "" || apellido.length < 3) {
        apellidoInput.style.border = "2px solid red";
        errorApellido.innerHTML = "El apellido debe tener al menos 3 caracteres";
        errorApellido.style.display = "block";
        camposValidos = false;
    } else {
        apellidoInput.style.border = "2px solid green";
        errorApellido.style.display = "none";
    }

    if (email === "" || email.length < 3) {
        emailInput.style.border = "2px solid red";
        errorEmail.innerHTML = "El email debe tener al menos 3 caracteres";
        errorEmail.style.display = "block";
        camposValidos = false;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
        emailInput.style.border = "2px solid red";
        errorEmail.innerHTML = "El email no es valido";
        errorEmail.style.display = "block";
        camposValidos = false;
    } else {
        emailInput.style.border = "2px solid green";
        errorEmail.style.display = "none";
    }

    if (password === "" || password.length < 8) {
        passwordInput.style.border = "2px solid red";
        errorPassword.innerHTML = "La contraseña debe tener al menos 8 caracteres";
        errorPassword.style.display = "block";
        camposValidos = false;
    } else {
        passwordInput.style.border = "2px solid green";
        errorPassword.style.display = "none";
    }

    // verifica que la fecha se mayor a 18 años
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const mes = hoy.getMonth() - fechaNacimientoDate.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimientoDate.getDate())) {
        edad--;
    }
    
    if (!edad || edad < 18) {
        fechaNacimientoInput.style.border = "2px solid red";
        errorFechaNacimiento.innerHTML = "Debes ser mayor de 18 años";
        errorFechaNacimiento.style.display = "block";
        camposValidos = false;
    } else {
        fechaNacimientoInput.style.border = "2px solid green";
        errorFechaNacimiento.style.display = "none";
    }

    if (telefono === "" || telefono.length < 8) {
        telefonoInput.style.border = "2px solid red";
        errorTelefono.innerHTML = "El telefono debe tener al menos 8 caracteres";
        errorTelefono.style.display = "block";
        camposValidos = false;
    } else {
        telefonoInput.style.border = "2px solid green";
        errorTelefono.style.display = "none";
    }

    if (camposValidos) {
        const registroExitoso = registrarUsuario(
            email,
            password,
            nombre,
            apellido,
            fechaNacimiento,
            telefono);
        if (registroExitoso) {
            iniciarSession(email, password);
            location.reload();
        } else {
            emailInput.style.border = "2px solid red";
            errorEmail.innerHTML = "El email ya existe";
            errorEmail.style.display = "block";
        }
    }
}

function cerrarSesion() {
    cerrarSession();
    location.reload();
    // scroll arriba
    window.scrollTo(0, 0);
}

function mostrarPerfil() {
    const usuario = obtenerUsuarioLogueado();

    document.getElementById("nombrePerfil").innerHTML = usuario.nombre;
    document.getElementById("apellidoPerfil").innerHTML = usuario.apellido;
    document.getElementById("emailPerfil").innerHTML = usuario.email;
    document.getElementById("fechaNacimientoPerfil").innerHTML = usuario.fechaNacimiento;
    document.getElementById("telefonoPerfil").innerHTML = usuario.telefono;
}