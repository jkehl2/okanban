const { Card } = require('../models');
const findOptions = {
    include: {all: true, nested: true},
    order: [
        ['position', 'ASC'],
    ]
};

const cardController = {
    getAll: async (req, res, next) => {
        try {
            const cards = await Card.findAll(findOptions);
            res.json( cards );
        } catch (error) {
            console.error(error);
            res.status(500).json( {
                "error": error.message,
                "hint": error.original.hint
            } );
        }
    },

    getOne: async (req, res, next) => {
        try {
            const cardId = parseInt(req.params.id, 10);
            const card = await Card.findByPk(cardId,findOptions);
            if (card) {
                res.json(card);
            } else {
                next();
            }
        } catch (error) {
            console.error(error);
            res.status(500).json( {
                "error": error.message,
                "hint": error.original.hint
            });
        }
    },

    create: async (req, res, next) => {
        try {
            const newCard = await Card.create(req.body);
            res.json(newCard);
        } catch (error) {
            console.error(error);
            res.status(500).json( {
                "error": error.message
            });
        }
    },

    updateAll: async (req, res, next) => {
        try {
            const result = await Card.update( req.body, {
                where: {}, 
                returning: true
            });
            res.json(result[1]);
        } catch (error) {
            console.error(error);
            res.status(500).json( {
                "error": error.message
            });
        }
    },

    updateOne: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const card = await Card.findByPk(id);
            if (card) {
                await card.update(req.body);
                res.json(card);
            } else {
                next()
            }
        } catch (error) {
            console.error(error);
            res.status(500).json( {
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
                res.json({message: "ok"});
            }
            
        } catch (error) {
            console.error(error);
            res.status(500).json( {
                "error": error.message
            });
        }
    }
}

module.exports = cardController;