const { mk_error_response, mk_ok_response } = require('./utils');
const mongoDb = require('mongodb');

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

function register(req, User) {

    User.findOne({ email: req.body.email }, function (err, docs) {
        if (doc.email == req.body.email) {

            throw Exception("El email ya existe intente con otro");

        }
    });

    User.findOne({ username: req.body.username }, function (err, docs) {
        if (doc.email == req.body.username) {

            throw Exception("El nombre usuario ya existe intente con otro");

        }
    });
    let numberValue = 1;
    let user = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        searchData: req.body.searchData

    });

    user.save(function (err, user, numberValue) {

        if (err) {
            console.log(String(err));
        }
        res.send("Se pudo registrar con existo!");
    });
}

function onDemand(email) {
    let jsonReq = JSON.parse(getJsonReq(email));
    console.log('crear lógica para interpretar el jsonReq, escribir y enviar el email');
}

function registeredUser(email) {
    console.log('crear lógica para determinar si el email ya está registrado o no');
    return false;
}

function saveUser(email, jsonReq) {
    console.log('crear lógica para guardar un usuario, validando el jsonReq');
}

function deleteUser(req, User) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log(String(err));
        } else {
            user.remove();
        }

    });
    console.log('crear lógica para eliminar un usuario');
}

function getJsonReq(email) {
    console.log('crear lógica que, dado un email, devuelva su JsonReq');
    return '{}';
}

function showLoggedUserOptions() {
    if (!registeredUser()) {
        //ToDo... corregir if
        $('.log-in').slideToggle();
        $('.logged-options').slideToggle();
    } else {

    }
}

function changeSearchParams() {
    $('.logged-options').slideToggle();
    $('.log-up').slideToggle();
}

function logOut() {
    $('.log-in').slideToggle();
    $('.logged-options').slideToggle();
}

module.exports = {
    register,
    onDemand
}
