const http = require('http');
//const { register, unRegister, onDemand } = require('./users');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hostname = '127.0.0.1';
const port = 3000;


app.use(express.static("./src"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.all('*', (req, res)=>{
    res.sendFile(process.cwd()+'/index.html');
});

console.log(User.find());

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo\n');
});

app.listen(3000, () => console.log('SERVER RUNNING ON PORT 3000'));

