// MODELO: crea encuestas, registra votos y calcula los resultados.
class ModeloEncuestas {
 constructor(almacenamiento){
  this.almacenamiento=almacenamiento;this.clave='tallerMVC.encuestas.v1';this.encuestas=[];this.errorCarga=false;
  try{
   const datos=JSON.parse(almacenamiento.getItem(this.clave)||'[]');
   if(!Array.isArray(datos))throw new Error('Datos inválidos');
   for(const e of datos){
    if(!e||typeof e.id!=='string'||!e.id||!Array.isArray(e.opciones))throw new Error('Datos inválidos');
    this.validar(e.pregunta,e.opciones.map(o=>o.texto));
    if(!e.opciones.every(o=>Number.isSafeInteger(o.votos)&&o.votos>=0)||!Number.isSafeInteger(e.opciones.reduce((s,o)=>s+o.votos,0)))throw new Error('Conteos inválidos');
   }
   if(new Set(datos.map(e=>e.id)).size!==datos.length)throw new Error('Identificadores repetidos');
   this.encuestas=datos;
  }catch(error){this.errorCarga=true;}
 }
 normalizar(texto){return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();}
 validar(pregunta,opciones){
  if(typeof pregunta!=='string'||!pregunta.trim()||pregunta.trim().length>180)throw new Error('Escribe una pregunta de 1 a 180 caracteres.');
  if(!Array.isArray(opciones)||opciones.length<2||opciones.length>8)throw new Error('Escribe entre 2 y 8 opciones, una por línea.');
  if(!opciones.every(o=>typeof o==='string'&&o.trim()&&o.trim().length<=100))throw new Error('Cada opción debe tener entre 1 y 100 caracteres.');
  if(new Set(opciones.map(o=>this.normalizar(o))).size!==opciones.length)throw new Error('Las opciones no deben repetirse.');
  return{pregunta:pregunta.trim(),opciones:opciones.map(o=>o.trim())};
 }
 guardar(encuestas){
  if(this.errorCarga)throw new Error('No se pudieron leer las encuestas guardadas. No se sobrescribirán.');
  this.almacenamiento.setItem(this.clave,JSON.stringify(encuestas));this.encuestas=encuestas;
 }
 crear(pregunta,textoOpciones){
  const datos=this.validar(pregunta,textoOpciones.split(/\r?\n/).map(o=>o.trim()).filter(Boolean));
  let id;do{id=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);}while(this.obtener(id));
  const encuesta={id,pregunta:datos.pregunta,opciones:datos.opciones.map(texto=>({texto,votos:0}))};
  this.guardar([...this.encuestas,encuesta]);return id;
 }
 obtener(id){return this.encuestas.find(e=>e.id===id);}
 votar(id,indice){
  const e=this.obtener(id);if(!e)throw new Error('La encuesta no existe.');
  if(!Number.isInteger(indice)||indice<0||indice>=e.opciones.length)throw new Error('Selecciona una respuesta.');
  if(!Number.isSafeInteger(e.opciones.reduce((s,o)=>s+o.votos,0)+1))throw new Error('Se alcanzó el límite de respuestas.');
  const actualizada={...e,opciones:e.opciones.map((o,i)=>({...o,votos:o.votos+(i===indice?1:0)}))};
  this.guardar(this.encuestas.map(item=>item.id===id?actualizada:item));
 }
 resultados(id){
  const e=this.obtener(id);if(!e)throw new Error('La encuesta no existe.');
  const total=e.opciones.reduce((s,o)=>s+o.votos,0);
  const opciones=e.opciones.map(o=>({...o,porcentaje:total?o.votos/total*100:0}));
  const maximo=Math.max(...opciones.map(o=>o.votos));
  return{pregunta:e.pregunta,total,opciones,lideres:total?opciones.filter(o=>o.votos===maximo).map(o=>o.texto):[]};
 }
}
