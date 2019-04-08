import React, { Component } from 'react';

import {
  Card, Container, Logo, Form, Input, Error,
} from './styles';
import Button from '../../components/Button';

class Login extends Component {
  state = {
    name: 'Moreno',
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
      name, preferences, error, loading,
    } = this.state;

    return (
      <Container>
        <Card>
          <strong>
            Olá,
            {name}
          </strong>

          <Form onSubmit={this.handleSubmit} name="login">
            <p>
              Parece que é seu primeiro acesso por aqui, comece escolhendo algumas preferências para
              selecionarmos os melhores meetups pra você:
            </p>
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
            {error && <Error>TODO error</Error>}
            <Button type="submit">{loading ? 'carregando' : 'Continuar'}</Button>
          </Form>
        </Card>
      </Container>
    );
  }
}

export default Login;
