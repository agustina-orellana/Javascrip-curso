class Producto {
  constructor(nombre, precio, categoria, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.stock = stock;
  }

vender(cantidad) {
if (!Number.isSafeInteger(cantidad) || cantidad <= 0 || cantidad > this.stock) {
return false;
}

this.stock -= cantidad;
return true;
}
}

const productos = [
  new Producto("pan", 1500, "panadería", 20),
  new Producto("leche", 1800, "lácteos", 15),
  new Producto("arroz", 2200, "almacén", 30),
  new Producto("huevos", 300, "almacén", 40),
  new Producto("manzanas", 500, "frutas", 25)
];

const formulario = document.querySelector("#producto");
const tituloFormulario = document.querySelector("#form-title");
const guardar = document.querySelector("#guardar");
const cancelar = document.querySelector("#cancelar");
const buscar = document.querySelector("#buscar");
const presupuesto = document.querySelector("#presupuesto");
const descuento = document.querySelector("#descuento");
const catalogo = document.querySelector("#catalogo");
const resultados = document.querySelector("#resultados");
const estado = document.querySelector("#estado");
const confirmarEliminacion = document.querySelector("#confirmar-eliminacion");
const detalleEliminacion = document.querySelector("#detalle-eliminacion");
const moneda = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" });
let productoEditado = null;
let productoParaEliminar = null;

