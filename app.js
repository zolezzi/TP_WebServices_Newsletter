/* eslint-disable semi */

'use strict';


const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
//const config = require('config');
app.use(express.static('./src'));

app.all('*', (req, res)=>{
    res.sendFile(process.cwd()+'/src/index.html');
});

server.listen(process.PORT || 3000);


