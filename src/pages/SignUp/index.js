import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as SignupActions } from '../../store/ducks/signup';

import {
  Card, Container, Logo, Form, Input, Error, Login,
} from './styles';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';

class SignUp extends Component {
  static propTypes = {
    signupRequest: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.array,
  };

  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    loading: false,
  };

  handleSubmit = async (e) => {
    const { history } = this.props;

    e.preventDefault();

    const { signupRequest } = this.props;
    const {
      name, email, password, password_confirmation,
    } = this.state;

    signupRequest({
      name,
      email,
      password,
      password_confirmation,
      history,
    });
    this.setState({ loading: true });
  };

  render() {
    const { error, loading } = this.props;
    console.log(error);
    // TODO localização dos erros server side
    return (
      <Container>
        <Card>
          <Logo src={logo} />
          <Form onSubmit={this.handleSubmit} name="signup">
            {error && error.map(err => <Error key={err.message}>{err.message}</Error>)}

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
              type="password"
              onChange={e => this.setState({ password: e.target.value })}
              placeholder="Sua senha secreta"
            />
            <label>Confirme sua Senha</label>
            <Input
              type="password"
              onChange={e => this.setState({ password_confirmation: e.target.value })}
              placeholder="Confirme sua senha secreta"
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'carregando' : 'Criar conta'}
            </Button>
          </Form>
          <Login to="/signin">Já tenho conta</Login>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  error: state.signup.error,
  loading: state.signup.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(SignupActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
