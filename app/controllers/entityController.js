const models = require('../models');
const RenderError = require('./RenderError');
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
        const renderError = new RenderError(req, res);
        try {
            const entityName = req.params.entityName[0].toUpperCase() + req.params.entityName.slice(1);
            console.log(entityName);
            const entities = await models[entityName].findAll(findOptions[entityName]);
            res.json(entities);
        } catch (error) {
            error => renderError(error, 500);
        }
    },

    getOne: async (req, res, next) => {
        const renderError = new RenderError(req, res);
        try {
            const entityName = req.params.entityName.substring(0, 1).toUpperCase() + req.params.entityName.substring(1);
            const entityId = parseInt(req.params.id, 10);
            const entity = await models[entityName].findByPk(entityId, findOptions[entityName]);
            if (entity) {
                res.json(entity);
            } else {
                next();
            }
        } catch (error) {
            error => renderError(error, 500);
        }
    },

    create: async (req, res, next) => {
        const renderError = new RenderError(req, res);
        try {
            const entityName = req.params.entityName.substring(0, 1).toUpperCase() + req.params.entityName.substring(1);
            const newEntity = await models[entityName].create(req.body);
            res.json(newEntity);
        } catch (error) {
            error => renderError(error, 500);
        }
    },

    updateAll: async (req, res, next) => {
        const renderError = new RenderError(req, res);
        try {
            const entityName = req.params.entityName.substring(0, 1).toUpperCase() + req.params.entityName.substring(1);
            const result = await models[entityName].update(req.body, {
                where: {},
                returning: true
            });
            res.json(result[1]);
        } catch (error) {
            error => renderError(error, 500);
        }
    },

    updateOne: async (req, res, next) => {
        const renderError = new RenderError(req, res);
        try {
            const entityId = parseInt(req.params.id);
            const entityName = req.params.entityName.substring(0, 1).toUpperCase() + req.params.entityName.substring(1);
            const entity = await models[entityName].findByPk(entityId);
            if (entity) {
                await entity.update(req.body);
                res.json(entity);
            } else {
                next()
            }
        } catch (error) {
            error => renderError(error, 500);
        }
    },

    deleteOne: async (req, res, next) => {
        const renderError = new RenderError(req, res);
        try {
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

        } catch (error) {
            error => renderError(error, 500);
        }
    }
}

module.exports = entityController;