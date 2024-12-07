const express = require('express');
const router = express.Router();

// Importiamo le funzioni del controller
const todoController = require('../controllers/TodoControllerFilesystem');

//# ROTTE CRUD PER I TODO

// index
router.get('/', todoController.index);

// show
router.get('/:id', todoController.show);

// store
router.post('/', todoController.store);

// update
router.put('/:id', todoController.update);

// modify
router.patch('/:id', todoController.modify);

// destroy
router.delete('/:id', todoController.destroy);

module.exports = router;