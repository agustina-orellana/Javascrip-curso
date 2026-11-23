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

const claveCatalogo = "simulador-compras.catalogo";
const claveEstado = "simulador-compras.estado";
let compras = [];
let productos = [];

const vaciar = document.querySelector("#vaciar");
const tituloEliminacion = document.querySelector("#titulo-eliminacion");
const formulario = document.querySelector("#producto");
const tituloFormulario = document.querySelector("#form-title");
const guardar = document.querySelector("#guardar");
const cancelar = document.querySelector("#cancelar");
const buscar = document.querySelector("#buscar");
const presupuesto = document.querySelector("#presupuesto");
const descuento = document.querySelector("#descuento");
const avisoCupon = document.querySelector("#aviso-cupon");
const consultarCupon = document.querySelector("#consultar-cupon");
const estadoCupon = document.querySelector("#estado-cupon");
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

function productoValido(p) {
  return p && typeof p.nombre === "string" && p.nombre.trim() &&
    typeof p.categoria === "string" && p.categoria.trim() &&
    Number.isFinite(p.precio) && p.precio > 0 &&
    Number.isSafeInteger(p.stock) && p.stock >= 0;
}

function compraValida(c) {
  return c && typeof c.nombre === "string" && c.nombre.trim() &&
    Number.isFinite(c.precio) && c.precio > 0 &&
    Number.isSafeInteger(c.cantidad) && c.cantidad > 0 &&
    Number.isFinite(c.total) && c.total === c.precio * c.cantidad;
}

function cargarCatalogo() {
  try {
    const guardado = localStorage.getItem(claveEstado);
    const anterior = localStorage.getItem(claveCatalogo);
    if (guardado === null && anterior === null) return false;
    const datos = guardado !== null ? JSON.parse(guardado) : {
      productos: JSON.parse(anterior),
      compras: []
    };
    if (!datos || !Array.isArray(datos.productos) || !datos.productos.every(productoValido) ||
        !Array.isArray(datos.compras) || !datos.compras.every(compraValida)) {
      throw new Error("Datos inválidos");
    }
    productos = datos.productos.map(({ nombre, precio, categoria, stock }) =>
      new Producto(nombre, precio, categoria, stock)
    );
    compras = datos.compras;
    return true;
  } catch {
    mostrarEstado("No se pudieron leer los datos guardados. Se intentará cargar el catálogo desde el archivo JSON.", true);
    return false;
  }
}

function guardarCatalogo(siguienteCatalogo, siguientesCompras = compras) {
  try {
    // Una sola escritura mantiene sincronizados el stock y las compras.
    localStorage.setItem(claveEstado, JSON.stringify({
      productos: siguienteCatalogo, compras: siguientesCompras
    }));
    productos = siguienteCatalogo;
    compras = siguientesCompras;
    return true;
  } catch {
    mostrarEstado("No se pudo guardar el cambio en el navegador. No se realizó la operación.", true);
    return false;
  }
}

function renderizarCompras() {
  const unidades = compras.reduce((total, compra) => total + compra.cantidad, 0);
  const total = compras.reduce((acumulado, compra) => acumulado + compra.total, 0);
  document.querySelector("#resumen-compras").textContent = compras.length
    ? compras.length + " compra(s) · " + unidades + " unidad(es) · Total acumulado: " + moneda.format(total)
    : "Todavía no registraste compras. Total acumulado: " + moneda.format(0);
}

function renderizarProductos() {
  renderizarCompras();
  vaciar.disabled = productos.length === 0;
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
  const siguienteCatalogo = productoEditado
    ? productos.map(producto => producto === productoEditado ? nuevo : producto)
    : [...productos, nuevo];
  if (!guardarCatalogo(siguienteCatalogo)) {
    return;
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

vaciar.addEventListener("click", () => abrirConfirmacion(null));

function abrirConfirmacion(producto) {
  productoParaEliminar = producto;
  tituloEliminacion.textContent = producto ? "Eliminar producto" : "Vaciar catálogo";
  detalleEliminacion.textContent = producto
    ? "¿Querés eliminar " + producto.nombre + " del catálogo?"
    : "¿Querés eliminar todos los productos del catálogo?";
  confirmarEliminacion.returnValue = "";
  confirmarEliminacion.showModal();
}

confirmarEliminacion.addEventListener("close", () => {
  const producto = productoParaEliminar;
  productoParaEliminar = null;

  if (confirmarEliminacion.returnValue !== "eliminar") {
    mostrarEstado("Eliminación cancelada.");
    return;
  }

  const siguienteCatalogo = producto ? productos.filter(item => item !== producto) : [];
  if (!guardarCatalogo(siguienteCatalogo)) {
    return;
  }
  if (!producto || producto === productoEditado) {
    restablecerFormulario();
  }
  renderizarProductos();
  buscar.focus();
  mostrarEstado(producto ? `Se eliminó ${producto.nombre}.` : "Se vació el catálogo.");
});

catalogo.addEventListener("click", evento => {
  const boton = evento.target.closest("button[data-accion]");
  if (!boton) {
    return;
  }

  const tarjeta = boton.closest("article");
  const indice = Number(tarjeta.dataset.indice);
  const producto = productos[indice];

  const { nombre, precio, categoria, stock } = producto;

  switch (boton.dataset.accion) {
    case "comprar": {
      const cantidad = tarjeta.querySelector("input").valueAsNumber;
      if (!Number.isSafeInteger(cantidad) || cantidad <= 0) {
        mostrarEstado("Ingresá una cantidad entera mayor que cero.", true);
        return;
      }

      const total = precio * cantidad;
      if (!Number.isFinite(total)) {
        mostrarEstado("El total es demasiado grande. Revisá la cantidad.", true);
        return;
      }

      const actualizado = new Producto(nombre, precio, categoria, stock);
      if (!actualizado.vender(cantidad)) {
        mostrarEstado(`Stock insuficiente de ${producto.nombre}. Disponibles: ${producto.stock}.`, true);
        return;
      }

      const siguienteCatalogo = [...productos];
      siguienteCatalogo[indice] = actualizado;
      const siguientesCompras = [...compras, { nombre, precio, cantidad, total }];
      if (!guardarCatalogo(siguienteCatalogo, siguientesCompras)) {
        return;
      }

      if (producto === productoEditado) {
        productoEditado = actualizado;
        formulario.elements.stock.value = actualizado.stock;
      }
      renderizarProductos();
      mostrarEstado(`Compraste ${cantidad} unidad(es) de ${producto.nombre} por ${moneda.format(total)}. Stock restante: ${actualizado.stock}.`);
      break;
    }
    case "editar":
      productoEditado = producto;
      formulario.elements.nombre.value = nombre;
      formulario.elements.categoria.value = categoria;
      formulario.elements.precio.value = precio;
      formulario.elements.stock.value = stock;
      tituloFormulario.textContent = `Editar ${producto.nombre}`;
      guardar.textContent = "Guardar cambios";
      cancelar.hidden = false;
      formulario.elements.nombre.focus();
      mostrarEstado(`Podés modificar los datos de ${producto.nombre} en el formulario.`);
      break;
    case "eliminar":
      abrirConfirmacion(producto);
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

function obtenerCupon() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (productos.length === 0) {
        reject(new Error("Agregá un producto al catálogo para consultar el cupón."));
        return;
      }
      resolve({ codigo: "AHORRO10", porcentaje: 10 });
    }, 900);
  });
}

