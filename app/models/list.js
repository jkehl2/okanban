const {
    Model,
    DataTypes
} = require("sequelize");
const sequelize = require('../database');

class List extends Model {

};


List.init({
    // name: DataTypes.TEXT,  // première version => trop simple !
    // on peut définir les propriétés de manière plus fine
    // et ainsi traiter un paquet d'erreurs, sans rien faire !
    // cf : //https://sequelize.org/master/manual/validations-and-constraints.html
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true | {
                msg: "Le nom de la carte ne peut pas être vide."
            }
        }
    },
    position: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    // le nom de la table
    tableName: "list",

    // l'instance de connexion
    sequelize
});

module.exports = List;