'use strict';
// Creates the signing key pair for your update catalog. Run once:
//   node keygen.js
// keys/private.pem signs catalogs. Keep it secret and backed up, and never upload it.
// The public key is copied into the frame, which then trusts only catalogs you signed.
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const dir=path.join(__dirname,'keys'), priv=path.join(dir,'private.pem');
const frameKey=path.join(__dirname,'..','frame','trusted-key.pem');
if(fs.existsSync(priv)){console.error('keys/private.pem already exists. Delete it first if you really want a new key; frames that trust the old key will then need the new public key.');process.exit(1)}
const {publicKey,privateKey}=crypto.generateKeyPairSync('ed25519');
fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(priv,privateKey.export({type:'pkcs8',format:'pem'}),{mode:0o600});
const pub=publicKey.export({type:'spki',format:'pem'});
fs.writeFileSync(path.join(dir,'public.pem'),pub);
fs.writeFileSync(frameKey,pub);
console.log('Created keys/private.pem (secret) and keys/public.pem.');
console.log('Copied the public key to frame/trusted-key.pem.');
