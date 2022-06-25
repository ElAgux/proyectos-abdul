const http = require('http');
const fs = require('fs');

const mime = {
  'html': 'text/html',
  'css': 'text/css',
  'jpg': 'image/jpg',
  'ico': 'image/x-icon',
  'mp3': 'audio/mpeg3',
  'mp4': 'video/mp4'
}

const servidor = http.createServer((pedido, respuesta) => {
  const url = new URL('http://localhost:8888' + pedido.url)
  let camino = 'public' + url.pathname
  if (camino == 'public/')
    camino = 'public/index.html'
  encaminar(pedido, respuesta, camino)
})

servidor.listen(8888);


function encaminar(pedido, respuesta, camino) {
  
  switch (camino) {
    case 'public/recuperardatos': {
      recuperar(pedido, respuesta);
      break;
    }
    default: {
      fs.stat(camino, error => {
        if (!error) {
          fs.readFile(camino, (error, contenido) => {
            if (error) {
              respuesta.writeHead(500, { 'Content-Type': 'text/plain' })
              respuesta.write('Error interno')
              respuesta.end()
            } else {
              const vec = camino.split('.')
              const extension = vec[vec.length - 1]
              const mimearchivo = mime[extension]
              respuesta.writeHead(200, { 'Content-Type': mimearchivo })
              respuesta.write(contenido)
              respuesta.end()
            }
          })
        } else {
          respuesta.writeHead(404, { 'Content-Type': 'text/html' })
          respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>')
          respuesta.end()
        }
      })
    }
  }
}


function recuperar(pedido, respuesta) {
 let info= ''
  pedido.on('data', datosparciales =>{
    info += datosparciales; 
  })

  pedido.on('end', () => {
   const numfilas = new URLSearchParams(info)
   
    respuesta.writeHead(200, { 'Content-Type': 'text/html' })
  
   
   const pagina = 
 
      `<!doctype html>
      <html>
      <head></head>
      <body>
      <div>
      ${dibujar(numfilas.get('nfilas'))}
      </div>
      </body>
      </html>`
      respuesta.end(pagina); 
    });
}

function dibujar(numUser){
//console.log(numfilas)
let re="";
var numRandom = Math.round(Math.random() * (2 - 0) + 0);
let numL;
let numU;
if(numUser == 0 & numRandom == 1){
re="Pierdes"
}
if(numUser == 0 & numRandom == 2){
re="Ganas"
}
if(numUser == 1 & numRandom == 0){
re="Ganas"
}
if(numUser == 1 & numRandom == 2){
re="Pierdes"
}
if(numUser == 2 & numRandom == 1){
re="Ganas"
}
if(numUser == 2 & numRandom == 0){
re="Pierdes"
}    
if(numUser == numRandom){
re="Empate"
}

switch(numRandom){
  case 0 : numL ="PIEDRA";break;
  case 1 : numL ="PAPEL";break;
  case 2 : numL ="TIJERA";break; 
}

switch(numUser){
  case '0' : numU ="PIEDRA";break;
  case '1' : numU ="PAPEL";break;
  case '2' : numU ="TIJERA";break; 
}
return re=re+" ,la maquina eligio "+numL+" tu elegiste "+numU;

};

console.log('Servidor web iniciado')
