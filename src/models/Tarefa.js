const sequelize = require('../database/connection');
const {DataTypes} = require('sequelize');

const Tarefa = sequelize.define('tarefas', {
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

sequelize.sync()
    .then(() => {
        console.log('tabela tarefas sincronizada com sucesso!')
    })
    .catch((error) => {
        console.log('Erro ao sincronizar tabela:', error);
    })

module.exports = Tarefa;