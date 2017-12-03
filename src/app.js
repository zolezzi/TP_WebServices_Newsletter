const http = require('http');
const { register, unRegister, onDemand } = require('./users');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const hostname = '127.0.0.1';
const port = 3001;

const usersRouter = require('./users.js');


//app.use(express.static(__dirname + "/../../dist/frontend"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//app.use(usersRouter);


app.use(express.static('./src'));

app.all('*', (req, res)=>{
    res.sendFile(process.cwd()+'/index.html');
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo\n');
});

//server.listen(port, hostname, () => {
//  console.log(`Server running at http://${hostname}:${port}/`);
//});

app.listen(3001, () => console.log('SERVER RUNNING ON PORT 3000'));

