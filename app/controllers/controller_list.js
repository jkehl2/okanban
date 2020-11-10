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
            console.log(listes);
            response.status(200).json(JSON.stringify(listes));
        } catch (error) {
            console.error(error);
            response.status(500).send();
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
            response.status(200).json(JSON.stringify(listeById));
        } catch (error) {
            console.error(error);
            response.status(500).send();
        }
    },

    /**
     * @method controller_main#postList - Create one liste
     * @param {Express.Request} request - Express server request
     * @param {Express.Response} response - Express server response
     */
    async postList(request, response) {
        try {
            let newList = await List.create(request.body);
            newList.save()
            response.status(201).json(JSON.parse(newList));
        } catch (error) {
            console.error(error);
            response.status(500).send();
        }
    },

    /**
     * @method controller_main#deleteList - Delete all list
     * @param {Express.Response} response - Express server response
     */
    async deleteList(_, response) {
        try {
            let count = await List.destroy({
                truncate: true,
                cascade: true
            });
            if (count > 0) {
                response.status(200).send();
            } else {
                response.status(204).send();
            }
        } catch (error) {
            console.error(error);
            response.status(500).send();
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
                },
                truncate: true,
                cascade: true
            });
            if (count > 0) {
                response.status(200).send();
            } else {
                response.status(204).send();
            }
        } catch (error) {
            console.error(error);
            response.status(500).send();
        }
    },

    /**
     * @method controller_main#patchList - Update all list
     * @param {Express.Response} response - Express server response
     */
    async patchList(request, response) {
        response.StatusCode(200);
        try {
            for (let index = 0; index < response.body.listes.length; index++) {
                let count = await List.update(request.body.listes[index]);
                if (count == 0) {
                    response.status(204).send();
                    return;
                }

            }
        } catch (error) {
            console.error(error);
            response.status(500);
        }
        response.send();
    },

    /**
     * @method controller_main#patchListById - Update one list by ID
     * @param {Express.Response} response - Express server response
     */
    async patchListById(request, response) {
        try {
            let count = await List.update(request.body);
            if (count > 0) {
                response.status(200).send();
            } else {
                response.status(204).send();
            }
        } catch (error) {
            console.error(error);
            response.status(500).send();
        }
    },

    /**
     * @method controller_main#notImplemented - 501 NOT IMPLEMENTED
     * @param {Express.Response} response - Express server response
     */
    async notImplemented(_, response) {
        response.status(501).send();
    },
};

module.exports = controller_list;