const {
    Tag
} = require('../models');

const tagController = {
    getAll: async (req, res, next) => {
        try {
            const tags = await Tag.findAll();
            res.json(tags);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                "error": error.message,
                "hint": error.original.hint
            });
        }
    },

    getOne: async (req, res, next) => {
        try {
            const tagId = parseInt(req.params.id, 10);
            const tag = await Tag.findByPk(tagId);
            if (tag) {
                res.json(tag);
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

    create: async (req, res, next) => {
        try {
            const newTag = await Tag.create(req.body);
            res.json(newTag);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                "error": error.message
            });
        }
    },

    updateAll: async (req, res, next) => {
        try {
            const result = await Tag.update(req.body, {
                where: {},
                returning: true
            });
            res.json(result[1]);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                "error": error.message
            });
        }
    },

    updateOne: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const tag = await Tag.findByPk(id);
            if (tag) {
                await tag.update(req.body);
                res.json(tag);
            } else {
                next()
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                "error": error.message
            });
        }
    },

    deleteOne: async (req, res, next) => {
        try {
            const nbDestoyed = await Tag.destroy({
                where: {
                    id: req.params.id
                }
            });
            if (nbDestoyed === 0) {
                next();
            } else {
                res.json({
                    message: "ok"
                });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({
                "error": error.message
            });
        }
    }
}

module.exports = tagController;