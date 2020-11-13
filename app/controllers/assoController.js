const {
    Card,
    Tag
} = require('../models');

const assoController = {
    associate: async (req, res, next) => {
        const cardId = parseInt(req.params.cardId, 10);
        const card = await Card.findByPk(cardId);
        if (card) {
            const tagId = parseInt(req.params.tagId, 10);
            const tag = await Tag.findByPk(tagId);
            if (tag) {
                card.addTag(tag);
                res.json({
                    message: "ok"
                });
            } else {
                next();
            }
        } else {
            next();
        }
    },

    dissociate: async (req, res, next) => {
        const cardId = parseInt(req.params.cardId, 10);
        const card = await Card.findByPk(cardId);
        if (card) {
            const tagId = parseInt(req.params.tagId, 10);
            const tag = await Tag.findByPk(tagId);
            if (tag) {
                card.removeTag(tag);
                res.json({
                    message: "ok"
                });
            } else {
                next()
            }
        } else {
            next()
        }
    },
}

module.exports = assoController;