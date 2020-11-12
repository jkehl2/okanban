const models = require('../models');
console.log(models);
const findOptions = {
    List: {
        include: [{
            association: 'tags'
        }],
        order: [
            ['position', 'ASC'],
        ]
    },
    Card: {
        include: [{association: 'tags'}],
        order: [
            ['position', 'ASC'],
        ]
    },
    Tag: null
};

const entityController = {
    getAll: async (req, res, next) => {
        try {
            const entityName = req.params.entityName;
            const entities = await models[entityName].findAll(findOptions[entityName]);
            res.json(entities);
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
            const entityName = req.params.entityName;
            const entityId = parseInt(req.params.id, 10);
            const entity = await models[entityName].findByPk(entityId, findOptions[entityName]);
            if (entity) {
                res.json(entity);
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
            const newEntity = await Card.create(req.body);
            res.json(newEntity);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                "error": error.message
            });
        }
    },

    updateAll: async (req, res, next) => {
        try {
            const result = await Card.update(req.body, {
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
            const entityId = parseInt(req.params.id);
            const entity = await Card.findByPk(entityId);
            if (entity) {
                await entity.update(req.body);
                res.json(entity);
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
            const nbDestoyed = await Card.destroy({
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

module.exports = entityController;