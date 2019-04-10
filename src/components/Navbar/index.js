import React from 'react';

import logo from '../../assets/logo-white.svg';
import { Container } from './styles';

const Navbar = () => (
  <Container>
    <img src={logo} alt="Logo" />
    <a href="/dashboard">Inicio</a>
    <a href="/search">Buscar</a>
    <a href="/newmeetup">Novo meet</a>
  </Container>
);

export default Navbar;
