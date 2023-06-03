const express = require('express'); //importando framework express
//importa cors
const cors = require('cors');

//importa a instancia de conexao do sequelize
const sequelize = require('./database/connection');
const rotas = require('./routes');
//inicializa instaciar o express
const server = express();

sequelize
    .authenticate()
    .then(() => {
        console.log('conexao com mysql feita com sucesso')
    })
    .catch((error) => {
        console.log('Nao foi possivel conectar com mysql:', error);
    });

//configurar o cors
server.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'UPDATE', 'PATCH'],
        allowedHeaders: ['Content-Type']
    }
))

//trabalhar com parametros via url e json
server.use(express.urlencoded({extended: true}))
//reconhecer objetos json no corpo da requisição
server.use(express.json());
//injetar a configuração de uma rota ou seja minha
//api passa a escultar a rota
/*server.use('/api', (req, res) => {
    res.json({
        mensagem: 'api funcionando'
    })
});*/
server.use('/api', rotas); //usando arquivo de rotas
//definindo em qual porta o servidor esta rodando
server.listen(3001, () =>{
    console.log('Servidor API RestFull rodando na porta 3001');
});

module.exports = server;