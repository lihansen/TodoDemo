import { useEffect, useState } from "react";

function Todo() {
    const [todos, setTodos] = useState([]);

    // Fetch todos from the backend
    useEffect(() => {
        fetch("http://localhost:8000/api/todos/")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTodos(data);
            });
    }, []);

    return (
        <div>
            <h1>Todo</h1>
        </div>
    );

}


export default Todo;