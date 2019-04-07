import React, { Fragment, Component } from 'react';

import { Form, Input, Error } from './styles';
import Button from '../../components/Button';

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
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          {error && <Error>TODO error</Error>}
          <Input onChange={e => this.handleChange(e.target.value)} placeholder="email" />
          <Input onChange={e => this.handleChange(e.target.value)} placeholder="password" />
          <Button type="submit">Entrar</Button>
        </Form>
      </Fragment>
    );
  }
}

export default Login;
