import { useState } from "react";
import axios from "axios";
import { TextField, Button, Stack, Snackbar } from "@mui/material";
import Carlist from "./Carlist";

type User = {
  username: string;
  password: string;
}

export default function Login() {
  const [ open, setOpen ] = useState(false);
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
    .catch(() => setOpen(true));
  }

  const handleLogout = () => {
    setAuth(false);
    sessionStorage.setItem('jwt', '');
  }


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user, [event.target.name]:event.target.value
    });
  }

  if(isAuthenticated) {
    return <Carlist logOut={handleLogout}/>
  }

  else {
    return(
      <Stack spacing={2} alignItems="center" mt={2}>
        <TextField name="username" label="username" onChange={handleChange}/>
        <TextField name="password" label="password" onChange={handleChange} type="password"/>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleLogin}  
        >
          Login
        </Button>
        <Snackbar 
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="ID / 비밀번호를 확인해주세요."
        />
      </Stack>
    );
  }
  
} 