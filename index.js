const express = require('express');
const fs = require('fs');
const zlib = require('zlib');
const status = require('express-status-monitor')

const app = express();

app.use(status());

fs.createReadStream('./simple.txt').pipe(zlib.createGzip().pipe(fs.createWriteStream(('./simple.zip'))))

app.get("/",(req,res)=>{
    const stream = fs.createReadStream('./simple.txt', 'utf-8');
    stream.on('data',(chunk)=>res.write(chunk));
    stream.on('end', ()=>res.end());
});

app.listen(8008,()=>{
    console.log("Server at http://localhost:8008/");
})