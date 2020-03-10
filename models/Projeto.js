'use strict'

const Mongoose = require('mongoose')

class Projeto extends Mongoose.Schema {
    
    constructor(){

        super({

            usuario: {
                type: Object,
                require: true
            },

            nome: {
                type: String
            },

            descricao: {
                type: String
            },

            pessoaFisica: {
                type: Object
            },

            pessoaJuridica: {
                type: Object
            },

            edificacao: {
                type: Object
            },

            dadosDaEdificacao: {
                type: Object
            },

            quadroDeAreas: {
                type: Array
            }
        
        });

        //Registrando a criação do model no Mongoose
        Mongoose.model('Projeto', this);

    }

}

module.exports = Projeto