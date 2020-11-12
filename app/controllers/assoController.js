const {
    Card,
    Tag
} = require('../models');

const assoController = {
    associate: async (req, res, next) => {
        try {
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