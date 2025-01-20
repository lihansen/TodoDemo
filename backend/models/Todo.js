const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Todo = mongoose.model('Todo', todoSchema);

// //get all todos
// Todo.getAllTodos = async function (userId) {
//     // return await Todo.find({ user: userId });
//     return await Todo.find();
// }

// //create a new todo
// Todo.createTodo = async function (todo) {
//     return await todo.save();
// }

// //update a todo
// Todo.updateTodo = async function (id, title) {
//     return await Todo.findByIdAndUpdate(id, { title: title }, { new: true });
// }

// //delete a todo
// Todo.deleteTodo = async function (id) {
//     return await Todo.findByIdAndDelete(id);
// }


module.exports = Todo;