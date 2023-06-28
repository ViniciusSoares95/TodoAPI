const sequelize = require('../database/connection');
const {DataTypes} = require('sequelize');
const Tarefa = require('./Tarefa');

const Usuario = sequelize.define('usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len:[8,255]
        }

    }
});

Usuario.hasMany(Tarefa, {as: 'tarefas', onDelete: 'CASCADE'})
Tarefa.belongsTo(Usuario);

sequelize.sync()
    .then(() => {
        console.log('tabela Usuario sincronizada com sucesso!')
    })
    .catch((error) => {
        console.log('Erro ao sincronizar tabela usuario:', error);
    })

module.exports = Usuario;