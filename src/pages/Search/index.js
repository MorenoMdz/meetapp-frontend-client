import React, { Component, Fragment } from 'react';

import { Input, Container, Error } from './styles';

import Button from '../../components/Button';
import Navbar from '../../components/Navbar';
import HorizontalList from '../../components/HorizontalList';

class Login extends Component {
  state = {
    title: '',
    description: '',
    file: '',
    registeredMeetups: [
      {
        title: 'Meetup-One',
        description: 'Description 1',
        cover:
          'https://images.wallpapersden.com/image/download/infinity-war-all-superheroes_58112_2560x1024.jpg',
      },
      {
        title: 'Meetup-Two',
        description: 'Description 2',
        cover:
          'https://images.wallpapersden.com/image/download/infinity-war-all-superheroes_58112_2560x1024.jpg',
      },
      {
        title: 'Meetup-Three',
        description: 'Description 3',
        cover:
          'https://images.wallpapersden.com/image/download/infinity-war-all-superheroes_58112_2560x1024.jpg',
      },
    ],
    nextMeetups: [
      {
        title: 'Meetup-One',
        description: 'Description 1',
        cover:
          'https://images.wallpapersden.com/image/download/infinity-war-all-superheroes_58112_2560x1024.jpg',
      },
      {
        title: 'Meetup-Two',
        description: 'Description 2',
        cover:
          'https://images.wallpapersden.com/image/download/infinity-war-all-superheroes_58112_2560x1024.jpg',
      },
      {
        title: 'Meetup-Three',
        description: 'Description 3',
        cover:
          'https://images.wallpapersden.com/image/download/infinity-war-all-superheroes_58112_2560x1024.jpg',
      },
    ],
    recomendedMeetups: [
      {
        title: 'Meetup-One',
        description: 'Description 1',
        cover:
          'https://images.wallpapersden.com/image/download/infinity-war-all-superheroes_58112_2560x1024.jpg',
      },
      {
        title: 'Meetup-Two',
        description: 'Description 2',
        cover:
          'https://images.wallpapersden.com/image/download/infinity-war-all-superheroes_58112_2560x1024.jpg',
      },
      {
        title: 'Meetup-Three',
        description: 'Description 3',
        cover:
          'https://images.wallpapersden.com/image/download/infinity-war-all-superheroes_58112_2560x1024.jpg',
      },
    ],
    error: false,
    loading: false,
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    console.log(this.state);

    // TODO POST to server to login
    this.setState({
      email: '',
      password: '',
      file: '',
      loading: true,
    });
  };

  render() {
    const {
      registeredMeetups,
      nextMeetups,
      recomendedMeetups,
      searchInput,
      error,
      loading,
    } = this.state;

    return (
      <Fragment>
        <Navbar />
        <Container>
          <Input
            value={searchInput}
            onChange={e => this.setState({ searchInput: e.target.value })}
            placeholder="🔍 Buscar por Meetups"
          />
          <section id="meetups">
            <div>
              <h4>Suas Inscrições</h4>
              <HorizontalList meetups={registeredMeetups} error={error} />
            </div>
            <div>
              <h4>Próximos Meetups</h4>
              <HorizontalList meetups={nextMeetups} error={error} />
              <div />
              <h4>Recomendados</h4>
              <HorizontalList meetups={recomendedMeetups} error={error} />
            </div>
          </section>
        </Container>
      </Fragment>
    );
  }
}

export default Login;
