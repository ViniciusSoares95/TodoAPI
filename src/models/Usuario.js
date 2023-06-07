const sequelize = require('../database/connection');
const {DataTypes} = require('sequelize');

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

sequelize.sync()
    .then(() => {
        console.log('tabela Usuario sincronizada com sucesso!')
    })
    .catch((error) => {
        console.log('Erro ao sincronizar tabela usuario:', error);
    })

module.exports = Usuario;