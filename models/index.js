const Card = require('./card');
const List = require('./list');
const Tag = require('./tag');
const CardHasTag = require('./cardHasTag');
const sequelize = require('sequelize');

List.hasMany(Card, {
    foreignKey: 'listId',
    as: 'cards'
});

Card.hasOne(List, {
    foreignKey: 'listId',
    as: 'list'
})

Tag.belongsToMany(Card, {
    foreignKey: 'tagId',
    otherKey: 'cardId',
    as: 'cards',
    through: CardHasTag
});

Card.belongsToMany(Tag, {
    foreignKey: 'cardId',
    otherKey: 'tagId',
    as: 'tags',
    through: CardHasTag
});

sequelize.sync({
    force: true
});

module.exports = {
    Card,
    List,
    Tag,
    CardHasTag
};