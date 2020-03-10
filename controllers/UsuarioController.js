'use strict'

const Mongoose =  require('mongoose')
const Usuario =  Mongoose.model('Usuario')


class UsuarioController{

    static async buscarTodos(req, res){
        try{
            res.json(await Usuario.find({}))
        }catch(error){
            res.status(500).send("Erro ao buscar usuarios!")
        }
    }

    static async buscarUsuarioComId(req, res){
        try{
            let _id = req.body._id
            let usuarioEncontrado = await Usuario.findOne({_id})
            res.status(200).send(usuarioEncontrado)
        } catch(error){
            res.status(500).send("Erro ao buscar usuario com id especificado!")
        }
            
    }

    static async autenticar(req, res){
        try{
            let email = req.body.email
            let senha = req.body.senha

            let existeUsuario = await Usuario.findOne({ email, senha });
            
            if(existeUsuario == null){
                res.send("Usuário não encontrado")
            } else {
                res.status(200).send(existeUsuario)
            }

        }catch(error){
            console.log(error)
            res.status(500).send("Erro na autenticação!")
        }
    }

    static async autenticarNoLocalStorage(req, res){
        try{
            let email = req.body.email
            
            console.log("objetoRecebido tem isso no .email: " + email)

            let existeUsuario = await Usuario.findOne( { email } );
            
            if(existeUsuario == null){
                res.send("Usuário não encontrado")
            } else {
                res.status(200).send(existeUsuario)
            }

        }catch(error){
            console.log(error)
            res.status(500).send("Erro na autenticação!")
        }
    }

    static async adicionar(req, res){
        try{
            console.log("USUARIO: " + JSON.stringify(req.body))
            let resultado = await Usuario.create(req.body)
            console.log("RESULTADO: " + resultado)
            res.status(200).json(resultado)
        } catch(error){
            console.log("Erro ao salvar usuário: " + error)
            res.status(500).send("Erro ao adicionar usuario!")
        }
    }

    static async deletar(req, res){
        try{
            let idDeletar = req.body._id
            let resultado = await Usuario.findByIdAndDelete(req.body)
            res.status(200).json(resultado)
        } catch(error){
            res.status(500).send("Erro ao deletar usuario!")
        }
    }

    static async editar(req, res){
        try{
            let resultado = await Usuario.findByIdAndUpdate(req.body._id, req.body)
            res.status(200).json(resultado)
        }catch(error){
            res.status(500).send("Erro ao editar usuario!")
        }
    }
}

module.exports = UsuarioController