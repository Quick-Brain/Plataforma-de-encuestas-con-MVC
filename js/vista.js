// VISTA: formularios, lista de encuestas y gráfico de barras con valores exactos.
class VistaEncuestas {
 constructor(){
  for(const id of ['crear','pregunta','opciones','mensaje','encuestas','seleccion','responder','respuestas','total','resumen','barras','imprimir'])this[id]=document.getElementById(id);
  this.sinEncuestas=document.getElementById('sin-encuestas');this.sinSeleccion=document.getElementById('sin-seleccion');
  this.preguntaActiva=document.getElementById('pregunta-activa');this.tituloInforme=document.getElementById('titulo-informe');
  this.mensajeRespuesta=document.getElementById('mensaje-respuesta');
 }
 avisar(texto){this.mensaje.textContent=texto;}
 listar(encuestas,actual){
  this.encuestas.replaceChildren();this.sinEncuestas.hidden=encuestas.length>0;
  encuestas.forEach(e=>{
   const li=document.createElement('li'),b=document.createElement('button');b.type='button';b.dataset.id=e.id;b.textContent=e.pregunta;b.setAttribute('aria-pressed',String(e.id===actual));
   li.append(b);this.encuestas.append(li);
  });
 }
 abrir(encuesta){
  this.sinSeleccion.hidden=true;this.seleccion.hidden=false;this.preguntaActiva.textContent=encuesta.pregunta;
  this.respuestas.replaceChildren();const leyenda=document.createElement('legend');leyenda.textContent='Elige una respuesta';this.respuestas.append(leyenda);
  encuesta.opciones.forEach((opcion,i)=>{
   const label=document.createElement('label'),radio=document.createElement('input'),texto=document.createElement('span');
   radio.type='radio';radio.name='opcion';radio.value=i;radio.required=true;texto.textContent=opcion.texto;
   label.append(radio,texto);this.respuestas.append(label);
  });
  this.mensajeRespuesta.textContent='';
 }
 mostrarResultados(datos){
  this.tituloInforme.textContent=datos.pregunta;this.total.textContent=`Total: ${datos.total} respuesta(s)`;
  this.resumen.textContent=datos.total===0?'Aún no hay respuestas.':datos.lideres.length===1?`Opción más elegida: ${datos.lideres[0]}.`:`Empate entre: ${datos.lideres.join(' · ')}.`;
  this.barras.replaceChildren();
  datos.opciones.forEach(o=>{
   const fila=document.createElement('div');fila.className='fila-barra';
   const cabecera=document.createElement('div');cabecera.className='etiqueta-barra';
   const texto=document.createElement('span');texto.textContent=o.texto;
   const valor=document.createElement('strong');valor.textContent=`${o.votos} · ${o.porcentaje.toFixed(1).replace('.',',')} %`;
   cabecera.append(texto,valor);
   const fondo=document.createElement('div');fondo.className='fondo-barra';fondo.setAttribute('aria-hidden','true');
   const barra=document.createElement('div');barra.className='barra';barra.style.width=o.porcentaje+'%';fondo.append(barra);
   fila.append(cabecera,fondo);this.barras.append(fila);
  });
 }
}
