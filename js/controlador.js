// CONTROLADOR: conecta creación, respuestas y consulta del informe.
class ControladorEncuestas {
 constructor(modelo,vista){
  this.modelo=modelo;this.vista=vista;this.actual=null;
  vista.listar(modelo.encuestas,null);if(modelo.encuestas.length)this.abrir(modelo.encuestas[0].id);
  if(modelo.errorCarga)vista.avisar('No se pudieron leer las encuestas. No se sobrescribirán los datos guardados.');
  vista.crear.addEventListener('submit',evento=>{
   evento.preventDefault();try{const id=modelo.crear(vista.pregunta.value,vista.opciones.value);vista.crear.reset();this.abrir(id);vista.avisar('Encuesta creada y guardada.');}catch(error){this.error(error);}
  });
  vista.encuestas.addEventListener('click',evento=>{const b=evento.target.closest('button[data-id]');if(b)this.abrir(b.dataset.id);});
  vista.responder.addEventListener('submit',evento=>{
   evento.preventDefault();const opcion=vista.respuestas.querySelector('input:checked');
   if(!opcion){vista.mensajeRespuesta.textContent='Selecciona una respuesta.';return;}
   try{modelo.votar(this.actual,Number(opcion.value));vista.responder.reset();vista.mostrarResultados(modelo.resultados(this.actual));vista.mensajeRespuesta.textContent='Respuesta registrada. Puedes simular otro participante.';}
   catch(error){vista.mensajeRespuesta.textContent=this.textoError(error);}
  });
  vista.imprimir.addEventListener('click',()=>window.print());
 }
 abrir(id){const e=this.modelo.obtener(id);if(!e)return;this.actual=id;this.vista.listar(this.modelo.encuestas,id);this.vista.abrir(e);this.vista.mostrarResultados(this.modelo.resultados(id));}
 textoError(error){return error.name==='QuotaExceededError'||error.name==='SecurityError'?'No se pudo guardar. Revisa el espacio y los permisos del navegador.':error.message;}
 error(error){this.vista.avisar(this.textoError(error));}
}
