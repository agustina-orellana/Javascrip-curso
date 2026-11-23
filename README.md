# Simulador de compras · Pre-entrega 9

Simulador de compras desarrollado con HTML, CSS y JavaScript. El catálogo inicial se genera a partir de un array de instancias de la clase `Producto`.

Repositorio público: [agustina-orellana/Javascrip-curso](https://github.com/agustina-orellana/Javascrip-curso).

## Cómo usarlo

Abrí `index.html` en tu navegador.

1. **Ver el catálogo**. Consultá el nombre, la categoría, el precio y el stock de cada producto.
2. **Agregar**. Completá el formulario y seleccioná **Agregar producto**.
3. **Eliminar**. Elegí **Eliminar** en la tarjeta del producto y confirmá o cancelá.
4. **Buscar**. Escribí parte del nombre para filtrar el catálogo.
5. **Editar**. Elegí **Editar**, modificá los datos y guardá los cambios.
6. **Comprar**. Indicá la cantidad y elegí **Comprar** para ver el total y el stock restante.
7. **Filtrar por presupuesto**. Ingresá el máximo por unidad para ver los productos disponibles dentro de ese límite.
8. **Simular un descuento**. Ingresá un porcentaje para ver el precio de referencia. La compra usa el precio original.

9. **Vaciar el catálogo**. Elegí **Vaciar catálogo** y confirmá.

El catálogo y el historial de compras se guardan juntos en `localStorage` al agregar, editar, comprar, eliminar o vaciar. Al recargar se recuperan los productos, su stock y las compras, incluso si el catálogo quedó vacío. El resumen muestra la cantidad de compras, las unidades compradas y el total acumulado al precio original. Eliminar productos o vaciar el catálogo conserva las compras anteriores. Probá desde la misma dirección en el navegador.

Se recupera automáticamente el catálogo guardado por la versión anterior. Si el navegador impide guardar, se informa el error y se cancela la operación para mantener sincronizados el stock y las compras. Los datos permanecen en ese navegador; borrar sus datos elimina la información guardada.

## Cupón simulado

Tres segundos después de abrir el simulador aparece un recordatorio que indica cuántos productos tienen stock. Si ya ingresaste un presupuesto válido, muestra cuántos están dentro de ese límite por unidad; si el catálogo está vacío, indica que hay que agregar un producto. Seleccioná **Consultar cupón** para cargar y aplicar un descuento simulado del 10 %. Los precios de compra siguen usando el valor original.

Para probar el manejo de errores, vaciá el catálogo y consultá el cupón. Se muestra un mensaje y el botón vuelve a habilitarse. Agregá un producto y consultá nuevamente.

## Comprobación manual en el navegador

1. Agregá un producto y recargá: debe seguir en el catálogo.
2. Editá su precio y stock, recargá y comprobá que se conservaron.
3. Comprá dos unidades de un producto con stock suficiente. Recargá: deben mantenerse el stock restante y el resumen de compras.
4. Eliminá un producto y recargá: no debe reaparecer.
5. Vaciá el catálogo, confirmá y recargá: debe permanecer vacío y conservar el resumen de compras.
6. Consultá el cupón con el catálogo vacío: debe aparecer «No se pudo aplicar el cupón. Agregá un producto al catálogo para consultar el cupón.» y el botón debe habilitarse nuevamente.
7. Agregá un producto y consultá otra vez: debe aparecer el cupón AHORRO10.
8. Recargá, ingresá un presupuesto antes de los tres segundos y comprobá el mensaje del recordatorio.

## Actualizar el repositorio

Reemplazá `index.html`, `README.md`, `css/style.css` y `js/main.js` por los archivos de esta versión. Eliminá además el archivo antiguo `js/css/style.css` y su directorio vacío: copiar los archivos nuevos por encima no elimina ese archivo del repositorio.

## Archivos

- `index.html` contiene el formulario y el contenedor del catálogo.
- `css/style.css` define el diseño y los estados visuales.
- `js/main.js` contiene el modelo, el renderizado y los eventos.
