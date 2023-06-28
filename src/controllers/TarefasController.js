const Tarefa = require('../models/Tarefa');
const moment = require('moment');
const TarefasController = {
    async criar(req ,res) {
        try{
            //logica validação para criar uma tarefa inserindo no bd
            const {descricao, data, hora} = req.body;
            const {usuarioId} = req.query;
            //validação e formatação da data para evitar erros
            const formatData = moment(data, 'DD/MM/YYYY'). toDate();
            const dateMysql = formatData.toISOString(). slice(0,10);
            const tarefa = await Tarefa.create({
                descricao,
                data: dateMysql,
                hora,
                usuarioId
            })
            res.status(201).json(tarefa);
        } catch (error) {
            console.log(error);
            res.status(500).json({mensagem: 'erro de servidor'});
        }
    },
    async update(req ,res) {
        try{
            const id = req.params.id;
            //logica validação para alterar uma tarefa inserindo no bd
            const tarefa = await Tarefa.findByPk(id);
            if(!tarefa) {
                res.status(201).json({dados: {}, mensagem: 'tarefa não econtrada'});
            }
            const {descricao, data, hora, status} = req.body;
            const tarefaAlterada = await tarefa.update({
                descricao,
                data,
                hora,
                status
            })
            res.status(201).json(tarefaAlterada);
        } catch (error) {
            res.status(500).json({mensagem: 'erro de servidor'});
        }
    },

    async listar(req ,res) {
        try{
            //logica validação para listar uma tarefa do bd
            const {usuarioId} = req.query;
            const tarefas = await Tarefa.findAll({
                where: {usuarioId},
                order:[['data', 'asc']]
            });
            if(!tarefas) {
                res.status(201).json([]);
            }
            res.status(201).json(tarefas);
        } catch (error) {
            res.status(500).json({mensagem: 'erro de servidor'});
        }
    },

    async exibir(req ,res) {
        try{
            /*const id = req.params.id;*/
            const {index} = req.params;
            //logica validação para exibir uma tarefa pelo id do bd
            const tarefa = await Tarefa.findByPk(index);
            if(!tarefa) {
                res.status(201).json({dados: {}, mensagem: 'tarefa não econtrada'});
            }
                res.status(201).json(tarefa);
        } catch (error) {
            res.status(500).json({mensagem: 'erro de servidor'});
        }
    },

    async deletar(req ,res) {
        try{
            const id = req.params.id;
            //logica validação para deletar uma tarefa no bd
            const tarefa = await Tarefa.findByPk(id);
            if(!tarefa) {
                res.status(201).json({dados: {}, mensagem: 'tarefa não econtrada'});
            }
            await tarefa.destroy();
            res.status(201).json({mensagem: 'tarefa deletada com sucesso'});
        } catch (error) {
            res.status(500).json({mensagem: 'erro de servidor'});
        }
    },
    
}



module.exports = TarefasController;