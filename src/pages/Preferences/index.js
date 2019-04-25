import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from '../../store/ducks/user';

import {
  Card, Container, Form, Success, Error,
} from './styles';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';

class Preferences extends Component {
  static propTypes = {
    setPreferencesRequest: PropTypes.func.isRequired,
    history: PropTypes.object,
    flash: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.string,
  };

  state = {
    preferences: [
      { id: 1, name: 'Front-end', checked: false },
      { id: 2, name: 'Back-end', checked: false },
      { id: 3, name: 'Mobile', checked: false },
      { id: 4, name: 'DevOps', checked: false },
      { id: 5, name: 'Gestão', checked: false },
      { id: 6, name: 'Marketing', checked: false },
    ],
    loading: true,
    flash: '',
    error: '',
    btnLoading: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 500);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { setPreferencesRequest } = this.props;
    const { preferences } = this.state;

    setPreferencesRequest({
      preferences,
    });
    this.setState({ btnLoading: true });
  };

  handlePrefChange = (e, name) => {
    const { preferences } = this.state;
    const { checked } = e.target;

    const newPreferences = preferences.map(pref => (pref.name === name ? { ...pref, checked } : pref));

    this.setState({ preferences: newPreferences });
  };

  render() {
    const { flash, error } = this.props;
    const { preferences, loading, btnLoading } = this.state;

    return (
      <Fragment>
        <Container>
          <Card>
            {(error && <Error>{error}</Error>) || (flash && <Success>{flash}</Success>)}
            {loading ? (
              <Spinner loading={loading} />
            ) : (
              <Form onSubmit={this.handleSubmit} name="preferences">
                <p>
                  Parece que é seu primeiro acesso por aqui, comece escolhendo algumas preferências
                  para selecionarmos os melhores meetups pra você:
                </p>

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
                <Button type="submit" loading={btnLoading} disabled={btnLoading}>
                  Salvar
                </Button>
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
)(Preferences);
