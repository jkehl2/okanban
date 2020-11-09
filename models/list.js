const sequelize = require('../../DB/sequelize_client');

const {
    DataTypes,
    Model
} = require('sequelize');

/**
 * @version 1.0.0
 * @description List class model.
 */
class List extends Model {};

List.init({
    name: DataTypes.STRING,
    position: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    sequelize,
    tableName: 'list'
});

module.exports = List;