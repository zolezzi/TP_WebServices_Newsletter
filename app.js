const http = require('http');
//const { register, unRegister, onDemand } = require('./users');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const User = require("./src/models/usersModels.js").User;
const {register} = require("./src/js/users.js");

app.use(express.static("./src"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.all('*', (req, res)=>{
    res.sendFile(process.cwd()+'/src/index.html');
});

app.post("/register",function(req,res){
    User.find(function(err,doc){
        console.log(doc);
    })
    return register(req, User);
});


app.get("/", function(req,res){
    
    User.find(function(err,doc){
        console.log(doc);
    })
});

app.listen(3000, () => console.log('SERVER RUNNING ON PORT 3000'));