function normalizar(texto) {
  return texto.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function mostrarEstado(mensaje, error = false) {
  estado.classList.toggle("error", error);
  estado.textContent = mensaje;
}

function renderizarProductos() {
  const consulta = normalizar(buscar.value);
  const maximo = presupuesto.valueAsNumber;
  const porcentaje = descuento.valueAsNumber;
  const aplicarPresupuesto = presupuesto.validity.valid && Number.isFinite(maximo);
  const aplicarDescuento = descuento.validity.valid && porcentaje > 0;
  const visibles = productos.filter(producto =>
    normalizar(producto.nombre).includes(consulta) &&
    (!aplicarPresupuesto || (producto.precio <= maximo && producto.stock > 0))
  );

  catalogo.innerHTML = visibles.map(producto => `
    <article data-indice="${productos.indexOf(producto)}">
      <h3></h3>
      <p class="categoria"></p>
      <p>Precio por unidad: <strong>${moneda.format(producto.precio)}</strong></p>
      ${aplicarDescuento ? `<p class="descuento">Precio simulado: ${moneda.format(producto.precio * (1 - porcentaje / 100))}</p>` : ""}
      <p>${producto.stock > 0 ? `Stock: ${producto.stock}` : "Sin stock"}</p>
      <label>Cantidad<input type="number" min="1" max="${producto.stock}" step="1" value="1" ${producto.stock === 0 ? "disabled" : ""}></label>
      <div class="actions">
        <button type="button" data-accion="comprar" ${producto.stock === 0 ? "disabled" : ""}>Comprar</button>
        <button type="button" class="secundario" data-accion="editar">Editar</button>
        <button type="button" class="secundario" data-accion="eliminar">Eliminar</button>
      </div>
    </article>
  `).join("");

  Array.from(catalogo.children).forEach((tarjeta, indice) => {
    tarjeta.querySelector("h3").textContent = visibles[indice].nombre;
    tarjeta.querySelector(".categoria").textContent = visibles[indice].categoria;
  });

  resultados.textContent = visibles.length
    ? `${visibles.length} de ${productos.length} productos.`
    : "No hay productos para mostrar.";

  if (aplicarDescuento) {
    resultados.textContent += " La simulación conserva el precio de compra.";
  }
}

function restablecerFormulario() {
  productoEditado = null;
  formulario.reset();
  tituloFormulario.textContent = "Agregar producto";
  guardar.textContent = "Agregar producto";
  cancelar.hidden = true;
}

formulario.addEventListener("submit", evento => {
  evento.preventDefault();
  const campos = formulario.elements;
  const nombre = campos.nombre.value.trim();
  const categoria = campos.categoria.value.trim();
  const precio = campos.precio.valueAsNumber;
  const stock = campos.stock.valueAsNumber;

  if (!formulario.checkValidity() || !nombre || !categoria || !Number.isSafeInteger(stock)) {
    mostrarEstado("Ingresá un nombre, una categoría, un precio positivo con hasta dos decimales y un stock entero de cero o más.", true);
    return;
  }

  if (productos.some(producto => producto !== productoEditado && normalizar(producto.nombre) === normalizar(nombre))) {
    mostrarEstado("Ya existe un producto con ese nombre.", true);
    return;
  }

  const nuevo = new Producto(nombre, precio, categoria, stock);
  const mensaje = productoEditado ? `Se actualizó ${nombre}.` : `Se agregó ${nombre}.`;
  if (productoEditado) {
    productos.splice(productos.indexOf(productoEditado), 1, nuevo);
  } else {
    productos.push(nuevo);
  }

  restablecerFormulario();
  buscar.value = "";
  presupuesto.value = "";
  renderizarProductos();
  mostrarEstado(mensaje);
});

cancelar.addEventListener("click", () => {
  restablecerFormulario();
  mostrarEstado("Edición cancelada.");
});

confirmarEliminacion.addEventListener("close", () => {
  const producto = productoParaEliminar;
  productoParaEliminar = null;

  if (confirmarEliminacion.returnValue !== "eliminar") {
    mostrarEstado("Eliminación cancelada.");
    return;
  }

  productos.splice(productos.indexOf(producto), 1);
  if (producto === productoEditado) {
    restablecerFormulario();
  }
  renderizarProductos();
  buscar.focus();
  mostrarEstado(`Se eliminó ${producto.nombre}.`);
});

catalogo.addEventListener("click", evento => {
  const boton = evento.target.closest("button[data-accion]");
  if (!boton) {
    return;
  }

  const tarjeta = boton.closest("article");
  const indice = Number(tarjeta.dataset.indice);
  const producto = productos[indice];

  switch (boton.dataset.accion) {
    case "comprar": {
      const cantidad = tarjeta.querySelector("input").valueAsNumber;
      if (!Number.isSafeInteger(cantidad) || cantidad <= 0) {
        mostrarEstado("Ingresá una cantidad entera mayor que cero.", true);
        return;
      }

      const total = producto.precio * cantidad;
      if (!Number.isFinite(total)) {
        mostrarEstado("El total es demasiado grande. Revisá la cantidad.", true);
        return;
      }

      if (!producto.vender(cantidad)) {
        mostrarEstado(`Stock insuficiente de ${producto.nombre}. Disponibles: ${producto.stock}.`, true);
        return;
      }

      if (producto === productoEditado) {
        formulario.elements.stock.value = producto.stock;
      }
      renderizarProductos();
      mostrarEstado(`Compraste ${cantidad} unidad(es) de ${producto.nombre} por ${moneda.format(total)}. Stock restante: ${producto.stock}.`);
      break;
    }
    case "editar":
      productoEditado = producto;
      formulario.elements.nombre.value = producto.nombre;
      formulario.elements.categoria.value = producto.categoria;
      formulario.elements.precio.value = producto.precio;
      formulario.elements.stock.value = producto.stock;
      tituloFormulario.textContent = `Editar ${producto.nombre}`;
      guardar.textContent = "Guardar cambios";
      cancelar.hidden = false;
      formulario.elements.nombre.focus();
      mostrarEstado(`Podés modificar los datos de ${producto.nombre} en el formulario.`);
      break;
    case "eliminar":
      productoParaEliminar = producto;
      detalleEliminacion.textContent = `¿Querés eliminar ${producto.nombre} del catálogo?`;
      confirmarEliminacion.returnValue = "";
      confirmarEliminacion.showModal();
      break;
  }
});

[buscar, presupuesto, descuento].forEach(campo => {
  campo.addEventListener("input", () => {
    if (!campo.validity.valid) {
      mostrarEstado(campo === presupuesto ? "Ingresá un presupuesto válido de cero o más." : "Ingresá un descuento entre 0 y 100.", true);
    } else {
      mostrarEstado("");
    }
    renderizarProductos();
  });
});

renderizarProductos();
