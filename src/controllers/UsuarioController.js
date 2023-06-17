require('dotenv').config();

const Usuario = require('../models/Usuario');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const UsuariosController = {
    async criar(req ,res) {
        try{
            //logica validação para criar uma tarefa inserindo no bd
            const {nome, email, senha} = req.body;
            const existeUsuario = await Usuario.findOne({where: {email}});
            if(existeUsuario) {
                return res.status(409).json({message: 'Email já cadastrado!'})
            }
            const hashedPassword = await bcrypt.hash(senha, 10);
            const usuario = await Usuario.create({
                nome,
                email,
                senha: hashedPassword
            })
            res.status(201).json({usuario});
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

    async login(req, res) {
        try {
            console.log(req.body);
            const {email, senha} = req.body;
            const usuario = await Usuario.findOne({where: {email}});
            if (!usuario) {
                return res.status(401).json({message: 'Usuario não encontrado!'})
            }
            const match = await bcrypt.compare(senha, usuario.senha);
            if(!match) {
                return res.status(401).json({message: 'usuario ou senha invalida!'});
            }
            //controlar a autenticação
            const token = jwt.sign({usuarioId: usuario.id}, secretKey, {expiresIn: '3h'});
            return res.json({token});
        } catch (error) {

        }
    }
    
}



module.exports = UsuariosController;