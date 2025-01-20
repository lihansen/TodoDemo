import { useEffect, useState } from "react";
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Paper,
    Grid,
} from "@mui/material";
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Check as CheckIcon,
    Undo as UndoIcon,
} from "@mui/icons-material";

const boxStyle = {
    border: "1px solid black",
    padding: "10px",
    margin: "10px",
};

function timestampToTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
}

function Todo({ name, }) {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    // ...existing fetch functions...
    function fetchTodos() {
        fetch("http://localhost:3000/tasks/", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setTodos(data ? data : []);
            });
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    function handlelogout() {
        fetch("http://localhost:3000/users/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("fetched logout");
                // console.log(data);
                alert(data.message);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    function EditTodo(e, id) {
        e.preventDefault();
        setNewTodo(todos.find((todo) => todo._id === id).title);
        deleteTodo(id);
    }

    function changeTodoCompletion(id) {
        fetch("http://localhost:3000/tasks/" + id, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                completed: todos.find((todo) => todo._id === id).completed
                    ? false
                    : true,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("fetched complete todo");
                console.log(data);
                fetchTodos();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    function deleteTodo(index) {
        fetch("http://localhost:3000/tasks/" + index, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("fetched delete todo");
                console.log(data);
                setTodos(todos.filter((todo) => todo._id !== index));
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    function addTodo(e) {
        e.preventDefault();
        fetch("http://localhost:3000/tasks/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: newTodo,
                completed: false,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("fetched add todo");
                console.log(data);
                setTodos([...todos, data]);
                setNewTodo("");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <>
            <Box display="flex" alignItems="center">
                <Typography variant="h5">Welcome, <span>{name}</span></Typography>
                <Box marginLeft="auto">
                    <Button variant="outlined" onClick={handlelogout}
                        sx={{
                            mt: 1,
                            color: "error.main"
                            ,borderColor: 'error.main',
                        }}
                    >Logout</Button>
                </Box>
            </Box>
            <Container maxWidth="md">
                <Box sx={{ my: 4 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box component="form" sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Add new todo"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                            />
                            <Button variant="contained" onClick={addTodo} sx={{ mt: 1 }}>
                                Add Todo
                            </Button>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h6">Incomplete Tasks</Typography>
                                <List>
                                    {todos
                                        .filter((todo) => !todo.completed)
                                        .map((todo) => (
                                            <ListItem key={todo._id}>
                                                <ListItemText
                                                    primary={todo.title}
                                                    secondary={timestampToTime(todo.createdAt)}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        onClick={() => changeTodoCompletion(todo._id)}
                                                    >
                                                        <CheckIcon />
                                                    </IconButton>
                                                    <IconButton onClick={(e) => EditTodo(e, todo._id)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton onClick={() => deleteTodo(todo._id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))}
                                </List>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography variant="h6">Completed Tasks</Typography>
                                <List>
                                    {todos
                                        .filter((todo) => todo.completed)
                                        .map((todo) => (
                                            <ListItem key={todo._id}>
                                                <ListItemText
                                                    primary={todo.title}
                                                    secondary={timestampToTime(todo.createdAt)}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        onClick={() => changeTodoCompletion(todo._id)}
                                                    >
                                                        <UndoIcon />
                                                    </IconButton>
                                                    <IconButton onClick={(e) => EditTodo(e, todo._id)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton onClick={() => deleteTodo(todo._id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))}
                                </List>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        </>
    );
}

export default Todo;

function PlainTodo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    function fetchTodos() {
        fetch("http://localhost:3000/tasks/", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setTodos(data ? data : []);
            });
    }
    useEffect(() => {
        fetchTodos();
    }, []);

    function handlelogout() {
        fetch("http://localhost:3000/users/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("fetched logout");
                // console.log(data);
                alert(data.message);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    function EditTodo(e, id) {
        e.preventDefault();
        setNewTodo(todos.find((todo) => todo._id === id).title);
        deleteTodo(id);
    }

    function changeTodoCompletion(id) {
        fetch("http://localhost:3000/tasks/" + id, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                completed: todos.find((todo) => todo._id === id).completed
                    ? false
                    : true,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("fetched complete todo");
                console.log(data);
                fetchTodos();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    function deleteTodo(index) {
        fetch("http://localhost:3000/tasks/" + index, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("fetched delete todo");
                console.log(data);
                setTodos(todos.filter((todo) => todo._id !== index));
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    function addTodo(e) {
        e.preventDefault();
        fetch("http://localhost:3000/tasks/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: newTodo,
                completed: false,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("fetched add todo");
                console.log(data);
                setTodos([...todos, data]);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <>
            <hr />
            <button onClick={handlelogout}>Logout</button>
            <hr />
            <form>
                <input
                    type="text"
                    placeholder="add todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button onClick={(e) => addTodo(e)}>Add</button>
            </form>
            <div className="todo">
                <div className="incomplete-tasks" style={boxStyle}>
                    <h3>
                        <span>INCOMPLETE</span>
                    </h3>
                    {todos.map((todo) => {
                        if (!todo.completed) {
                            return (
                                <div key={todo._id}>
                                    {/* <input type="checkbox" /> */}
                                    <span>{todo.title}</span>
                                    <button onClick={() => changeTodoCompletion(todo._id)}>
                                        complete
                                    </button>
                                    <button onClick={(e) => EditTodo(e, todo._id)}>edit</button>
                                    <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                                    {timestampToTime(todo.createdAt)}
                                </div>
                            );
                        }
                    })}
                </div>

                <div className="completed-tasks" style={boxStyle}>
                    <h3>
                        <span>COMPLETED</span>
                    </h3>
                    {todos.map((todo) => {
                        if (todo.completed) {
                            return (
                                <div key={todo._id}>
                                    {/* <input type="checkbox" /> */}
                                    <span>{todo.title}</span>
                                    <button onClick={() => changeTodoCompletion(todo._id)}>
                                        uncomplete
                                    </button>
                                    <button onClick={(e) => EditTodo(e, todo._id)}>edit</button>
                                    <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                                    {timestampToTime(todo.createdAt)}
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </>
    );
}
