'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/users");

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

});

user_schema.virtual("password_confirmation").get(function(){
    return this.pass_confirmation;
}).set(function(password) {
    this.pass_confirmation = password;
});

const User = mongoose.model("User", user_schema);

export default User;
//module.exports.User = User;