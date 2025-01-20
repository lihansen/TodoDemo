const Todo = require('../models/Todo');


const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        // const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const createTodo = async (req, res) => {
    try {
        console.log(req.body);
        const newTodo = new Todo({
            title: req.body.title,
            user: req.user.id
        });
        const todo = await newTodo.save();
        console.log(todo); 
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const updateTodo = async (req, res) => {
    try {
        console.log(req.body);
        let todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: 'Todo not found' });
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        todo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body ,
            { new: true }
        );
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const deleteTodo = async (req, res) => {
    try {
        console.log(req.params.id);
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: 'Todo not found' });
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        await Todo.deleteOne({ _id: req.params.id });
        res.json({ msg: 'Todo removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo
};