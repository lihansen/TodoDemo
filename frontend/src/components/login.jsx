import { useEffect, useState } from "react";

function Login({ isloggedin, setIsloggedin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function submit(e) {
        e.preventDefault();
        fetch("http://localhost:3000/users/login", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("fetched login")
                console.log(data);
                setIsloggedin(true);
            }).catch((error) => {
                console.error('Error:', error);
            });

    }


    return (
        <>
            <form >


                <input type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username" />
                <input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" />
                <button
                    onClick={submit}
                >Login</button>
            </form>
        </>
    )
}

export default Login;