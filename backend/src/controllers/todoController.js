// router.get('/', auth, todoController.getAllTodos);
// router.post('/', auth, todoController.createTodo);
// router.put('/:id', auth, todoController.updateTodo);
// router.delete('/:id', auth, todoController.deleteTodo);

const Todo = require('../models/Todo');


const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.json(todos);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

const createTodo = async (req, res) => {
    try {
        const newTodo = new Todo({
            text: req.body.text,
            user: req.user.id
        });
        const todo = await newTodo.save();
        res.json(todo);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

const updateTodo = async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: 'Todo not found' });
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { text: req.body.text },
            { new: true }
        );
        res.json(todo);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: 'Todo not found' });
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        await todo.remove();
        res.json({ msg: 'Todo removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo
};