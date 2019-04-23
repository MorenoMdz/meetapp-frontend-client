import React from 'react';

import { Container, Card } from './styles';
import Rocket from '../../components/Rocket';
import Navbar from '../../components/Navbar';

export default function About() {
  return (
    <Container>
      <Navbar />
      <Card>
        <h4>MeetApp</h4>

        <p>
          Projeto de conclusão do bootcamp da
          {' '}
          <a href="https://rocketseat.com.br/" target="_blank" rel="noopener noreferrer">
            Rocketseat
          </a>
          , desenvolvido em ReactJS com backend em NodeJS/AdonisJS.
        </p>
        <p>
          Criado e desenvolvido por
          {' '}
          <a
            href="https://github.com/MorenoMdz/meetapp-frontend-client"
            target="_blank"
            rel="noopener noreferrer"
          >
            Moreno Antunes
          </a>
          .
        </p>
      </Card>
      <Rocket />
    </Container>
  );
}
