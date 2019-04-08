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
    password_confirmation: '',
    error: false,
    loading: false,
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    console.log(this.state);

    // TODO POST to server to login
    this.setState({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      loading: true,
    });
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
              placeholder="Digite seu nome"
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
            <Input
              onChange={e => this.setState({ password_confirmation: e.target.value })}
              placeholder="Confirme sua senha secreta"
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
