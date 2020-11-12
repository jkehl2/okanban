const express = require('express');
const assoController = require('./controllers/assoController');
const entityController = require('./controllers/entityController');

const router = express.Router();

const wrapper = (callback) => {
    return (req, res, next) => {
        try {
            callback(req, res, next);
        } catch (error) {
            console.error(error);
            if (error.original && error.original.hint) {
                res.status(500).json({
                    "error": error.message,
                    "hint": error.original.hint
                });
            } else {
                res.status(500).json({
                    "error": error.message
                });
            }
        }
    }
}

/** CRUD List */
router.post('/card/:cardId/tag/:tagId', wrapper(assoController.associate));
router.delete('/card/:cardId/tag/:tagId', wrapper(assoController.dissociate));

router.get('/:entityName', wrapper(entityController.getAll));
router.get('/:entityName/:id', wrapper(entityController.getOne));
router.post('/:entityName', wrapper(entityController.create));
router.patch('/:entityName', wrapper(entityController.updateAll));
router.patch('/:entityName/:id', wrapper(entityController.updateOne));
router.delete('/:entityName/:id', wrapper(entityController.deleteOne));

router.use((req, res) => {
    res.status(404).json({
        error: "not found"
    });
});

module.exports = router;