consultarCupon.addEventListener("click", async () => {
  consultarCupon.disabled = true;
  estadoCupon.textContent = "Consultando cupón…";

  try {
    const { codigo, porcentaje } = await obtenerCupon();
    descuento.value = porcentaje;
    renderizarProductos();
    estadoCupon.textContent = `Cupón ${codigo} aplicado a la simulación (${porcentaje} %).`;
  } catch (error) {
    estadoCupon.textContent = `No se pudo aplicar el cupón. ${error.message}`;
  } finally {
    consultarCupon.disabled = false;
  }
});

descuento.addEventListener("input", () => {
  estadoCupon.textContent = "";
});

function notificar(mensaje, error = false) {
  mostrarEstado(mensaje, error);
  if (typeof Toastify === "function") {
    Toastify({
      text: mensaje,
      duration: error ? 7000 : 4000,
      close: true,
      gravity: "top",
      position: "right",
      escapeMarkup: true,
      ariaLive: error ? "assertive" : "polite",
      style: { background: error ? "#8a2525" : "#125735" }
    }).showToast();
  }
}

let cargandoProductos = false;

async function cargarProductos() {
  if (cargandoProductos) return;
  cargandoProductos = true;
  const carga = document.querySelector("#carga-productos");
  const reintentar = document.querySelector("#reintentar");
  const principal = document.querySelector("main");
  carga.hidden = false;
  reintentar.hidden = true;
  principal.inert = true;
  catalogo.setAttribute("aria-busy", "true");
  const recuperado = cargarCatalogo();
  try {
    const respuesta = await fetch("./data/productos.json", {
      cache: "no-store",
      signal: AbortSignal.timeout(10000)
    });
    if (!respuesta.ok) {
      throw new Error("El servidor respondió con el estado " + respuesta.status + ".");
    }
    const datos = await respuesta.json();
    if (!Array.isArray(datos) || !datos.every(productoValido)) {
      throw new Error("El archivo de productos no tiene el formato esperado.");
    }
    if (!recuperado) {
      productos = datos.map(({ nombre, precio, categoria, stock }) =>
        new Producto(nombre, precio, categoria, stock)
      );
    }
    renderizarProductos();
    notificar(recuperado
      ? "Datos consultados. Se conservó tu catálogo y tus compras guardadas."
      : "Productos cargados desde el archivo JSON.");
  } catch (error) {
    renderizarProductos();
    const detalle = error.name === "TimeoutError"
      ? "La consulta tardó demasiado."
      : error.message;
    notificar("No se pudieron cargar los productos. " + detalle +
      (recuperado ? " Tu catálogo guardado sigue disponible." : " Podés reintentar la carga."), true);
    reintentar.hidden = false;
  } finally {
    carga.hidden = true;
    principal.inert = false;
    catalogo.setAttribute("aria-busy", "false");
    cargandoProductos = false;
  }
}

document.querySelector("#reintentar").addEventListener("click", cargarProductos);
cargarProductos();

function mostrarAvisoCupon() {
  const maximo = presupuesto.valueAsNumber;
  const disponibles = productos.filter(producto => producto.stock > 0);
  let detalle;
  if (productos.length === 0) {
    detalle = "El catálogo está vacío. Agregá un producto para consultar el cupón.";
  } else if (presupuesto.validity.valid && Number.isFinite(maximo)) {
    const accesibles = disponibles.filter(producto => producto.precio <= maximo);
    detalle = `Hay ${accesibles.length} producto(s) con stock dentro de tu presupuesto de ${moneda.format(maximo)} por unidad.`;
  } else {
    detalle = `Hay ${disponibles.length} producto(s) con stock. Ingresá un presupuesto para filtrar por precio.`;
  }
  avisoCupon.textContent = detalle + " Podés consultar un cupón para simular un descuento; la compra mantiene el precio original.";
}

setTimeout(mostrarAvisoCupon, 3000);
