 // Primer entrega //
 // let mensaje = prompt("¿Cuál es tu nombre?");
// const edad = parseInt(prompt("¿Cuántos años tienes?"), 10);
// const añoActual = parseInt(prompt("¿En qué año estamos?"), 10);


// mensaje = "Hola " + mensaje +
//   ", naciste aproximadamente en el año " + (añoActual - edad) + ".";

// alert(mensaje);

// Segunda entrega //

const meta = 1000;
let ahorro = 0;

alert("Tu meta es ahorrar $" + meta);

while (ahorro < meta) {
  const entrada = prompt("¿Cuánto dinero querés agregar?");

  if (entrada === null) {
    alert("Terminaste con $" + ahorro + " ahorrados.");
    break;
  }

  const monto = Number(entrada);

  if (monto > 0 && Number.isFinite(monto)) {
    ahorro = ahorro + monto;
    alert("Llevás ahorrados $" + ahorro);
  } else {
    alert("Ingresá un número mayor que cero.");
  }
}

if (ahorro >= meta) {
  alert("¡Llegaste a tu meta!");
}