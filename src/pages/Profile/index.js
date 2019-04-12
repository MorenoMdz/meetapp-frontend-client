import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from '../../store/ducks/user';

import {
  Card, Container, Form, Input, Error,
} from './styles';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';

class Profile extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    preferences: [
      { id: 1, name: 'Front-end' },
      { id: 2, name: 'Back-end' },
      { id: 3, name: 'Mobile' },
      { id: 4, name: 'DevOps' },
      { id: 5, name: 'Gestão' },
      { id: 6, name: 'Marketing' },
    ],
    prefLoading: true,
    error: false,
    loading: false,
  };

  componentDidMount() {
    const { fetchRequest } = this.props;
    this.setState({ prefLoading: true });

    fetchRequest();

    setTimeout(() => {
      const { name, email, userPreferences } = this.props;
      this.setState({
        name,
        email,
        preferences: userPreferences,
        prefLoading: false,
      });
    }, 1000);
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { userRequest, history } = this.props;
    const {
      name, email, password, password_confirmation, preferences,
    } = this.state;

    userRequest({
      name,
      email,
      password,
      password_confirmation,
      preferences,
      history,
    });
  };

  handlePrefChange = (e, name) => {
    const { preferences } = this.state;
    const { checked } = e.target;

    const newPreferences = preferences.map(pref => (pref.name === name ? { ...pref, checked } : pref));

    this.setState({ preferences: newPreferences });
  };

  render() {
    const { error, loading } = this.props;
    const { name, email, preferences } = this.state;

    return (
      <Fragment>
        <Navbar />
        <Container>
          <Card>
            {error && <Error>{error}</Error>}
            <Form onSubmit={this.handleSubmit} name="login">
              <label htmlFor="name">Nome</label>
              <Input
                value={name}
                onChange={e => this.setState({ name: e.target.value })}
                placeholder="Digite seu nome"
              />
              <label htmlFor="email">Email</label>
              <Input
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                placeholder="Digite seu email"
              />
              <label>Senha</label>
              <Input
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
                placeholder="Sua senha secreta"
              />
              <label>Confirmação de senha</label>
              <Input
                type="password"
                onChange={e => this.setState({ password_confirmation: e.target.value })}
                placeholder="Confirme sua senha secreta"
              />
              <h4>Preferências</h4>
              {(this.state.prefLoading && <p>Carregando...</p>)
                || preferences.map(pref => (
                  <div className="checkbox" key={pref.name}>
                    <input
                      id={pref.name}
                      type="checkbox"
                      name="preference"
                      value={pref.checked}
                      checked={pref.checked}
                      onChange={e => this.handlePrefChange(e, pref.name)}
                    />
                    <label htmlFor={pref.name}>
                      <span />
                      {pref.name}
                    </label>
                  </div>
                ))}
              <Button type="submit">{loading ? 'Carregando' : 'Salvar'}</Button>
            </Form>
          </Card>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  name: state.user.name,
  email: state.user.email,
  preferences: state.user.preferences,
  userPreferences: state.user.preferences,
  error: state.user.error,
  loading: state.user.loading,
  isLogged: state.user.isLogged,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
