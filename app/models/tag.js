const sequelize = require('../DB/sequelize_client');

const {
    DataTypes,
    Model
} = require('sequelize');

/**
 * @version 1.0.0
 * @description Tag class model.
 */
class Tag extends Model {};

Tag.init({
    name: DataTypes.STRING,
    color: DataTypes.STRING
}, {
    sequelize,
    tableName: 'tag'
});

module.exports = Tag;