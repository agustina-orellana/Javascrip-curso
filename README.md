# Simulador de compras · Pre-entrega 9

Simulador de compras desarrollado con HTML, CSS y JavaScript. El catálogo inicial se genera a partir de un array de instancias de la clase `Producto`.

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

El catálogo se guarda en localStorage al agregar, editar, comprar, eliminar o vaciar. Al recargar se recuperan los productos y su stock, incluso si el catálogo quedó vacío. Probá desde la misma dirección en el navegador.

## Cupón simulado

Tres segundos después de abrir el simulador aparece un recordatorio. Seleccioná **Consultar cupón** para cargar y aplicar un descuento simulado del 10 %. Los precios de compra siguen usando el valor original.

Para probar el manejo de errores, vaciá el catálogo y consultá el cupón. Se muestra un mensaje y el botón vuelve a habilitarse. Agregá un producto y consultá nuevamente.

## Archivos

- `index.html` contiene el formulario y el contenedor del catálogo.
- `css/style.css` define el diseño y los estados visuales.
- `js/main.js` contiene el modelo, el renderizado y los eventos.
