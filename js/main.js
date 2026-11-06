// Pre-entrega 5: simulador de compras con objetos //
class Producto {
constructor(nombre, precio, categoria, stock) {
this.nombre = nombre;
this.precio = precio;
this.categoria = categoria;
this.stock = stock;
};

vender(cantidad) {
if (!Number.isInteger(cantidad) || cantidad <= 0) {
console.log("La cantidad debe ser un entero mayor que cero.");
return false;
}

if (cantidad > this.stock) {
console.log("Stock insuficiente de " + this.nombre);
return false;
}

this.stock -= cantidad;
console.log(
"Venta de " + this.nombre + ". Stock restante: " + this.stock
);

return true;
}
}

// Instancias creadas con new y guardadas en constantes.
// Los precios son de ejemplo.
const pan = new Producto("pan", 1500, "panadería", 20);
const leche = new Producto("leche", 1800, "lácteos", 15);
const arroz = new Producto("arroz", 2200, "almacén", 30);
const huevos = new Producto("huevos", 300, "almacén", 40);
const manzanas = new Producto("manzanas", 500, "frutas", 25);

const productos = [pan, leche, arroz, huevos, manzanas];

function pedirDato(mensaje) {
return prompt(mensaje);
}

const calcularTotal = (precio, cantidad) => precio * cantidad;

function mostrarTotal(total) {
alert("El total de tu compra es: $" + total);
console.log("Total de la compra: $" + total);
}

// Busca por nombre y devuelve el índice del objeto.
function buscarIndiceProducto(nombre) {
for (let indice = 0; indice < productos.length; indice++) {
if (productos[indice].nombre === nombre) {
return indice;
}
}

return -1;
}

function mostrarProductos() {
if (productos.length === 0) {
alert("No hay productos disponibles.");
return;
}

let listado = "PRODUCTOS DISPONIBLES\n";

for (const producto of productos) {
const detalle =
"Producto: " + producto.nombre +
" | Precio: $" + producto.precio +
" | Categoría: " + producto.categoria +
" | Stock: " + producto.stock;

listado += detalle + "\n";
console.log(detalle);
}

alert(listado);
}

// Solicita y valida los datos para crear un objeto.
function pedirNuevoProducto() {
const entradaNombre = pedirDato("Ingresá el nombre del producto:");

if (entradaNombre === null) {
return null;
}

const nombre = entradaNombre.trim().toLowerCase();

if (nombre === "") {
alert("El nombre no puede estar vacío.");
return null;
}

if (buscarIndiceProducto(nombre) !== -1) {
alert("Ese producto ya está en la lista.");
return null;
}

const entradaPrecio = pedirDato("Ingresá el precio:");

if (entradaPrecio === null) {
return null;
}

const entradaCategoria = pedirDato("Ingresá la categoría:");

if (entradaCategoria === null) {
return null;
}

const entradaStock = pedirDato("Ingresá el stock inicial:");

if (entradaStock === null) {
return null;
}

const precio = Number(entradaPrecio);
const categoria = entradaCategoria.trim().toLowerCase();
const stock = Number(entradaStock);

if (
!Number.isFinite(precio) ||
precio <= 0 ||
categoria === "" ||
entradaStock.trim() === "" ||
!Number.isInteger(stock) ||
stock < 0
) {
alert(
"Ingresá un precio positivo, una categoría y un stock entero de cero o más."
);
return null;
}

return new Producto(nombre, precio, categoria, stock);
}

function agregarProducto() {
const nuevoProducto = pedirNuevoProducto();

if (nuevoProducto === null) {
return;
}

productos.push(nuevoProducto);
alert("Se agregó el producto: " + nuevoProducto.nombre);
}

function eliminarProducto() {
if (productos.length === 0) {
alert("No hay productos para eliminar.");
return;
}

const eliminado = productos.pop();
alert("Se ha eliminado el elemento: " + eliminado.nombre);
}

function buscarProducto() {
const entrada = pedirDato("¿Qué producto querés buscar?");

if (entrada === null) {
return;
}

const nombre = entrada.trim().toLowerCase();
const indice = buscarIndiceProducto(nombre);

if (indice === -1) {
alert("Ese producto no está en la lista.");
return;
}

const producto = productos[indice];

alert(
"Producto: " + producto.nombre +
"\nÍndice: " + indice +
"\nPrecio: $" + producto.precio +
"\nStock: " + producto.stock
);
}

function reemplazarProducto() {
const entrada = pedirDato("¿Qué producto querés reemplazar?");

if (entrada === null) {
return;
}

const nombre = entrada.trim().toLowerCase();
const indice = buscarIndiceProducto(nombre);

if (indice === -1) {
alert("Ese producto no está en la lista.");
return;
}

const nuevoProducto = pedirNuevoProducto();

if (nuevoProducto === null) {
return;
}

productos.splice(indice, 1, nuevoProducto);
alert("Se reemplazó " + nombre + " por " + nuevoProducto.nombre);
}

function realizarCompra() {
if (productos.length === 0) {
alert("No hay productos para comprar.");
return;
}

mostrarProductos();

const entrada = pedirDato("¿Qué producto querés comprar?");

if (entrada === null) {
return;
}

const nombre = entrada.trim().toLowerCase();
const indice = buscarIndiceProducto(nombre);

if (indice === -1) {
alert("Ese producto no está disponible.");
return;
}

const entradaCantidad = pedirDato("¿Cuántas unidades querés comprar?");

if (entradaCantidad === null) {
return;
}

const cantidad = Number(entradaCantidad);

if (!Number.isInteger(cantidad) || cantidad <= 0) {
alert("Ingresá una cantidad entera mayor que cero.");
return;
}

const producto = productos[indice];
const total = calcularTotal(producto.precio, cantidad);

if (!Number.isFinite(total)) {
alert("El total es demasiado grande. Revisá los valores.");
return;
}

  // Ejecuta el método de instancia que modifica el stock.
const ventaRealizada = producto.vender(cantidad);

if (ventaRealizada) {
mostrarTotal(total);
alert("Stock restante de " + producto.nombre + ": " + producto.stock);

// Verificación de las propiedades después de la venta.
console.log("Producto después de la compra:", producto);
console.log("Stock final: " + producto.stock);
} else {
alert("Stock insuficiente. Unidades disponibles: " + producto.stock);
}
}

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