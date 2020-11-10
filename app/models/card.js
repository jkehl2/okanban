const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database');

class Card extends Model {

};


Card.init({
    title: DataTypes.TEXT,
    position: DataTypes.INTEGER
}, {
    // le nom de la table
    tableName: "card",

    // l'instance de connexion
    sequelize
});

module.exports = Card;