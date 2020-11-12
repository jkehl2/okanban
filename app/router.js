const express = require('express');
const listController = require('./controllers/listController');

const router = express.Router();

/** CRUD List */
router.get('/list', listController.getAll );
router.get('/list/:id', listController.getOne );
router.post('/list', listController.create );
router.patch('/list', listController.updateAll );
router.patch('/list/:id', listController.updateOne );
router.delete('/list/:id', listController.deleteOne );

/** middleware 404, comme d'habitude toujours en dernier ! */
router.use( (req,res) => {
    res.status(404).json( {error: "not found"} );
});

module.exports = router;