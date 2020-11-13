const {
    Model,
    DataTypes
} = require("sequelize");
const sequelize = require('../database');

class Tag extends Model {

};


Tag.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true | {
                msg: "Le nom du tag ne peut pas être vide."
            }
        }
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
    tableName: "tag",

    // l'instance de connexion
    sequelize
});

module.exports = Tag;