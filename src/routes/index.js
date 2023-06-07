const express = require('express');
const TarefasController = require('../controllers/TarefasController');
const UsuariosController = require('../controllers/UsuarioController');


const router = express.Router();

router.get('/ping', (req, res) => {
    res.json({pong: true});
});

//rota para criar uma nova tarefa

router.post('/tarefas', TarefasController.criar);
router.put('/tarefas/:id',TarefasController.update);
router.get('/tarefas', TarefasController.listar);
router.get('/tarefas/:id', TarefasController.exibir);
router.delete('/tarefas/:id', TarefasController.deletar);

router.post('/login', UsuariosController.login);
router.post('/usuarios', UsuariosController.criar);
router.put('/usuarios/:id',UsuariosController.update);
router.get('/usuarios', UsuariosController.listar);
router.get('/usuarios/:id', UsuariosController.exibir);
router.delete('/usuarios/:id', UsuariosController.deletar);

module.exports = router;
