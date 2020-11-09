const sequelize = require('../../DB/sequelize_client');

const {
    DataTypes,
    Model
} = require('sequelize');

/**
 * @version 1.0.0
 * @description Card class model.
 */
class Card extends Model {};

Card.init({
    title: DataTypes.STRING,
    position: DataTypes.INTEGER,
    color: DataTypes.STRING,
    listId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE    
}, {
    sequelize,
    tableName: 'card'
});

module.exports = Card;