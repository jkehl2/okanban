const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database');

class Card extends Model {

};


Card.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }        
    },
    position: DataTypes.INTEGER,
    color: DataTypes.TEXT
}, {
    // le nom de la table
    tableName: "card",

    // l'instance de connexion
    sequelize
});

module.exports = Card;