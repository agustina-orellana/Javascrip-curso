


// Cuarta entrega: simulador de compras con arrays //

// Colección inicial con cinco productos.
const productos = ["pan", "leche", "arroz", "huevos", "manzanas"];

// ENTRADA: solicita un dato al usuario.
function pedirDato(mensaje) {
return prompt(mensaje);
}

// PROCESAMIENTO: calcula el total de la compra.
const calcularTotal = (precio, cantidad) => precio * cantidad;

// SALIDA: muestra el total.
function mostrarTotal(total) {
alert("El total de tu compra es: $" + total);
console.log("Total de la compra: $" + total);
}

// Recorre la colección usando for...of.
function mostrarProductos() {
if (productos.length === 0) {
    alert("No hay productos disponibles.");
    return;
}

let listado = "PRODUCTOS DISPONIBLES\n";
console.log("--- Productos disponibles ---");

for (const producto of productos) {
    listado += "Producto: " + producto + "\n";
    console.log("Producto: " + producto);
}

alert(listado);
}

// Agrega un producto al final con push.
function agregarProducto() {
const entrada = pedirDato("Ingresá el producto que querés agregar:");

if (entrada === null) {
    return;
}

const producto = entrada.trim().toLowerCase();

if (producto === "") {
    alert("El nombre no puede estar vacío.");
    return;
}

if (productos.indexOf(producto) !== -1) {
    alert("Ese producto ya está en la lista.");
    return;
}

productos.push(producto);
alert("Se agregó el producto: " + producto);
}

// Elimina el último producto con pop y guarda su nombre.
function eliminarProducto() {
if (productos.length === 0) {
    alert("No hay productos para eliminar.");
    return;
}

const eliminado = productos.pop();
alert("Se ha eliminado el elemento: " + eliminado);
}

// Busca un producto e informa su índice.
function buscarProducto() {
const entrada = pedirDato("¿Qué producto querés buscar?");

if (entrada === null) {
    return;
}

const producto = entrada.trim().toLowerCase();
const indice = productos.indexOf(producto);

if (indice !== -1) {
    alert("El producto " + producto + " está en el índice " + indice);
} else {
    alert("Ese producto no está en la lista.");
}
}

// Reemplaza un producto en el índice encontrado con splice.
function reemplazarProducto() {
const entrada = pedirDato("¿Qué producto querés reemplazar?");

if (entrada === null) {
    return;
}

const producto = entrada.trim().toLowerCase();
const indice = productos.indexOf(producto);

if (indice === -1) {
    alert("Ese producto no está en la lista.");
    return;
}

const nuevaEntrada = pedirDato("Ingresá el nombre del nuevo producto:");

if (nuevaEntrada === null) {
    return;
}

const nuevoProducto = nuevaEntrada.trim().toLowerCase();

if (nuevoProducto === "") {
    alert("El nombre no puede estar vacío.");
    return;
}

if (productos.indexOf(nuevoProducto) !== -1) {
    alert("Ese producto ya está en la lista.");
    return;
}

productos.splice(indice, 1, nuevoProducto);
alert("Se reemplazó " + producto + " por " + nuevoProducto);
}

// Integra el cálculo de la tercera entrega con la lista de productos.
function realizarCompra() {
if (productos.length === 0) {
    alert("Agregá productos antes de realizar una compra.");
    return;
}

mostrarProductos();

const entradaProducto = pedirDato("¿Qué producto querés comprar?");

if (entradaProducto === null) {
    return;
}

const producto = entradaProducto.trim().toLowerCase();

if (productos.indexOf(producto) === -1) {
    alert("Ese producto no está disponible.");
    return;
}

const entradaPrecio = pedirDato("Ingresá el precio de " + producto + ":");

if (entradaPrecio === null) {
    return;
}

const entradaCantidad = pedirDato("¿Cuántas unidades querés comprar?");

if (entradaCantidad === null) {
    return;
}

const precio = Number(entradaPrecio);
const cantidad = Number(entradaCantidad);

if (
    Number.isFinite(precio) &&
    precio > 0 &&
    Number.isInteger(cantidad) &&
    cantidad > 0
) {
    const total = calcularTotal(precio, cantidad);

    if (!Number.isFinite(total)) {
    alert("El total es demasiado grande. Revisá los valores.");
    return;
    }

    console.log("Producto comprado: " + producto);
    mostrarTotal(total);
} else {
    alert("Ingresá un precio válido y una cantidad entera mayor que cero.");
}
}

// Menú principal del simulador.
let continuar = true;

while (continuar) {
const opcion = pedirDato(
    "SIMULADOR DE COMPRAS\n" +
    "1. Mostrar productos\n" +
    "2. Agregar producto\n" +
    "3. Eliminar el último producto\n" +
    "4. Buscar producto\n" +
    "5. Reemplazar producto\n" +
    "6. Realizar una compra\n" +
    "0. Salir"
);

switch (opcion) {
    case "1":
    mostrarProductos();
    break;
    case "2":
    agregarProducto();
    break;
    case "3":
    eliminarProducto();
    break;
    case "4":
    buscarProducto();
    break;
    case "5":
    reemplazarProducto();
    break;
    case "6":
    realizarCompra();
    break;
    case "0":
    case null:
continuar = false;
alert("¡Gracias por usar el simulador!");
break;
    default:
    alert("Elegí una opción válida.");
}
}