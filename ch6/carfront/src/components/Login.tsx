import { useState } from "react";
import axios from "axios";
import { TextField, Button, Stack } from "@mui/material";

type User = {
  username: string;
  password: string;
}

export default function Login() {
  const [ user, setUser ] = useState<User>({
    username: '',
    password: '',
  });

  const [ isAuthenticated, setAuth ] = useState(false);

  const handleLogin = () => {
    axios.post(`${import.meta.env.VITE_API_URL}/login`, user, {
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => {
      const jwtToken = response.headers.authorization;
      if(jwtToken !== null) {
        sessionStorage.setItem("jwt", jwtToken);
        setAuth(true);
      }
    })
    .catch(err => console.log(err));
  }


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user, [event.target.name]:event.target.value
    });
  }

  return(
    <Stack spacing={2} alignItems="center" mt={2}>
      <TextField name="username" label="username" onChange={handleChange}/>
      <TextField name="password" label="password" onChange={handleChange} type="password"/>
      <Button>
        Login
      </Button>
    
    </Stack>
  );
} 