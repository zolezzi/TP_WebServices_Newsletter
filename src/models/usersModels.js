'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const email_match = [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Coloca un mail valido"]

const user_schema = new Schema({
    
    username: {type: String, required: true, maxlength: [50, "Username debe ser menor a 50 caracteres"]},
    password: {
        type: String, 
        required: true, 
        minlength: [8, "password debe tener al menos 8 caracteres"],
        validate: {
            validator: function (value){
                return this.pass_confirmation == value;
            },
            message: "Las contraseñas no son iguales"
        }
    },
    email: {type: String, required: "El e-mail es obligatorio", match:email_match},
    searchData: {type: String},

}, { collection: 'user' });

user_schema.virtual("password_confirmation").get(function(){
    return this.pass_confirmation;
}).set(function(password) {
    this.pass_confirmation = password;
});

module.exports = mongoose.model("User", user_schema, 'user');
//module.exports = mongoose.model("User", user_schema);


