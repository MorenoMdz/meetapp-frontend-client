import React, { Component, Fragment } from 'react';

import {
  Card, Container, Form, Input, Error,
} from './styles';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';

class Login extends Component {
  state = {
    name: 'Moreno',
    email: 'm@m.com',
    password: '',
    password_confirmation: '',
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
      name, email, preferences, error, loading,
    } = this.state;

    return (
      <Fragment>
        <Navbar />
        <Container>
          <Card>
            <Form onSubmit={this.handleSubmit} name="login">
              <label htmlFor="name">Nome</label>
              <Input
                value={name}
                onChange={e => this.setState({ email: e.target.value })}
                placeholder="Nome"
              />
              <label htmlFor="email">Email</label>
              <Input
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                placeholder="Digite seu email"
              />
              <label>Senha</label>
              <Input
                onChange={e => this.setState({ password: e.target.value })}
                placeholder="Sua senha secreta"
              />
              <label>Confirmação de senha</label>
              <Input
                onChange={e => this.setState({ password: e.target.value })}
                placeholder="Confirme sua senha secreta"
              />
              <h4>Preferências</h4>
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
              <Button type="submit">{loading ? 'Carregando' : 'Salvar'}</Button>
            </Form>
          </Card>
        </Container>
      </Fragment>
    );
  }
}

export default Login;
