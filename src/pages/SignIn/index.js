import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as LoginActions } from '../../store/ducks/login';

import { isAuthenticated } from '../../services/auth';

import {
  Card, Container, Logo, Form, Input, Error,
} from './styles';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleSubmit = async (e) => {
    const { history } = this.props;
    console.log(history);
    e.preventDefault();

    const { loginRequest } = this.props;
    const { email, password } = this.state;

    loginRequest({ email, password, history });
  };

  render() {
    const { error, loading } = this.props;

    return (
      <Container>
        <Card>
          <Logo src={logo} alt="Logo" />
          <Form onSubmit={this.handleSubmit} name="login">
            {error && <Error>{error}</Error>}
            <label htmlFor="login">Email</label>
            <Input
              onChange={e => this.setState({ email: e.target.value })}
              placeholder="Digite seu email"
              /* required */
            />
            <label>Senha</label>
            <Input
              type="password"
              onChange={e => this.setState({ password: e.target.value })}
              placeholder="Sua senha secreta"
              /* required */
            />
            <Button type="submit">{loading ? 'carregando' : 'Entrar'}</Button>
          </Form>
          <a href="#">Criar conta grátis</a>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  error: state.login.error,
  loading: state.login.loading,
  isLogged: state.login.isLogged,
});

const mapDispatchToProps = dispatch => bindActionCreators(LoginActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
