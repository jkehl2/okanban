const express = require('express');
const assoController = require('./controllers/assoController');
const cardController = require('./controllers/cardController');
const listController = require('./controllers/listController');
const tagController = require('./controllers/tagController');

const router = express.Router();

/** CRUD List */
router.post('/card/:cardId/tag/:tagId', assoController.associate );
router.delete('/card/:cardId/tag/:tagId', assoController.dissociate );

router.get('/list', listController.getAll );
router.get('/list/:id', listController.getOne );
router.post('/list', listController.create );
router.patch('/list', listController.updateAll );
router.patch('/list/:id', listController.updateOne );
router.delete('/list/:id', listController.deleteOne );

router.get('/card', cardController.getAll );
router.get('/card/:id', cardController.getOne );
router.post('/card', cardController.create );
router.patch('/card', cardController.updateAll );
router.patch('/card/:id', cardController.updateOne );
router.delete('/card/:id', cardController.deleteOne );

router.get('/tag', tagController.getAll );
router.get('/tag/:id', tagController.getOne );
router.post('/tag', tagController.create );
router.patch('/tag', tagController.updateAll );
router.patch('/tag/:id', tagController.updateOne );
router.delete('/tag/:id', tagController.deleteOne );

router.use( (req,res) => {
    res.status(404).json( {error: "not found"} );
});

module.exports = router;