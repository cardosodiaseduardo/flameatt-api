'use strict'

const Mongoose = require('mongoose');

class Usuario extends Mongoose.Schema{

    constructor(){
        super({

            nome: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            senha: {
                type: String,
                required: true
            }

        });

        //Registrando a criação do model no Mongoose
        Mongoose.model('Usuario', this);
    }
}

module.exports = Usuario