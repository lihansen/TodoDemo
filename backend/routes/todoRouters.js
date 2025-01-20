// create todo routers here

const express = require('express');
const router = express.Router();
const {getAllTodos, createTodo, updateTodo, deleteTodo} = require('../controllers/todoController');
const auth = require('../middleware/authMiddleware');
// console.log(auth);


router.get('/', auth, getAllTodos);
router.post('/', auth, createTodo);
router.put('/:id', auth, updateTodo);
router.delete('/:id', auth, deleteTodo);

module.exports = router;