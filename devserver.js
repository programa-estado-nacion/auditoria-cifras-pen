/* Servidor HTTPS estático mínimo para desarrollo/sideload local del add-in.
 * Sirve ./src en https://localhost:3000 con el certificado de office-addin-dev-certs.
 * Si ya hay un servidor activo en el puerto, sale con un mensaje amable.
 * Uso:  npm install  &&  npm start
 */
const https = require('https');
const fs = require('fs');
const path = require('path');
const devCerts = require('office-addin-dev-certs');

const ROOT = path.join(__dirname, 'src');
const PORT = 3000;
const MIME = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css',
  '.png':'image/png', '.json':'application/json', '.svg':'image/svg+xml' };

const handler = (req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/taskpane.html';
  const file = path.join(ROOT, path.normalize(p));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('No encontrado'); }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
};

devCerts.getHttpsServerOptions().then((options) => {
  const server = https.createServer(options, handler);
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log('');
      console.log('  ✔ El servidor YA estaba corriendo en https://localhost:' + PORT + '.');
      console.log('    No hace falta arrancar otro. Puede usar Word con normalidad.');
      console.log('    (Puede cerrar esta ventana.)');
      process.exit(0);
    }
    console.error('Error del servidor:', err);
    process.exit(1);
  });
  server.listen(PORT, () => console.log('Add-in servido en https://localhost:' + PORT));
}).catch((e) => { console.error('No se pudo iniciar HTTPS:', e); process.exit(1); });
