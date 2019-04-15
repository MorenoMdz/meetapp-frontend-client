import React, { Component, Fragment } from 'react';

import { Input, Container } from './styles';

import HorizontalList from '../../components/HorizontalList';

class Login extends Component {
  state = {
    title: '',
    description: '',
    file: '',
    registeredMeetups: [],
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
      registeredMeetups, nextMeetups, recomendedMeetups, searchInput, error,
    } = this.state;

    return (
      <Fragment>
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
