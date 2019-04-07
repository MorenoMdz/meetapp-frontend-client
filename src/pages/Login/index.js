import React, { Component } from 'react';

import {
  Container, Logo, Form, Input, Error,
} from './styles';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';

class Login extends Component {
  state = { email: '', error: '', loading: true };

  handleSubmit = async (e) => {
    e.preventDefault();

    console.log(this.state);
    // TODO POST to server to login
  };

  handleChange = text => this.setState({ email: text });

  render() {
    const { email } = this.state;
    const { error, loading } = this.state;

    return (
      <Container>
        <Logo src={logo} alt="Logo" />
        <Form onSubmit={this.handleSubmit}>
          {error && <Error>TODO error</Error>}
          <Input onChange={e => this.handleChange(e.target.value)} placeholder="email" />
          <Input onChange={e => this.handleChange(e.target.value)} placeholder="password" />
          <Button type="submit">Entrar</Button>
        </Form>
      </Container>
    );
  }
}

export default Login;
