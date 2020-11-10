const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database');

class Card extends Model {

};


Card.init({
    title: DataTypes.TEXT,
    position: DataTypes.INTEGER,
    color: DataTypes.TEXT
}, {
    // le nom de la table
    tableName: "card",

    // l'instance de connexion
    sequelize
});

module.exports = Card;