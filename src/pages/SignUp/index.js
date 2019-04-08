import React, { Component } from 'react';

import {
  Card, Container, Logo, Form, Input, Error,
} from './styles';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';

class Login extends Component {
  state = {
    name: '',
    email: '',
    password: '',
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
    const { error, loading } = this.state;

    return (
      <Container>
        <Card>
          <Logo src={logo} />
          <Form onSubmit={this.handleSubmit} name="login">
            {error && <Error>TODO error</Error>}

            <label>Nome</label>
            <Input
              onChange={e => this.setState({ name: e.target.value })}
              placeholder="Digite seu email"
            />
            <label>Email</label>
            <Input
              onChange={e => this.setState({ email: e.target.value })}
              placeholder="Digite seu email"
            />
            <label>Senha</label>
            <Input
              onChange={e => this.setState({ password: e.target.value })}
              placeholder="Sua senha secreta"
            />
            <Button type="submit">{loading ? 'carregando' : 'Criar conta'}</Button>
          </Form>
          <a href="#">Já tenho conta</a>
        </Card>
      </Container>
    );
  }
}

export default Login;
