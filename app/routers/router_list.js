const express = require('express');
const controller_list = require('../controllers/controller_list');

/**
 * @author KEHL Johann <jkehl.dev@gmail.com>
 * @version 1.0.0
 * @description List router module.
 */
const router_list = express.Router();

// Get all list
router_list.get('/', controller_list.getList);

// Get one liste by id
router_list.get('/:id', controller_list.getListById);

// Create one liste
router_list.post('/', controller_list.postList);

// 501 NOT IMPLEMENTED
router_list.post('/:id', controller_list.notImplemented);

// Delete all list
router_list.delete('/', controller_list.deleteList);

// Delete one list by ID
router_list.delete('/:id', controller_list.deleteListById);

// Update all list
router_list.patch('/', controller_list.patchList);

// Update one list by ID
router_list.patch('/:id', controller_list.patchListById);


module.exports = router_list;