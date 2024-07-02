import { obtenerTodasLasCervezas } from "./data.js";

const cervezas = obtenerTodasLasCervezas();
const section = document.querySelector(".cervezas-queridas");

// recorro las cervezas y las agrego al html
cervezas.forEach(cerveza => {
    const article = document.createElement("article");
    article.classList.add("item-cerveza");

    const img = document.createElement("img");
    img.src = cerveza.imagen;
    img.alt = `vaso de birra de una ${cerveza.nombre}`;
    article.appendChild(img);

    const h3 = document.createElement("h3");
    h3.textContent = cerveza.nombre;
    article.appendChild(h3);

    const a = document.createElement("a");
    a.href = `/pages/cervezas/cerveza.html?id=${cerveza.id}`;
    a.textContent = "Ver";
    article.appendChild(a);

    section.appendChild(article);
});