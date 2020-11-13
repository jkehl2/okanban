const models = require('../models');
const findOptions = {
    List: {
        include: [{
            association: 'cards',
            include: [{
                association: 'tags',
            }]    
        }],
        order: [
            ['position', 'ASC'],
            ['cards', 'position', 'ASC'],
        ]
    },
    Card: {
        include: [{
            association: 'tags'
        }],
        order: [
            ['position', 'ASC'],
        ]
    },
    Tag: {}
};

const entityController = {
    getAll: async (req, res, next) => {
        const entityName = req.params.entityName[0].toUpperCase() + req.params.entityName.slice(1);
        console.log(entityName);
        const entities = await models[entityName].findAll(findOptions[entityName]);
        res.json(entities);
    },

    getOne: async (req, res, next) => {
        const entityName = req.params.entityName.substring(0, 1).toUpperCase() + req.params.entityName.substring(1);
        const entityId = parseInt(req.params.id, 10);
        const entity = await models[entityName].findByPk(entityId, findOptions[entityName]);
        if (entity) {
            res.json(entity);
        } else {
            next();
        }
    },

    create: async (req, res, next) => {
        const entityName = req.params.entityName.substring(0, 1).toUpperCase() + req.params.entityName.substring(1);
        const newEntity = await models[entityName].create(req.body);
        res.json(newEntity);
    },

    updateAll: async (req, res, next) => {
        const entityName = req.params.entityName.substring(0, 1).toUpperCase() + req.params.entityName.substring(1);
        const result = await models[entityName].update(req.body, {
            where: {},
            returning: true
        });
        res.json(result[1]);
    },

    updateOne: async (req, res, next) => {
        const entityId = parseInt(req.params.id);
        const entityName = req.params.entityName.substring(0, 1).toUpperCase() + req.params.entityName.substring(1);
        const entity = await models[entityName].findByPk(entityId);
        if (entity) {
            await entity.update(req.body);
            res.json(entity);
        } else {
            next()
        }
    },

    deleteOne: async (req, res, next) => {
        const entityName = req.params.entityName.substring(0, 1).toUpperCase() + req.params.entityName.substring(1);
        const nbDestoyed = await models[entityName].destroy({
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
    }
}

module.exports = entityController;