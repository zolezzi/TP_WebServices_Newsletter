'use strict';

const mongoose = require('../../config/mongoose'),
      Schema = mongoose.Schema;

const schemas = {

    userSchema: new Schema({
        username: {type: String},
        password: {type: String},
        email: {type: String},
        searchData: {type: String},
    })

};

module.exports = schemas;