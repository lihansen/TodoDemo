import { useEffect, useState } from "react";
import Todo from "./components/todo";
import Login from "./components/login";
import "./App.css";

function App() {
  const [isloggedin, setIsloggedin] = useState(false);
  const [name, setName] = useState("");
  useEffect(() => {
    fetch("http://localhost:3000/users/isloggedin", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("auto login");
        // console.log(data.message);
        if (data.message === true) {
          setIsloggedin(true);
          setName(data.name);
        }
      });
  }, [isloggedin]);

  return (
    <>
      {isloggedin ? (
        <Todo name={name} />
      ) : (
        <Login setIsloggedin={setIsloggedin} />
      )}
    </>
  );
}

export default App;
