import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../images/logo_black.png'; // Ruta al logo
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;

  .logo_container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .title {
    font-size: 24px;
    font-weight: 500;
    color: #333;
  }

  .input_container {
    margin-top: 15px;
    position: relative;
  }

  .input_field {
    width: 100%;
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 14px;
  }

  .sign-in_btn {
    margin-top: 20px;
    padding: 12px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  .separator {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 20px 0;
  }

  .separator .line {
    flex-grow: 1;
    height: 1px;
    background: #ddd;
  }
`;

export default function LoginForm({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Comprovar si l'usuari ja té una sessió activa (token en localStorage)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard'); // Si hi ha token, redirigir a la pàgina de dashboard o la pàgina principal.
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,  // Canvia "email" per "username" si cal
                    password: password
                }),
                credentials: "include" // Inclou cookies en la petició
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("authToken", data.token); // Emmagatzema el token
                setIsAuthenticated(true); // Actualitza l'estat d'autenticació
                // Redirigeix l'usuari si el login és correcte
                navigate('/');
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            setError('Error during login');
        }
    }

    return (
        <StyledWrapper>
            <StyledForm onSubmit={handleLogin}>
                <div className="logo_container">
                    <img src={logo} alt="Logo" style={{ width: '80px' }} />
                </div>
                <p className="title">Login to your Account</p>
                {error && <p className="error">{error}</p>}
                <div className="input_container">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="input_field"
                        placeholder="name@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input_container">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="input_field"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="sign-in_btn">Login</button>
                <div className="separator">
                    <hr className="line" /><span>Or</span><hr className="line" />
                </div>
                <button type="button" className="sign-in_btn">Login with Google</button>
            </StyledForm>
        </StyledWrapper>
    );
};

