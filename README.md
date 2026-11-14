# Ejercicio 10: Plataforma de encuestas con MVC

Demostración para crear y responder encuestas, analizar resultados y generar un informe visual imprimible. Cada encuesta contiene una pregunta de selección única y entre 2 y 8 opciones.

## Abrir

Extrae el ZIP, guarda 10_PlataformaDeEncuestas dentro de TallerMVC y abre index.html con Chrome o Edge. Abre la carpeta en Visual Studio Code para estudiar el código.

No requiere XAMPP, paquetes ni base de datos. Node.js solo es necesario para repetir las pruebas opcionales.

## Uso

1. Escribe una pregunta de hasta 180 caracteres.
2. Escribe entre 2 y 8 opciones, una por línea, de hasta 100 caracteres cada una. Las líneas vacías se ignoran. No se permiten opciones repetidas, aunque cambien mayúsculas o tildes.
3. Pulsa Crear encuesta. Aparecerá en Mis encuestas.
4. Selecciona una opción y pulsa Enviar respuesta.
5. Consulta el total, los votos de cada opción, sus porcentajes y la opción más elegida o el empate.
6. Puedes enviar más respuestas para simular otros participantes.
7. Selecciona otra encuesta desde la lista para responderla o consultar su informe.

## Informe visual

Los resultados aparecen como barras horizontales, acompañadas de cantidades y porcentajes. Porcentaje = votos de la opción / total de respuestas × 100. Sin respuestas, todos los valores son cero. Los porcentajes mostrados se redondean a un decimal, por lo que su suma puede diferir ligeramente de 100 %.

Imprimir / Guardar informe en PDF abre el diálogo de impresión del navegador. Selecciona Guardar como PDF si tu navegador lo ofrece. El diseño de impresión muestra solo el informe de la encuesta seleccionada, sin formularios ni lista lateral. No se descarga un PDF automáticamente. Si el navegador omite fondos de colores, los conteos y porcentajes siguen siendo legibles.

## Alcance de la demostración

Los datos se guardan en localStorage del navegador. No se recopilan respuestas de distintos dispositivos, ni se comparten entre visitantes. Esta versión no incluye cuentas, autenticación, control de una respuesta por persona ni servidor. Permite repetir respuestas deliberadamente para simular participantes del taller; el contador representa respuestas, no personas únicas.

Cada encuesta contiene una sola pregunta. No incluye edición, eliminación ni formularios de múltiples preguntas. Crear, responder, guardar y consultar resultados son las funciones de esta implementación.

Los datos permanecen al cerrar y volver a abrir el mismo navegador, perfil y origen. Borrar los datos del sitio elimina las encuestas y respuestas. Evita modo incógnito para conservarlas. La copia local y la publicada tienen almacenamiento separado. Usa una pestaña a la vez para evitar sobrescribir cambios de otra.

Si guardar falla, no se modifica el conteo en memoria. Si se detectan datos corruptos, se muestra un aviso y no se sobrescriben. No hay respaldo ni recuperación automática.

## Arquitectura MVC

| Archivo | Responsabilidad |
|---|---|
| index.html | Interfaz inicial. |
| css/estilos.css | Diseño adaptable, barras y formato de impresión. |
| js/modelo.js | Validación, encuestas, votos, almacenamiento y estadísticas. |
| js/vista.js | Formularios, lista y presentación del informe. |
| js/controlador.js | Acciones del usuario y coordinación de modelo y vista. |
| js/app.js | Inicio y conexión de componentes. |
| pruebas/modelo.test.cjs | Pruebas opcionales. |

El modelo no utiliza HTML. La vista muestra los resultados que recibe y el controlador coordina el registro de respuestas.

## Prueba manual

Crea ¿Qué lenguaje prefieres? con Java, Python y JavaScript. Registra dos respuestas para Java y una para Python. Debe mostrar 3 respuestas: Java 66,7 %, Python 33,3 % y JavaScript 0,0 %. Recarga para verificar la persistencia. Crea otra encuesta y comprueba que sus respuestas no se mezclen. Abre la vista de impresión y comprueba que incluya solo el informe seleccionado.

Prueba además una pregunta vacía, opciones repetidas, un envío sin seleccionar opción y el diseño en una pantalla pequeña.

## Verificación

Pasaron ocho pruebas: creación y persistencia; votos y porcentajes; empates; independencia entre encuestas; validaciones; respuestas inválidas; fallos al guardar; datos corruptos. También se comprobaron la sintaxis de los cuatro JavaScript y las referencias HTML.

Para repetirlas desde esta carpeta:

    node --test pruebas/modelo.test.cjs

La interfaz y el diseño de impresión requieren comprobación manual en navegador. No se realizó una prueba visual automatizada.

## Publicar

Crea el repositorio plataforma-de-encuestas-mvc y sube el CONTENIDO de esta carpeta: index.html, README.md, css, js y pruebas. index.html debe quedar en la raíz.

Activa GitHub Pages como en los anteriores: publicación desde main y /(root). Espera el despliegue y utiliza el enlace que muestre GitHub.

No se ha creado ni modificado ningún repositorio automáticamente.
