const http = require('http');
const { register, unRegister, onDemand } = require('./users');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hostname = '127.0.0.1';
const port = 3001;
const User = require("./models/userModels.js").User;

app.use(express.static("./src"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.all('*', (req, res)=>{
    res.sendFile(process.cwd()+'/index.html');
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo\n');
});

app.listen(3001, () => console.log('SERVER RUNNING ON PORT 3000'));

