const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hostname = '127.0.0.1';
const port = 3000;

const user = require("./src/models/usersModels");

var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {
  useMongoClient: true
});

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
var db = mongoose.connection;

var userDB = mongoose.model("User");

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(express.static("./src"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.all('*', (req, res)=>{
    res.sendFile(process.cwd()+'/src/index.html');
});

app.get('/', function get(req, res) {
    res.sendFile('/src/index.html');
})

function mostrarLogIn() {
    $('.log-in').slideToggle();
    $('.log-buttons').slideToggle();
}

function mostrarLogUp() {
    $('.log-up').slideToggle();
    $('.log-buttons').slideToggle();
}

function cancelarLogIn() {
    $('.log-buttons').slideToggle();
    $('.log-in').slideToggle();
}

function cancelarLogUp() {
    $('.log-buttons').slideToggle();
    $('.log-up').slideToggle();
}

function setSearchParams() {
    $('.log-up').slideToggle();
    $('.search-params').slideToggle();
}

function cancelarSearchParams() {
    $('.log-up').slideToggle();
    $('.search-params').slideToggle();
}

function finishLogUp(){
    $('.search-params').slideToggle();
    $('.logged-options').slideToggle();
}

function addCity() {
    let citiesSearcher = $('#cities-searcher')[0];
    if (citiesSearcher != undefined) {
        if ($('#cities')[0].value.length > 0) {
            $('#cities')[0].value += ".\n" + citiesSearcher.value;
        } else {
            $('#cities')[0].value = citiesSearcher.value;
        }
    }
}

function clearCities() {
    $('#cities')[0].value = "";
}

function register() {

    let error = "";

    console.log(user);
    user.findOne({ email: $('#emailReg')[0].value }, function (err, doc) {
        if (doc.email == $('#emailReg')[0].value) {
            error += "El email '"+ $('#emailReg')[0].value +
                     "' ya está registrado en el sistema. Utilice otro.\n";
        }
    });

    user.findOne({ username: $('#userReg')[0].value }, function (err, doc) {
        if (doc.email == $('#userReg')[0].value) {
            error += "El nombre de usuario '" + $('#userReg')[0].value +
                     "' ya está registrado. Intente con otro.";
        }
    });

    if(error.length > 0){
        showAlert('Datos ya registrados', error, cancelarSearchParams);
        return;
    }

    let numberValue = 1;
    let user = new User({
        email: $('#emailReg')[0].value,
        password: $('#pwdReg')[0].value,
        username: $('#userReg')[0].value,
        searchData: getSearchData()

    });

    user.save(function (err, user, numberValue) {

        if (err) {
            showAlert('Error al registrar usuario', err, cancelarSearchParams);
        } else {
            showAlert('Registro completo', 'Su cuenta ha sido registrada con éxito', finishLogUp);
        }
    });
}

function getSearchData() {
    let searchData = {};
    let cities = $('#cities')[0].value.split('.');
    searchData.add({ cities : cities });
    let regChecks = {};
    $('.reg-check').forEach(function(regCheck) {
        if(regCheck.checked){
            regChecks.add(regCheck.name);
        }
    });
    searchData.add({ regChecks : regChecks });
    return JSON.stringify(searchData);
}

function onDemand() {
    let searchData = getSearchDataOfCurrentUser();
    console.log('crear lógica para interpretar el searchData, escribir y enviar el email');
}

function deleteUser() {
    user.findOne({ email: $('#email')[0].value }, function (err, user) {
        user.remove();
        showAlert('Usuario eliminado', 'Su usuario ha sido eliminado del sistema.', finishLogDown)
    });
}

function finishLogDown(){
    $('.logged-options').slideToggle();
    $('.log-buttons').slideToggle();
}

function getSearchDataOfCurrentUser() {
    let searchData = "{}";
    User.findOne({ email: $('#email')[0].value }, function (err, user) {
        if (err) {
            showAlert('Error',
            'Ha habido un error intentando obtener sus datos de búsqueda. Vuelva a intentarlo.',
            getSearchDataOfCurrentUser)
        } else {
            user.remove();
            searchData = user.searchData;
        }
    });
    return JSON.parse(searchData);
}

function logIn() {
    User.findOne({ email: $('#email')[0].value }, function (errorEmail, user) {
        if (errorEmail) {
            User.findOne({ username: $('#email')[0].value }, function (errorName, user) {
                if (errorName) {
                    showAlert("Usuario inexistente", "No existen datos en el sistema " +
                    "asociados a la cuenta '" + $('#email')[0].value + "'.",
                    cancelarLogIn)
                } else {
                    checkPassword(user);
                }
            });
        } else {
            checkPassword(user);
        }
    });
}

function checkPassword(user) {
    if ($('#pwd')[0].value.equals(user.password)) {
        showLoggedUserOptions();
    } else {
        showAlert("Password incorrecto", "El password ingresado no corresponde al usuario '" +
        $('#email')[0].value + "'.", cancelarLogIn);
    }
}

function showLoggedUserOptions() {
    $('.log-in').slideToggle();
    $('.logged-options').slideToggle();
}

function changeSearchParams() {
    $('.logged-options').slideToggle();
    $('.log-up').slideToggle();
}

function logOut() {
    $('.log-in').slideToggle();
    $('.logged-options').slideToggle();
}

function showAlert(title, text, closeFunction){
    $('.modal-title')[0].innerText = title;
    $('.modal-text')[0].innerText = text;
    $('.modal-button')[0].onclick = closeFunction;
    $('#alert').modal()
}

module.exports = {
    mostrarLogUp, mostrarLogIn, cancelarLogIn, logIn,
    cancelarLogUp, setSearchParams, addCity, clearCities,
    cancelarSearchParams, register, logOut, changeSearchParams,
    onDemand, deleteUser
}

app.listen(port, () => console.log('SERVER RUNNING ON PORT ' + port));

