const Usuario = require('../models/Usuario')
const UsuarioController = require('../controllers/UsuarioController')

class UsuariosRoute {
    constructor(app) {

        app.route('/usuarios')
            .get(UsuarioController.buscarTodos)
            .post(UsuarioController.adicionar)
            .delete(UsuarioController.deletar)

        app.route('/autenticar')
            .post(UsuarioController.autenticar)
        

        app.route('/usuarioid')
            .post(UsuarioController.buscarUsuarioComId)

        app.route('/usuariosedit')
            .post(UsuarioController.editar)
    }
}

module.exports = UsuariosRoute