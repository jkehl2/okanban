const {
    List
} = require('../models/index');

/**
 * @author KEHL Johann <jkehl.dev@gmail.com>
 * @version 1.0.0
 * @description List controller module.
 */

const controller_list = {
    /**
     * @method controller_main#getList - Get all list
     * @param {Express.Response} response - Express server response
     */
    async getList(_, response) {
        try {
            let listes = await List.findAll({
                include: [{
                    association: 'cards',
                    include: [{
                        association: 'tags'
                    }]
                }]
            });
            response.StatusCode(200).json(JSON.stringify(listes));
        } catch {
            response.StatusCode(500).json(JSON.parse({}));
        }
    },

    /**
     * @method controller_main#getListById - Get one liste by id
     * @param {Express.Request} request - Express server request
     * @param {Express.Response} response - Express server response
     */
    async getListById(request, response) {
        try {
            let listeById = await List.findByPk(request.params.id, {
                include: [{
                    association: 'cards',
                    include: [{
                        association: 'tags'
                    }]
                }]
            });
            response.StatusCode(200).json(JSON.stringify(listeById));
        } catch {
            response.StatusCode(500).json(JSON.parse({}));
        }
    },

    /**
     * @method controller_main#postList - Create one liste
     * @param {Express.Request} request - Express server request
     * @param {Express.Response} response - Express server response
     */
    async postList(request, response) {
        try {
            let newList = await List.create(request.body, {
                include: [{
                    association: 'cards',
                    include: [{
                        association: 'tags'
                    }]
                }]
            });
            newList.save()
            response.StatusCode(201).json(JSON.parse(newList));
        } catch {
            response.StatusCode(500).json(JSON.parse({}));
        }
    },

    /**
     * @method controller_main#deleteList - Delete all list
     * @param {Express.Response} response - Express server response
     */
    async deleteList(_, response) {
        try {
            let count = await List.destroy({
                include: [{
                    association: 'cards',
                    include: [{
                        association: 'tags'
                    }]
                }]
            });
            if (count > 0) {
                response.StatusCode(200).json(JSON.parse({}));
            } else {
                response.StatusCode(204).json(JSON.parse({}));
            }
        } catch {
            response.StatusCode(500).json(JSON.parse({}));
        }
    },

    /**
     * @method controller_main#deleteListById - Delete one list by ID
     * @param {Express.Response} response - Express server response
     */
    async deleteListById(request, response) {
        try {
            let count = await List.destroy({
                where: {
                    id: request.params.id
                }
            }, {
                include: [{
                    association: 'cards',
                    include: [{
                        association: 'tags'
                    }]
                }]
            });
            if (count > 0) {
                response.StatusCode(200).json(JSON.parse({}));
            } else {
                response.StatusCode(204).json(JSON.parse({}));
            }
        } catch {
            response.StatusCode(500).json(JSON.parse({}));
        }
    },

    /**
     * @method controller_main#patchList - Update all list
     * @param {Express.Response} response - Express server response
     */
    async patchList(request, response) {
        response.StatusCode(200).json(JSON.parse({}));
        try {
            for (let index = 0, index < response.body.listes.length, index++) {
                let count = await List.update(request.body.listes[index], {
                    include: [{
                        association: 'cards',
                        include: [{
                            association: 'tags'
                        }]
                    }]
                });
                if (count == 0) {
                    response.StatusCode(204).json(JSON.parse({}));
                    return;
                }
            }
        } catch {
            response.StatusCode(500).json(JSON.parse({}));
        }
    },

    /**
     * @method controller_main#patchListById - Update one list by ID
     * @param {Express.Response} response - Express server response
     */
    async patchListById(request, response) {
        try {
            let count = await List.update(request.body, {
                include: [{
                    association: 'cards',
                    include: [{
                        association: 'tags'
                    }]
                }]
            });
            if (count > 0) {
                response.StatusCode(200).json(JSON.parse({}));
            } else {
                response.StatusCode(204).json(JSON.parse({}));
            }
        } catch {
            response.StatusCode(500).json(JSON.parse({}));
        }
    },

    /**
     * @method controller_main#notImplemented - 501 NOT IMPLEMENTED
     * @param {Express.Response} response - Express server response
     */
    async notImplemented(_, response) {
        response.StatusCode(501);
    },
};

module.exports = controller_list;