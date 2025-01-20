import { useEffect, useState } from "react";
import Todo from "./components/todo";
import Login from "./components/login";
import './App.css';

function App() {
  const [isloggedin, setIsloggedin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/users/isloggedin", {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("auto login");
        console.log(data.message);  
        if (data.message === true)
        setIsloggedin(true);
      });
  }, []);


  return (
    <>
      <Login isloggedin={isloggedin} setIsloggedin={setIsloggedin} />
      {isloggedin && <Todo isloggedin={isloggedin} />}
    </>
  );

}

export default App;