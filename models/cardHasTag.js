const sequelize = require('../../DB/sequelize_client');

const {
    DataTypes,
    Model
} = require('sequelize');

/**
 * @version 1.0.0
 * @description CardHasTag class model.
 */
class CardHasTag extends Model {};

CardHasTag.init({
    cardId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    tableName: 'cardHasTag'
});

module.exports = CardHasTag;