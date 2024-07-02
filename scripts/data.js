const cervezas = [
    {
        id: 1,
        nombre: "APA",
        precio: 2500,
        imagen: "/images/birra-apa.jpeg",
        descripcion: "La APA es una cerveza de alta fermentación, de color ámbar, con un sabor y aroma a lúpulo muy marcado. Es una cerveza muy popular en los Estados Unidos y en otros países.",
        tipo: "Ale",
        graduacion: "4°",
        amargor: "Fuerte",
        popular: true
    },
    {
        id: 2,
        nombre: "Golden",
        precio: 2200,
        imagen: "/images/birra-golden.jpeg",
        descripcion: "La Golden es una cerveza de alta fermentación, de color dorado, con un sabor suave y un aroma a lúpulo muy sutil. Es una cerveza muy popular en Bélgica y en otros países.",
        tipo: "Ale",
        graduacion: "5°",
        amargor: "Suave",
        popular: true
    },
    {
        id: 3,
        nombre: "Honey",
        precio: 2500,
        imagen: "/images/birra-honey.jpeg",
        descripcion: "La Honey es una cerveza de alta fermentación, de color ámbar, con un sabor y aroma a miel muy marcado. Es una cerveza muy popular en los Estados Unidos y en otros países.",
        tipo: "Ale",
        graduacion: "4°",
        amargor: "Fuerte",
        popular: false
    },
    {
        id: 4,
        nombre: "IPA",
        precio: 2500,
        imagen: "/images/birra-ipa.jpeg",
        descripcion: "La IPA es una cerveza de alta fermentación, de color ámbar, con un sabor y aroma a lúpulo muy marcado. Es una cerveza muy popular en los Estados Unidos y en otros países.",
        tipo: "Ale",
        graduacion: "6°",
        popular: true
    },
    {
        id: 5,
        nombre: "Irish Sout",
        precio: 2400,
        imagen: "/images/birra-irish-sout.jpeg",
        descripcion: "La Irish Stout es una cerveza negra, de sabor intenso y amargo. Es una cerveza muy popular en Irlanda y en otros países. Cerveza negra, de sabor intenso y amargo. Es una cerveza muy popular en Irlanda y en otros países.",
        tipo: "Stout",
        graduacion: "5°",
        amargor: "Fuerte",
        popular: false
    },
    {
        id: 6,
        nombre: "Pandora Neipa",
        precio: 2600,
        imagen: "/images/birra-pandora-neipa.jpeg",
        descripcion: "La Pandora Neipa es una cerveza de alta fermentación, de color ámbar, con un sabor y aroma a lúpulo muy marcado. Es una cerveza muy popular en los Estados Unidos y en otros países.",
        tipo: "Ale",
        graduacion: "6°",
        amargor: "Fuerte",
        popular: false
    },
    {
        id: 7,
        nombre: "Porter",
        precio: 2500,
        imagen: "/images/birra-porter.jpeg",
        descripcion: "La Porter es una cerveza negra, de sabor intenso y amargo. Es una cerveza muy popular en Inglaterra y en otros países.",
        tipo: "Porter",
        graduacion: "5°",
        amargor: "Fuerte",
        popular: true
    },
    {
        id: 8,
        nombre: "Scottish",
        precio: 2400,
        imagen: "/images/birra-scottish.jpeg",
        descripcion: "La Scottish es una cerveza negra, de sabor intenso y amargo. Es una cerveza muy popular en Escocia y en otros países.",
        tipo: "Ale",
        graduacion: "5°",
        amargor: "Fuerte",
        popular: true
    },
    {
        id: 9,
        nombre: "Session IPA",
        precio: 2300,
        imagen: "/images/birra-session-ipa.jpeg",
        descripcion: "La Session IPA es una cerveza de alta fermentación, de color ámbar, con un sabor y aroma a lúpulo muy marcado. Es una cerveza muy popular en los Estados Unidos y en otros países.",
        tipo: "Ale",
        graduacion: "4°",
        amargor: "Fuerte",
        popular: true
    }
];

/**
 * Obtiene una cerveza del array de cervezas.
 * @param {Number} id el id de la cerveza a buscar.
 * @returns la cerveza si la encuentra, undefined si no la encuentra.
 */
export function obtenerCerveza(id) {
    return cervezas.find(c => c.id === id);
}

/**
 * Obtiene las cervezas populares.
 * @returns un array con las cervezas populares.
 */
export function obtenerCervezasPopulares() {
    return cervezas.filter(c => c.popular);
}

/**
 * Obtiene todas las cervezas.
 * @returns un array con todas las cervezas.
 */
