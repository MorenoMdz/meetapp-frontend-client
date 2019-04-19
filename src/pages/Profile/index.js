import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from '../../store/ducks/user';

import {
  Card, Container, Form, Input, Success, Error,
} from './styles';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';

class Profile extends Component {
  // 1) Inicio o loading como true
  state = {
    name: '',
    email: '',
    preferences: [],
    loading: true,
    flash: '',
    error: '',
  };

  componentDidMount() {
    // 2) Busco os dados do user do store pela ação do saga
    const { fetchRequest } = this.props;
    fetchRequest();
    this.loadUser();
  }

  loadUser = () => {
    // 3) Essa ação tem um tempo de processo por isso precisei dar um delay de 1s pra evitar o erro no montar do componente, esse 1s acaba sendo um UX decente
    setTimeout(() => {
      const { name, email, userPreferences } = this.props;
      // 4) Aqui fica a dúvida, usei os dados do props "copiando" pro state pra usar no display dos inputs/checkbox e poder manipular ja que props é readonly, seria essa a melhor opção?
      this.setState({
        name,
        email,
        preferences: userPreferences,
        loading: false,
      });
    }, 1000);
  };

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
    const { flash, error } = this.props;
    const {
      name, email, preferences, loading,
    } = this.state;

    return (
      <Fragment>
        <Container>
          <Card>
            {(error && <Error>{error}</Error>) || (flash && <Success>{flash}</Success>)}
            {loading ? (
              <Spinner loading={loading} />
            ) : (
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
                {(this.state.loading && <p>Carregando...</p>)
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
            )}
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
  flash: state.user.flash,
  error: state.user.error,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
