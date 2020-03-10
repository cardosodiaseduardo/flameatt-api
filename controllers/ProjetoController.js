'use strict'

const Mongoose = require('mongoose')
const Projeto = Mongoose.model('Projeto')
const Usuario = Mongoose.model('Usuario')
Mongoose.set('useFindAndModify', false)

class ProjetosController{

    static async buscarTodosOsProjetosDeTodosUsuarios(req, res){
        try{
            res.json(await Projeto.find({}))
        }
        
        catch(error){
            res.status(500).send("Erro ao buscar Projetos!")
        }

    }

    static async buscarProjetosPorIdDoUsuario(req, res){
        try{
            console.log("chamou da api a função buscarProjetosPorIdDoUsuario com o seguinte body de requisição: " + JSON.stringify(req.body))
            let usuarioProcurado = req.body._id
            let todosOsProjetos = await Projeto.find({})
            let projetosEncontrados = []

            for (let i = 0; i < todosOsProjetos.length; i++){
                if ( usuarioProcurado == todosOsProjetos[i].usuario._id) {
                    projetosEncontrados.push(todosOsProjetos[i])
                }

            }
            res.status(500).send(projetosEncontrados)
        }
        
        catch(error){
            res.status(400).send("Erro ao buscar os Projetos do Usuario informado!")
        }

    }

    static async buscarProjetosPorIdDoUsuarioMetodo2(req, res){
        try{
            let usuarioProcurado = req.body._id
            let todosOsProjetos = await Projeto.find({})
            let projetosEncontrados = []
            
            for (let i = 0; i < todosOsProjetos.length; i++){
                if ( usuarioProcurado == todosOsProjetos[i].usuario._id) {
                    projetosEncontrados.push(todosOsProjetos[i])
                }
                
            }
            res.json(projetosEncontrados)
        }
        
        catch(error){
            res.status(400).send("Erro ao buscar os Projetos do Usuario informado!")
        }
    }    

    static async adicionarProjeto(req, res){
        try{
            let projetoNovo = req.body
            let _id = req.body.usuario
            let usuarioCompleto = await Usuario.findOne({ _id })
            let projetoAserSalvo = ''

            projetoNovo.usuario = usuarioCompleto

            if(projetoNovo != undefined && projetoNovo != null && projetoNovo != {}){
                projetoAserSalvo = projetoNovo
            }
            
            let adicionarProjeto = await Projeto.create(projetoAserSalvo)
            
            res.status(200).send(adicionarProjeto)
        }
        
        catch(error){
            console.log(error)
            res.status(500).send("Erro interno, não foi possível adicionar o projeto, tente novamente ou contate o administrador do site")
        }
    
    }
    
    static async deletarProjeto(req, res){
        try{
            let resultado = await Projeto.findByIdAndDelete(req.body._id)
            res.json(resultado)
        } catch(error){
            res.status(500).send("Erro ao deletar projeto!")
        }
    }

    static async editarDadosDoProjeto(req, res){
        try{
            if(req.body._id != undefined && req.body._id != "" && req.body._id != null){
                let projetoEditado = await Projeto.findByIdAndUpdate({"_id": req.body._id}, req.body)
                res.status(200).json(projetoEditado)
            } else {
                res.status(200).send("Não foi possível editar o projeto, verificar erro!")
            }
        } catch(error){
            res.status(500).send("Erro ao editar projeto!")
        }
    }

    static async salvarItemNoQuadroDeAreas(req, res){
        try{
            let usuario = {}
            let projeto = {}
            let idDoUsuario = req.body.usuario._id
            let idDoProjeto = req.body._id
            
            usuario = await Usuario.findById({"_id": idDoUsuario})
            projeto = await Projeto.findById({"_id": idDoProjeto})
    
            let quadroDeAreasDoProjeto = projeto.quadroDeAreas
    
            quadroDeAreasDoProjeto.push(req.body.quadroDeAreas[0])
    
            projeto.quadroDeAreas = quadroDeAreasDoProjeto
    
            // console.log("Me mostra o projeto como está neste momento antes de ir pro model do projeto e ser salvo: " + JSON.stringify(projeto))
            
            await Projeto.findByIdAndUpdate({"_id": projeto._id}, projeto)

            let projetoEditadoComNovoItemNoQuadroDeAreas = await Projeto.findById({"_id": req.body._id})
            
            // console.log("Me mostra como está o projetoEditadoOQuardoDeAreas neste momento: " + JSON.stringify(projetoEditadoOQuadroDeAreas))

            res.status(200).json(projetoEditadoComNovoItemNoQuadroDeAreas)

        } catch(error){
            res.status(500).send("Erro ao adicionar item no quadro de áreas do prjeto!")
        }

    }

    static async editarItemNoQuadroDeAreas(req, res){
        console.log(JSON.stringify(req.body))
        // try{
        //     if(req.body._id != undefined && req.body._id != "" && req.body._id != null && req.body._id != {} && req.body._id != []){
        //         let projetoTodo = await Projeto.findById({"_id": req.body._id})

        //         let projetoComQuadroDeAreasEditado = await Projeto.findByIdAndUpdate({"_id": req.body._id}, req.body)
        //         res.status(200).json(projetoComQuadroDeAreasEditado)
        //     }
        // } catch (error){
        //     res.status(500).send("Erro ao editar o quadro de áreas!")
        // }
    }

    static async deletarItemNoQuadroDeAreas(req, res){
        try{
            let projeto = await Projeto.findById({"_id": req.body._id})
            let novoQuadroDeAreas = []
            novoQuadroDeAreas = projeto.quadroDeAreas
            
            
            for(let i = 0; i < novoQuadroDeAreas.length; i++){
                if(novoQuadroDeAreas[i].edificacaoNova = req.body.itemAdeletar.edificacaoNova){
                    novoQuadroDeAreas.splice(i, 1)
                    let projetoEditadoFinalizado = {}
                    let quadroDeAreas = []
                    let projetoComQuadroDeAreasEditado = {}
                    
                    quadroDeAreas = novoQuadroDeAreas
                    projetoComQuadroDeAreasEditado._id = req.body._id
                    projetoComQuadroDeAreasEditado.quadroDeAreas = quadroDeAreas
                    
                    projetoEditadoFinalizado = await Projeto.findByIdAndUpdate({"_id": projetoComQuadroDeAreasEditado._id}, projetoComQuadroDeAreasEditado)
                    return projetoEditadoFinalizado
                }
            }
            
            res.status(200).send("Item deletado com sucesso!")

        }catch(error){
            console.log(error)
            res.status(500).send("Erro ao deletar item no quadro de áreas")
        }
    }

    static async buscarProjetoEspecifico(req, res){
        try{
            let _id = req.body._id
            let projetoBuscado = await Projeto.findById( _id )
            res.json(projetoBuscado)
        } catch (error){
            res.status(500).send("Erro ao buscar o projeto específico!")
        }
    }

}

module.exports = ProjetosController