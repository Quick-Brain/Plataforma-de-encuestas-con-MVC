// Inicio de MVC y conexión con el almacenamiento local.
const almacenamiento={getItem(clave){return localStorage.getItem(clave);},setItem(clave,valor){localStorage.setItem(clave,valor);}};
const modelo=new ModeloEncuestas(almacenamiento);
const vista=new VistaEncuestas();
const controlador=new ControladorEncuestas(modelo,vista);
