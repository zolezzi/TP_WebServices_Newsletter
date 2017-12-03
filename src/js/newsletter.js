const { getJsonReq } = require('./users');

function sendNewsletter (email) {
    let jsonReq = JSON.parse(getJsonReq(email));
    //ToDo... crear lógica para interpretar el jsonReq, escribir y enviar el email
}

module.exports = {
    sendNewsletter
}