let mensaje = prompt("¿Cuál es tu nombre?");
const edad = parseInt(prompt("¿Cuántos años tienes?"), 10);
const añoActual = parseInt(prompt("¿En qué año estamos?"), 10);


mensaje = "Hola " + mensaje +
  ", naciste aproximadamente en el año " + (añoActual - edad) + ".";

alert(mensaje);
