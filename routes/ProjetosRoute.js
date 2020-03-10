'use strict'


const Projeto = require('../models/Projeto')
const ProjetoController = require('../controllers/ProjetoController')

class ProjetoRoute{

    constructor(app){
        app.route('/projetos')
            .get(ProjetoController.buscarTodosOsProjetosDeTodosUsuarios)
            .post(ProjetoController.adicionarProjeto)
            .delete(ProjetoController.deletarProjeto)
            
        app.route('/deleteprojeto')
            .post(ProjetoController.deletarProjeto)
            
        app.route('/projetosid')
            .get(ProjetoController.buscarProjetosPorIdDoUsuario)
            .post(ProjetoController.buscarProjetosPorIdDoUsuarioMetodo2)
            
        app.route('/projetoid')
            .post(ProjetoController.buscarProjetoEspecifico)
            .put(ProjetoController.editarDadosDoProjeto)

        app.route('/projetoquadrodeareasedit')
            .post(ProjetoController.editarItemNoQuadroDeAreas)
        
        app.route('/projetoquadrodeareasdel')
            .post(ProjetoController.deletarItemNoQuadroDeAreas)
        
        app.route('/projetoquadrodeareasadd')
            .post(ProjetoController.salvarItemNoQuadroDeAreas)
    }   

}

module.exports = ProjetoRoute