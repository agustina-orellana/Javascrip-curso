# Simulador de compras · Pre-entrega 10

Repositorio público: [agustina-orellana/Javascrip-curso](https://github.com/agustina-orellana/Javascrip-curso).

Simulador con catálogo, búsqueda, presupuesto, descuento simulado, edición de productos, compras y persistencia en localStorage.

## Cómo ejecutarlo

Abrí la carpeta del proyecto en Visual Studio Code y usá **Open with Live Server** sobre index.html. También podés publicarlo con GitHub Pages. Se necesita conexión a Internet para cargar Toastify desde el CDN.

**No abrir index.html con doble clic:** fetch necesita servir el JSON mediante HTTP/HTTPS; el acceso file:// suele ser bloqueado por el navegador.

## Fuente de datos y carga

La fuente es data/productos.json: un JSON local que simula la base de datos, permitido por la consigna. Los productos ya no están definidos en un array dentro del JavaScript.

Al iniciar se consulta el archivo mediante fetch con async/await. El bloque try comprueba respuesta.ok, lee y valida el JSON y convierte los registros en instancias de Producto. Se renderizan las tarjetas mediante el renderizador del catálogo y se conserva la delegación de eventos.

Mientras carga, se muestra «Cargando productos…» y se bloquea temporalmente la interacción. catch informa los errores de red, HTTP, JSON y formato mediante Toastify y un mensaje persistente en pantalla; permite reintentar. finally siempre oculta la carga y habilita la interfaz. La consulta tiene un límite de diez segundos.

Se consulta el JSON también si hay datos guardados, pero el catálogo y las compras de localStorage tienen prioridad. Un catálogo guardado vacío sigue vacío. Si falla fetch, los datos guardados siguen disponibles. Los cambios de agregar, editar, comprar, eliminar y vaciar se guardan juntos con las compras. Una consulta no reemplaza compras ni cambios previos.

## Librería externa

[Toastify JS](https://github.com/apvarun/toastify-js) versión 1.12.0 se integra por CDN en index.html, con su CSS y su script antes de main.js. Se usa para comunicar el éxito o error de la carga, sin alert nativo. Si el CDN falla, se mantiene el mensaje en pantalla y se libera la interfaz.

## Uso del simulador

Agregá productos mediante el formulario. Buscá por nombre, filtrá por presupuesto y simulá descuentos. Las tarjetas permiten editar, eliminar o comprar una cantidad entera con stock suficiente. El resumen muestra compras, unidades y total al precio original. El descuento y el cupón son una simulación: no cambian el precio de compra.

Vaciar el catálogo solicita confirmación y conserva las compras anteriores. Consultar el cupón con el catálogo vacío muestra un error; agregar un producto permite reintentar.

## Prueba manual

1. Abrí por Live Server o GitHub Pages. En DevTools > Network activá una conexión lenta y recargá: debe verse «Cargando productos…», seguido de las tarjetas y una notificación.
2. Si ya tenías un catálogo guardado, se conserva. Para probar la fuente desde cero, usá una ventana privada y entrá a la misma URL.
3. En Network bloqueá la solicitud a productos.json y recargá: debe mostrarse una notificación de error, ocultarse la carga y aparecer Reintentar. Quitá el bloqueo y reintentá.
4. Para probar HTTP no exitoso, renombrá temporalmente el JSON, recargá y después restaurá el nombre.
5. Para probar formato inválido, cambiá temporalmente el contenido del JSON por un objeto vacío, recargá y restaurá el archivo.
6. Agregá, editá, comprá y recargá. Comprobá stock y resumen. Eliminá un producto, recargá y comprobá que no reaparece.
7. Vaciá el catálogo, recargá y verificá que continúa vacío. Consultá el cupón: debe aparecer el error y habilitarse otra vez el botón.

## Archivos para subir

- index.html
- README.md
- css/style.css
- js/main.js
- data/productos.json (carpeta nueva)

Reemplazá los archivos en sus rutas exactas. Eliminá el duplicado antiguo js/css/style.css del repositorio; subir esta versión por encima no lo elimina. Los estilos van exclusivamente en css/style.css.
