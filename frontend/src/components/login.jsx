import { useState } from "react";
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert
} from "@mui/material";

function Login({ setIsloggedin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (response.ok) {
        setIsloggedin(true);
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card sx={{ width: '100%', mt: 2 }}>
          <CardContent>
            <Typography component="h1" variant="h5" textAlign="center" gutterBottom>
              Login
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={submit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign In'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Login;
// import { useEffect, useState } from "react";

// function Login({ isloggedin, setIsloggedin }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   function submit(e) {
//     e.preventDefault();
//     fetch("http://localhost:3000/users/login", {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username,
//         password,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("fetched login");
//         console.log(data);
//         setIsloggedin(true);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }

//   return (
//     <>
//       <form>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button onClick={submit}>Login</button>
//       </form>
//     </>
//   );
// }

// export default Login;
