//import Button from 'react-bootstrap/Button';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

const Login: React.FC = () => {
  // Estados
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Utils
  const navigate = useNavigate();

  // Handlers
  async function onLogIn() {
    try {
      // Realiza la solicitud al servidor local para obtener el token
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const { token } = await response.json();

        // Almacena el token en localStorage
        window.localStorage.setItem('jwtToken', token);
        window.localStorage.setItem('isLoggedIn', 'true');
        // Redirige al usuario a la página principal
        navigate('/');
      } else {
        console.error('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  }

  // Render
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={onLogIn}>Log In</button>
    </div>
  );
};

export default Login;
