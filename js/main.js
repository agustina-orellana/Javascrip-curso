 // Primer entrega //
 // let mensaje = prompt("¿Cuál es tu nombre?");
// const edad = parseInt(prompt("¿Cuántos años tienes?"), 10);
// const añoActual = parseInt(prompt("¿En qué año estamos?"), 10);


// mensaje = "Hola " + mensaje +
//   ", naciste aproximadamente en el año " + (añoActual - edad) + ".";

// alert(mensaje);

// Segunda entrega //

// const meta = 1000;
// // Guarda el total ahorrado en la variable ahorro//
// let ahorro = 0;

// // Muestra la meta al usuario //
// alert("Tu meta es ahorrar $" + meta);

// // Mientras el ahorro sea menor a la meta, se le pedirá al usuario que ingrese un monto para agregar al ahorro //
// while (ahorro < meta) {
//   const entrada = prompt("¿Cuánto dinero querés agregar?");

//   if (entrada === null) {
//     alert("Terminaste con $" + ahorro + " ahorrados.");
//     break;
//   }

//   //convierte el texto ingresado a numero //
//   const monto = Number(entrada);

//   // Verifica que el monto ingresado sea un número mayor que cero //
//   if (monto > 0 && Number.isFinite(monto)) {
//     ahorro = ahorro + monto;
//     alert("Llevás ahorrados $" + ahorro);
//   } else {
//     alert("Ingresá un número mayor que cero.");
//   }
// }

// // Si el ahorro es mayor o igual a la meta, se muestra un mensaje de felicitación //
// if (ahorro >= meta) {
//   alert("¡Llegaste a tu meta!");
// }

//Tercera entrega//


// ENTRADA: solicita un dato al usuario y devuelve su respuesta.
function pedirDato(mensaje) {
  return prompt(mensaje);
}

// PROCESAMIENTO: función flecha que calcula y devuelve el total.
const calcularTotal = (precio, cantidad) => precio * cantidad;

// SALIDA: muestra el total en una alerta y en la consola.
function mostrarTotal(total) {
  alert("El total de tu compra es: $" + total);
  console.log("Total de la compra: $" + total);
}

let continuar = "si";

// Repite el simulador mientras el usuario escriba "si".
while (continuar === "si") {
  const entradaPrecio = pedirDato("Ingresá el precio del producto:");

  // Finaliza si el usuario presiona Cancelar.
  if (entradaPrecio === null) {
    break;
  }

  const entradaCantidad = pedirDato("¿Cuántas unidades querés comprar?");

  if (entradaCantidad === null) {
    break;
  }

  // Convierte las respuestas en números.
  const precio = Number(entradaPrecio);
  const cantidad = Number(entradaCantidad);

  // Comprueba que el precio sea positivo y la cantidad sea un entero positivo//
  if (
    Number.isFinite(precio) &&
    precio > 0 &&
    Number.isInteger(cantidad) &&
    cantidad > 0
  ) {
    const total = calcularTotal(precio, cantidad);
    mostrarTotal(total);
  } else {
    alert("Ingresá un precio válido y una cantidad entera mayor que cero.");
  }

  continuar = pedirDato(
    "¿Querés hacer otra compra? Escribí si para continuar."
  );
}
//Finaliza el simular si el usuario no escribe "si " o cancelar //
