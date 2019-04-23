import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as LoginActions } from '../../store/ducks/login';

import {
  Card, Container, Logo, Form, Input, Error, Signup,
} from './styles';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';

class Login extends Component {
  static propTypes = {
    loginRequest: PropTypes.func.isRequired,
    history: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
  };

  state = {
    email: '',
    password: '',
  };

  handleSubmit = async (e) => {
    const { history } = this.props;
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
          <Signup to="/signup">Criar conta grátis</Signup>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  error: state.login.error,
  loading: state.login.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(LoginActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
