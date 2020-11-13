const {
    Model,
    DataTypes
} = require("sequelize");
const sequelize = require('../database');

class Card extends Model {

};


Card.init({
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true | {
                msg: "Le titre ne peut pas être vide."
            }
        }
    },
    position: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    color: {
        type: DataTypes.TEXT,
        defaultValue: "#ffffff",
        validate: {
            notEmpty: true | {
                msg: "Une couleur doit être précisée."
            }
        }
    }
}, {
    // le nom de la table
    tableName: "card",

    // l'instance de connexion
    sequelize
});

module.exports = Card;