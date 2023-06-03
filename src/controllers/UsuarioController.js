const Usuario = require('../models/Usuario');

const UsuariosController = {
    async criar(req ,res) {
        try{
            //logica validação para criar uma tarefa inserindo no bd
            const {nome, email, senha} = req.body;
            const usuario = await Usuario.create({
                nome,
                email,
                senha
            })
            res.status(201).json({dados: usuario, mensagem: 'usuario criada com sucesso'});
        } catch (error) {
            console.log(error);
            res.status(500).json({mensagem: 'erro de servidor'});
        }
    },
    async update(req ,res) {
        try{
            const id = req.params.id;
            //logica validação para alterar uma tarefa inserindo no bd
            const usuario = await Usuario.findByPk(id);
            if(!usuario) {
                res.status(201).json({dados: {}, mensagem: 'Usuario não econtrada'});
            }
            const {nome, email, senha} = req.body;
            const usuarioAlterada = await usuario.update({
                nome,
                email,
                senha,
            })
            res.status(201).json({mensagem: 'usuario alterada com sucesso'});
        } catch (error) {
            res.status(500).json({mensagem: 'erro de servidor'});
        }
    },

    async listar(req ,res) {
        try{
            //logica validação para listar uma tarefa do bd
            const usuario = await Usuario.findAll({});
            if(!usuario) {
                res.status(201).json({dados: []});
            }
            res.status(201).json({dados: usuario});
        } catch (error) {
            res.status(500).json({mensagem: 'erro de servidor'});
        }
    },

    async exibir(req ,res) {
        try{
            const id = req.params.id;
            //logica validação para exibir uma tarefa pelo id do bd
            const usuario = await Usuario.findByPk(id);
            if(!usuario) {
                res.status(201).json({dados: {}, mensagem: 'usuario não econtrada'});
            }
                res.status(201).json({dados: usuario});
        } catch (error) {
            res.status(500).json({mensagem: 'erro de servidor'});
        }
    },

    async deletar(req ,res) {
        try{
            const id = req.params.id;
            //logica validação para deletar uma tarefa no bd
            const usuario = await Usuario.findByPk(id);
            if(!usuario) {
                res.status(201).json({dados: {}, mensagem: 'usuario não econtrada'});
            }
            await usuario.destroy();
            res.status(201).json({mensagem: 'usuario deletada com sucesso'});
        } catch (error) {
            res.status(500).json({mensagem: 'erro de servidor'});
        }
    },
    
}



module.exports = UsuariosController;