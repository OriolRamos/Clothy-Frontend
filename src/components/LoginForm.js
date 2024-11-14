import React from 'react';
import styled from 'styled-components';
import logo from '../images/logo_black.png'; // Ruta al logo

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

const LoginForm = () => {
    return (
        <StyledWrapper>
            <StyledForm>
                <div className="logo_container">
                    <img src={logo} alt="Logo" style={{ width: '80px' }} />
                </div>
                <p className="title">Login to your Account</p>
                <div className="input_container">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="input_field" placeholder="name@mail.com" required />
                </div>
                <div className="input_container">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="input_field" placeholder="Password" required />
                </div>
                <button type="submit" className="sign-in_btn">Sign In</button>
                <div className="separator">
                    <hr className="line" /><span>Or</span><hr className="line" />
                </div>
                <button type="button" className="sign-in_btn">Sign In with Google</button>
            </StyledForm>
        </StyledWrapper>
    );
};

export default LoginForm;
