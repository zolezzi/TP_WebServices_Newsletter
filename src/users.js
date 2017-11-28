const { mk_error_response, mk_ok_response } = require('./utils');
const mongoDb = require('mongodb');
const { sendNewsletter } = require('./newsletter');

function register (email, jsonReq) {
    if (registeredUser(email)) {
        mk_error_response("El email '" + email + "' ya está registrado.");
    } else {
        saveUser(email, jsonReq);
    }
}

function unRegister (email) {
    if (!registeredUser(email)) {
        mk_error_response("El email '" + email + "' no está registrado.");
    } else {
        deleteUser(email);
    }
}

function onDemand (email) {
    if (!registeredUser(email)) {
        mk_error_response("El email '" + email + "' no está registrado.");
    } else {
        sendNewsletter(email);
    }
}

function registeredUser(email) {
    //ToDo... crear lógica para determinar si el email ya está registrado o no
    return false;
}

function saveUser(email, jsonReq) {
    //ToDo... crear lógica para guardar un usuario, validando el jsonReq
}

function deleteUser(email) {
    //ToDo... crear lógica para eliminar un usuario
}

function getJsonReq(email) {
    //ToDo... crear lógica que, dado un email, devuelva su JsonReq
}

module.exports = {
    register,
    unRegister,
    onDemand,
    getJsonReq
}