import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo_black.png'; // Ruta al logo
import styled from 'styled-components';

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

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",  // Assegurem-nos que estem enviant JSON
                },
                body: JSON.stringify({
                    username: email, // Si vols reutilitzar el correu com a nom d'usuari
                    email: email,
                    password: password
                })
            });

            if(response.ok()){
                setError('Sessio creada correctament');
            }

            // Si la creació de l'usuari és correcta, guardar el token i redirigir a login
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            setError('Error creating account');
        }
    };

    return (
        <StyledWrapper>
            <StyledForm onSubmit={handleSignUp}>
                <div className="logo_container">
                    <img src={logo} alt="Logo" style={{ width: '80px' }} />
                </div>
                <p className="title">Create a New Account</p>
                {error && <p className="error" style={{color: '#E83B46' }}>{error}</p>}
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
                <div className="input_container">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="input_field"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="sign-in_btn">Sign Up</button>
            </StyledForm>
        </StyledWrapper>
    );
};

export default SignUpForm;
