import './App.css';
import React from 'react';
import { useState, useEffect, state } from 'react';
import { login, logout,  } from './services/authService';
import { register, checkUserStatus } from './services/userService';
import { useAuthStore } from './stores/authStore';
import { useUserStore } from './stores/userStore';
import {
  TextField,
  Button,
  Typography,
  Link,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Grid2';

function App() {

  const {currentUser, setCurrentUser} = useUserStore();
  const { email, password, username, setEmail, setPassword, setUsername } = useAuthStore(state => state);  
  const [showPassword, setShowPassword] = useState(false);
  const [registration, setRegistration] = useState(false);

  useEffect(() => {
    checkingUser()
  }, []);

  const checkingUser = async () => {
    try {
      await checkUserStatus();
      setCurrentUser(true);
    } catch (error) {
      setCurrentUser(false);
    }
  }

  const submitRegistration = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, username);
      const response = await login(email, password, username);
      setEmail(response.data.email);
      setPassword(response.data.password);
      setCurrentUser(true);
    } catch (error) {
      console.error('Ha ocurrido el siguiente error al intentar Registrarse: ', error);
    }
  }

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password, username);
      setEmail(response.data.email);
      setPassword(response.data.password);
      setCurrentUser(true);
    } catch (error) {
      console.error('Ha ocurrido el siguiente error al intentar hacer Login: ', error);
    }
  }

  const submitLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      setEmail('');
      setUsername('');
      setPassword('');
      setCurrentUser(false);
    } catch (error) {
      console.error('Ha ocurrido el siguiente error al intentar hacer Logout: ', error);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();    
    try {      
      if (registration) {
        submitRegistration(e);
      } else {
        submitLogin(e);
      }
    } catch (error) {
      console.error('Ha ocurrido un error:', error);
    }
  };

  if (currentUser) {
    return (
      <div>
        <div className="center">
          <h2>Estas Logueado!</h2>
        </div>
        <form onSubmit={e => submitLogout(e)}>
          <Button type="submit" variant="contained">Log out</Button>
        </form>
      </div>
    );
  }
  return (
    <Grid container spacing={2} style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid xs={12} sm={6} md={4}>
        <form onSubmit={submitHandler}>
          <Typography variant="h3" fontFamily="'Pacifico', cursive" sx={{ textAlign: 'center' }}>Instagram</Typography>
          <div style={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Nombre de usuario"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
            />
          </div>
          <TextField
            fullWidth
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
          />
          <Grid container justifyContent="end" >
            <Grid>
              <Link href="/forgot-password" sx={{ color: '#00bbf0'}}>¿Olvidaste tu contraseña?</Link>
            </Grid>
          </Grid>
          <Button
            type="submit" 
            variant="contained" 
            sx={{ backgroundColor: '#00bbf0', marginTop: '20px'}}
            fullWidth  
          >
            { registration === false ? 'Inicia sesión' : 'Registrate'}
          </Button>
          <Grid container justifyContent="flex-start" mt={2}>
            <Grid>
              { registration === false ? (
                <div>
                  <span>¿No tienes una cuenta? </span>
                  <Button sx={{ color: '#00bbf0'}} onClick={() => setRegistration(!registration)}>Registrate</Button>
                </div>
                ) : (
                <div>
                  <span>Inicia sesión </span>
                  <Button sx={{ color: '#00bbf0'}} onClick={() => setRegistration(!registration)}>Aquí</Button>
                </div>
                )
              }
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default App;
