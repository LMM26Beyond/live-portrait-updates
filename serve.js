'use strict';
// A stand-in for your real update server, for testing on your own computer.
// In production, upload catalog.json and packs/ to any static host with HTTPS
// (GitHub Pages, Netlify, Cloudflare Pages, S3) and allow cross-origin requests.
const http=require('http'),fs=require('fs'),path=require('path');
const PORT=Number(process.env.PORT)||8090;
const TYPES={'.json':'application/json','.js':'text/javascript; charset=utf-8'};
http.createServer((req,res)=>{
  const p=decodeURIComponent(new URL(req.url,'http://x').pathname);
  const file=path.normalize(path.join(__dirname,p));
  const ok=(p==='/catalog.json'||p.startsWith('/packs/'))&&file.startsWith(__dirname+path.sep);
  fs.readFile(ok?file:'',(err,buf)=>{
    res.setHeader('access-control-allow-origin','*'); // phones fetch from the frame's page, a different origin
    if(err){res.writeHead(404);res.end('Not found');return}
    res.writeHead(200,{'content-type':TYPES[path.extname(file)]||'application/octet-stream','cache-control':'no-cache'});res.end(buf);
  });
}).listen(PORT,()=>console.log(`Update server: http://localhost:${PORT}/catalog.json`));
