const express = require('express');
const assoController = require('./controllers/assoController');
const entityController = require('./controllers/entityController');

const router = express.Router();

/** CRUD List */
router.post('/card/:cardId/tag/:tagId', assoController.associate);
router.delete('/card/:cardId/tag/:tagId', assoController.dissociate);

router.get('/:entityName', entityController.getAll);
router.get('/:entityName/:id', entityController.getOne);
router.post('/:entityName', entityController.create);
router.patch('/:entityName', entityController.updateAll);
router.patch('/:entityName/:id', entityController.updateOne);
router.delete('/:entityName/:id', entityController.deleteOne);

router.use((req, res) => {
    res.status(404).json({
        error: "not found"
    });
});

module.exports = router;