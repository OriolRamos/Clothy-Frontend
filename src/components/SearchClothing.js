import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../images/logo_black.png'; // Ruta al logo
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageUpload from "./ImageUpload";

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

`;

export default function SearchClothing() {


    return (
        <StyledWrapper>
            <StyledForm>
                <ImageUpload />
            </StyledForm>
        </StyledWrapper>
    );
};