export function obtenerTodasLasCervezas() {
    return cervezas;
}

/**
 * Obtiene el carrito del local storage
 * @returns el carrito del local storage
 */
export function obtenerCarrito() {
    const carrito = localStorage.getItem("carrito");
    return carrito ? JSON.parse(carrito) : { items: [], total: 0 };
}

/**
 * Agrega una cerveza al carrito del local storage, si la cerveza no existe, no hace nada.
 * Si la cerveza ya está en el carrito, modifica la cantidad y el subtotal.
 * Si la cerveza no está en el carrito, la agrega con la cantidad indicada, o 1 por defecto.
 * @param {String} nombreBirra 
 * @param {Number} cantidad
 * @returns true si la cerveza fue agregada, false si no fue encontrada.
 */
export function agregarAlCarrito(id, cantidad = 1) {
    const carrito = obtenerCarrito();
    const items = carrito.items;

    const birra = cervezas.find(birra => birra.id === id);

    if (!birra) {
        return false;
    }

    // si la cerveza está en el carrito, incrementa la cantidad
    const item = items.find(item => item.id === id);
    if (item) {
        item.cantidad = cantidad;
        item.subtotal = item.precio * item.cantidad;
    } else {
        // si no está, la agrega
        items.push({
            id: birra.id,
            imagen: birra.imagen,
            nombre: birra.nombre,
            precio: birra.precio,
            cantidad: cantidad,
            subtotal: birra.precio * cantidad
        });
    }

    // guarda el total del carrito
    const total = items.reduce((total, item) => total + item.subtotal, 0);

    // guarda el carrito en el local storage
    localStorage.setItem("carrito", JSON.stringify({ items, total }));

    return true;
}

/**
 * Elimina una cerveza del carrito del local storage.
 * @param {String} nombreBirra nombre de la cerveza a eliminar del carrito.
 */
export function eliminarDelCarrito(id) {
    const carrito = obtenerCarrito();
    const items = carrito.items;

    items.splice(items.findIndex(item => item.id === id), 1);

    // guarda el total del carrito
    const total = items.reduce((total, item) => total + item.subtotal, 0);

    // guarda el carrito en el local storage
    localStorage.setItem("carrito", JSON.stringify({ items, total }));
}

/**
 * Vacía el carrito del local storage eliminando todos los items.
 */
export function vaciarCarrito() {
    localStorage.removeItem("carrito");
}

/**
 * Obtiene el usuario logueado del local storage.
 * @returns el usuario logueado, o null si no hay usuario logueado.
 */
export function obtenerUsuarioLogueado() {
    const usuario = localStorage.getItem("usuario");
    return usuario ? JSON.parse(usuario) : null;
}

function obtenerUsuariosRegistrados() {
    const usuariosRegistrados = localStorage.getItem("usuarios-registrados");
    return usuariosRegistrados ? JSON.parse(usuariosRegistrados) : [];
}

/**
 * Guarda el usuario logueado en el local storage si pasa la validación.
 * @param {String} email el email del usuario.
 * @param {String} password la contraseña del usuario.
 * @returns true si el usuario es válido, false si no lo es.
 */
export function iniciarSession(email, password) {
    const usuariosRegistrados = obtenerUsuariosRegistrados();
    const usuario = usuariosRegistrados.find(usuario => usuario.email === email && usuario.password === password);

    if (usuario) {
        localStorage.setItem("usuario", JSON.stringify(usuario));
        return true;
    }

    return false;
}


/**
 * Guarda el usuario en el local storage.
 */
export function cerrarSession() {
    localStorage.removeItem("usuario");
}

/**
 * Agrega un usuario al array de usuarios registrados y lo guarda en el local storage.
 * @param {String} email el email del usuario.
 * @param {String} password la contraseña del usuario.
 * @param {String} nombre el nombre del usuario.
 * @param {String} apellido el apellido del usuario.
 * @param {String} fechaNacimiento la fecha de nacimiento del usuario.
 * @param {String} telefono el teléfono del usuario.
 */
export function registrarUsuario(email, password, nombre, apellido, fechaNacimiento, telefono) {
    const usuariosRegistrados = obtenerUsuariosRegistrados();

    // valida que el email no exista
    const usuarioExistente = usuariosRegistrados.find(usuario => usuario.email === email);
    if (usuarioExistente) {
        return false;
    }

    // guarda el usuario en el local storage
    const usuario = {
        email,
        password,
        nombre,
        apellido,
        fechaNacimiento,
        telefono
    };

    usuariosRegistrados.push(usuario);
    localStorage.setItem("usuarios-registrados", JSON.stringify(usuariosRegistrados));

    return true;
}