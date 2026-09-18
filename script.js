// ================= CARRITO =================

let carrito = [];

const botonesAgregar = document.querySelectorAll(".agregar");
const listaCarrito = document.getElementById("listaCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const totalElemento = document.getElementById("total");


// Agregar productos

botonesAgregar.forEach(boton => {

    boton.addEventListener("click", () => {

        const nombre = boton.dataset.nombre;
        const precio = Number(boton.dataset.precio);

        carrito.push({
            nombre: nombre,
            precio: precio
        });

        actualizarCarrito();

        alert(`${nombre} fue agregado al carrito.`);

    });

});


// Actualizar carrito

function actualizarCarrito() {

    contadorCarrito.textContent = carrito.length;

    if (carrito.length === 0) {

        listaCarrito.innerHTML = `
            <p class="text-secondary text-center">
                Tu carrito está vacío.
            </p>
        `;

        totalElemento.textContent = "$0 MXN";

        return;
    }


    listaCarrito.innerHTML = "";

    let total = 0;


    carrito.forEach((producto, index) => {

        total += producto.precio;

        const elemento = document.createElement("div");

        elemento.classList.add(
            "d-flex",
            "justify-content-between",
            "align-items-center",
            "mb-3"
        );

        elemento.innerHTML = `
            <div>
                <strong>${producto.nombre}</strong>
                <br>
                <span>$${producto.precio} MXN</span>
            </div>

            <button
                class="btn btn-sm btn-outline-danger"
                onclick="eliminarProducto(${index})"
            >
                <i class="bi bi-trash"></i>
            </button>
        `;

        listaCarrito.appendChild(elemento);

    });


    totalElemento.textContent = `$${total} MXN`;

}


// Eliminar producto

function eliminarProducto(index) {

    carrito.splice(index, 1);

    actualizarCarrito();

}


// ================= BUSCADOR =================

const buscador = document.getElementById("buscador");

buscador.addEventListener("input", () => {

    const texto = buscador.value.toLowerCase();

    const productos = document.querySelectorAll(".producto");

    productos.forEach(producto => {

        const nombre =
            producto.querySelector(".card-title")
            .textContent
            .toLowerCase();

        if (nombre.includes(texto)) {

            producto.style.display = "";

        } else {

            producto.style.display = "none";

        }

    });

});


// ================= FILTROS =================

const filtros = document.querySelectorAll(".filtro");

filtros.forEach(filtro => {

    filtro.addEventListener("click", () => {

        filtros.forEach(btn => {
            btn.classList.remove("active");
        });

        filtro.classList.add("active");

        const genero = filtro.dataset.genero;

        const productos = document.querySelectorAll(".producto");

        productos.forEach(producto => {

            if (
                genero === "todos" ||
                producto.dataset.genero === genero
            ) {

                producto.style.display = "";

            } else {

                producto.style.display = "none";

            }

        });

    });

});


// ================= FORMULARIO =================

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (evento) => {

    evento.preventDefault();

    alert("¡Gracias por contactarnos! Tu mensaje fue enviado.");

    formulario.reset();

});


// ================= COMPRA =================

const botonComprar = document.getElementById("comprar");

botonComprar.addEventListener("click", () => {

    if (carrito.length === 0) {

        alert("Tu carrito está vacío.");

        return;

    }

    alert("¡Compra realizada correctamente!");

    carrito = [];

    actualizarCarrito();

});