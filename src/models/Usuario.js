const sequelize = require('../database/connection');
const {DataTypes} = require('sequelize');

const Usuario = sequelize.define('usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

sequelize.sync()
    .then(() => {
        console.log('tabela Usuario sincronizada com sucesso!')
    })
    .catch((error) => {
        console.log('Erro ao sincronizar tabela usuario:', error);
    })

module.exports = Usuario;