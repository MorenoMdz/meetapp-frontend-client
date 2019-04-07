import React from 'react';

import logo from '../../assets/logo-white.svg';
import { Container } from './styles';

const Navbar = () => (
  <Container>
    <img src={logo} alt="Logo" />
    <a href="#">Inicio</a>
    <a href="#">Buscar</a>
    <a href="#">Novo meet</a>
  </Container>
);

export default Navbar;
