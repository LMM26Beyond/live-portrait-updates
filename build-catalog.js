'use strict';
// Builds catalog.json from scenes.json and signs it. Run after changing any pack:
//   node build-catalog.js
// Each pack gets a SHA-256 fingerprint, and the whole list is signed with keys/private.pem,
// so a frame installs only packs you published, exactly as you published them.
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const keyFile=path.join(__dirname,'keys','private.pem');
if(!fs.existsSync(keyFile)){console.error('No signing key yet. Run: node keygen.js');process.exit(1)}
const scenes=JSON.parse(fs.readFileSync(path.join(__dirname,'scenes.json'),'utf8')).map(s=>({
  ...s,sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,s.file))).digest('hex')}));
// The signature covers these exact bytes, so frames verify the string before parsing it.
const payload=JSON.stringify({updated:new Date().toISOString(),scenes});
const signature=crypto.sign(null,Buffer.from(payload),crypto.createPrivateKey(fs.readFileSync(keyFile))).toString('base64');
fs.writeFileSync(path.join(__dirname,'catalog.json'),JSON.stringify({payload,signature},null,2));
console.log(`catalog.json lists ${scenes.length} signed scene pack${scenes.length===1?'':'s'}.`);
