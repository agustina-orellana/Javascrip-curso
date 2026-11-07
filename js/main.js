// Entrega 6: simulador de compras con funciones de orden superior //
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

// findIndex localiza el índice para reemplazar productos.
function buscarIndiceProducto(nombre) {
return productos.findIndex(producto => producto.nombre === nombre);
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
// Búsqueda con find: devuelve el objeto que coincide con el nombre.
const producto = productos.find(producto => producto.nombre === nombre);
if (!producto) {
alert("Ese producto no está en la lista.");
console.log("Producto no encontrado:", nombre);
return;
}
console.log("Producto encontrado:", producto);
alert("Producto: " + producto.nombre + "\nPrecio: $" + producto.precio + "\nCategoría: " + producto.categoria + "\nStock: " + producto.stock);
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

// Búsqueda con filter: productos con stock dentro del presupuesto por unidad.
function filtrarPorPresupuesto() {
const entrada = pedirDato("¿Cuánto podés gastar como máximo por unidad?");
if (entrada === null) return;
const presupuesto = Number(entrada);
if (entrada.trim() === "" || !Number.isFinite(presupuesto) || presupuesto <= 0) {
alert("Ingresá un presupuesto positivo.");
return;
}
const encontrados = productos.filter(producto => producto.precio <= presupuesto && producto.stock > 0);
console.log("Productos dentro del presupuesto:", encontrados);
if (encontrados.length === 0) {
alert("No hay productos con stock dentro de ese presupuesto.");
return;
}
let listado = "PRODUCTOS DENTRO DE TU PRESUPUESTO\n";
for (const producto of encontrados) {
listado += producto.nombre + " | $" + producto.precio + " | Stock: " + producto.stock + "\n";
}
alert(listado);
}

// Transformación con map: crea una nueva lista con precios con descuento.
// Esta simulación conserva los precios originales del catálogo.
function simularDescuento() {
if (productos.length === 0) {
alert("No hay productos para simular un descuento.");
return;
}
const entrada = pedirDato("¿Qué porcentaje de descuento querés simular? (mayor que 0 y hasta 100)");
if (entrada === null) return;
const porcentaje = Number(entrada);
if (!Number.isFinite(porcentaje) || porcentaje <= 0 || porcentaje > 100) {
alert("Ingresá un porcentaje mayor que cero y menor o igual a 100.");
return;
}
const productosConDescuento = productos.map(producto => ({
nombre: producto.nombre,
precioOriginal: producto.precio,
precioConDescuento: Number((producto.precio * (1 - porcentaje / 100)).toFixed(2)),
categoria: producto.categoria,
stock: producto.stock
}));
console.log("Simulación de descuento del " + porcentaje + "%:", productosConDescuento);
let listado = "SIMULACIÓN DE DESCUENTO: " + porcentaje + "%\n";
for (const producto of productosConDescuento) {
listado += producto.nombre + ": $" + producto.precioOriginal + " → $" + producto.precioConDescuento + "\n";
}
alert(listado + "\nEsta simulación no modifica los precios de compra.");
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
"7. Filtrar productos por presupuesto\n" +
"8. Simular un descuento\n" +
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
case "7":
filtrarPorPresupuesto();
break;
case "8":
simularDescuento();
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