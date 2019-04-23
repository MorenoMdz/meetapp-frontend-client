import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Card, Container, Form, Error,
} from './styles';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';

class Login extends Component {
  static propTypes = {
    flash: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.string,
  };

  state = {
    name: 'Moreno',
    preferences: [
      { id: 1, title: 'Front-end' },
      { id: 2, title: 'Back-end', checked: true },
      { id: 3, title: 'Mobile' },
      { id: 4, title: 'DevOps' },
      { id: 5, title: 'Gestão' },
      { id: 6, title: 'Marketing' },
    ],
    error: false,
    loading: false,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    // TODO POST to server to login
    this.setState({ email: '', password: '', loading: true });
    // redirect to dashboard
  };

  render() {
    const {
      name, preferences, error, loading,
    } = this.state;

    return (
      <Container>
        <Navbar />
        <Card>
          <strong>
            Olá,
            {name}
          </strong>

          <Form onSubmit={this.handleSubmit} name="preferences">
            <p>
              Parece que é seu primeiro acesso por aqui, comece escolhendo algumas preferências para
              selecionarmos os melhores meetups pra você:
            </p>
            <h4>Preferências</h4>
            {error && <Error>TODO error</Error>}
            {preferences.map(pref => (
              <div className="checkbox">
                <input
                  id={pref.title}
                  type="checkbox"
                  name="preference"
                  value={pref.checked}
                  checked={pref.checked}
                  onClick={(e) => {}}
                />
                <label htmlFor={pref.title}>
                  <span />
                  {pref.title}
                </label>
              </div>
            ))}
            <Button type="submit">{loading ? 'Carregando' : 'Continuar'}</Button>
          </Form>
        </Card>
      </Container>
    );
  }
}

export default Login;
