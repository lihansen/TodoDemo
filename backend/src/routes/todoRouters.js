// create todo routers here

const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const auth = require('../middlewares/auth');

router.get('/', auth, todoController.getAllTodos);
router.post('/', auth, todoController.createTodo);
router.put('/:id', auth, todoController.updateTodo);
router.delete('/:id', auth, todoController.deleteTodo);

module.exports = router;