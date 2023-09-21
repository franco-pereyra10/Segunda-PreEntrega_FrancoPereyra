// Clase "molde" para los items del juego
class Item {
  constructor(nombre, precio, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
  }
}

// Items del juego
const Fuego = new Item("fuego", 100, "fuego.jpg");
const Fuerza = new Item("fuerza", 180, "fuerza.jpg");
const Invisible = new Item("invisible", 90, "invisible.jpg");

// Array para el inventario donde se van a ir metiendo los items que compremos
const inventario = [];

// Dinero del juego
let dinero = 500;

// Elementos del DOM
const elDinero = document.querySelector("#dinero span");
elDinero.innerText = dinero; // Para que muestre el dinero apenas carga la aplicación}
const elInventario = document.getElementById("inventario");

// Función para agregar items a nuestro inventario
function comprar(itemDelJuego) {
  // Aca se verifica si hay dinero disponible para la compra
  if (dinero - itemDelJuego.precio >= 0) {
    inventario.push(itemDelJuego);
    dinero -= itemDelJuego.precio; // Actualizamos el dinero
    actualizarHTML();
  } else {
    alert(`No tenés dinero suficiente para comprar ${itemDelJuego.nombre}.`);
  }
}

// Función para vender un item
function vender(nombreDelItem) {
  // Se busca el item con find
  const itemEncontrado = inventario.find(
    (item) => item.nombre == nombreDelItem
  );

  // Si está en el inventario, lo sacamos y actualizamos el HTML
  if (itemEncontrado) {
    // Se actualiza el dinero
    dinero += itemEncontrado.precio;
    // Se actualiza el inventario
    const indice = inventario.indexOf(itemEncontrado);
    inventario.splice(indice, 1);
    // Se actualiza el HTML
    actualizarHTML();
  }
}

// Función para actualizar el HTML de la aplicación (oro e items)
function actualizarHTML() {
  elInventario.innerHTML = "";
  for (const itemDelJuego of inventario) {
    const li = `
        <li onclick="vender('${itemDelJuego.nombre}')">
          <img src="imagenes/${itemDelJuego.imagen}" alt="${itemDelJuego.imagen}" />
        </li>
        `;
    // Va a ir concatenando los li creados en el elemento #inventario (ul)
    elInventario.innerHTML += li;
  }

  elDinero.innerText = dinero;
}
