import React, { Component } from 'react';

import {
  Card, Container, Logo, Form, Input, Error,
} from './styles';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';

class Login extends Component {
  state = { email: '', error: false, loading: false };

  handleSubmit = async (e) => {
    e.preventDefault();

    console.log(this.state);

    // TODO POST to server to login
    this.setState({ email: '', password: '', loading: true });
  };

  render() {
    const { error, loading } = this.state;

    return (
      <Container>
        <Card>
          <Logo src={logo} alt="Logo" />
          <Form onSubmit={this.handleSubmit} name="login">
            {error && <Error>TODO error</Error>}
            <label htmlFor="login">Email</label>
            <Input
              onChange={e => this.setState({ email: e.target.value })}
              placeholder="Digite seu email"
            />
            <label>Senha</label>
            <Input
              onChange={e => this.setState({ password: e.target.value })}
              placeholder="Sua senha secreta"
            />
            <Button type="submit">{loading ? 'carregando' : 'Entrar'}</Button>
          </Form>
          <a href="#">Criar conta grátis</a>
        </Card>
      </Container>
    );
  }
}

export default Login;
