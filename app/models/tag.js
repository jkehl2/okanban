const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database');

class Tag extends Model {

};


Tag.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }        
    },
    color: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }        
    }
}, {
    // le nom de la table
    tableName: "tag",

    // l'instance de connexion
    sequelize
});

module.exports = Tag;