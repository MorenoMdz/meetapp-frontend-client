import React, { Component, Fragment } from 'react';

import {
  Card, Container, Description, Error,
} from './styles';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';

class Login extends Component {
  state = {
    title: 'Meetup One',
    cover:
      'https://boygeniusreport.files.wordpress.com/2018/04/avengers-infinity-war3.jpg?quality=98&strip=all&w=1200',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. ',
    preferences: [
      { title: 'Front-end' },
      { title: 'Back-end', checked: true },
      { title: 'Mobile' },
      { title: 'DevOps' },
      { title: 'Gestão' },
      { title: 'Marketing' },
    ],
    error: false,
    loading: false,
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    console.log(this.state);

    // TODO POST to server to login
    this.setState({ email: '', password: '', loading: true });
  };

  render() {
    const {
      title, cover, description, error, loading,
    } = this.state;

    return (
      <Fragment>
        <Navbar />
        <Container>
          <Card>
            <img src={cover} alt="cover" />
            <Description>
              <h2>{title}</h2>
              <small>120 membros</small>
              {' '}
              {/* TODO */}
              <p>{description}</p>
              <small>Realizado em:</small>
              {' '}
              {/* TODO */}
              <span>Nulla consequat massa quis enim.</span>
              {error && <Error>TODO error</Error>}
              <Button type="submit">{loading ? 'Carregando' : 'Inscreva-se'}</Button>
            </Description>
          </Card>
        </Container>
      </Fragment>
    );
  }
}

export default Login;
