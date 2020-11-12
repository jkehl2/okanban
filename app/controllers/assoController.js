const {
    Card,
    Tag
} = require('../models');

const assoController = {
    associate: async (req, res, next) => {
        try {
            const cardId = request.param.cardId;
            const card = await Card.findByPk(cardId);
            if (card) {
                const tagId = request.param.tagId;
                const tag = await Tag.findByPk(tagId);
                if (tag) {
                    card.addTag(tag);
                } else {
                    next()
                }
            } else {
                next()
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                "error": error.message,
                "hint": error.original.hint
            });
        }
    },

    dissociate: async (req, res, next) => {
        try {
            const cardId = request.param.cardId;
            const card = await Card.findByPk(cardId);
            if (card) {
                const tagId = request.param.tagId;
                const tag = await Tag.findByPk(tagId);
                if (tag) {
                    card.removeTag(tag);
                } else {
                    next()
                }
            } else {
                next()
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                "error": error.message,
                "hint": error.original.hint
            });
        }
    },
}

module.exports = assoController;