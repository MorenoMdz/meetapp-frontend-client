import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as LoginActions } from '../../store/ducks/login';
import { Creators as UserActions } from '../../store/ducks/user';

import siteLogo from '../../assets/logo-white.svg';
import profileLogo from '../../assets/user.svg';
import activeProfileLogo from '../../assets/userFull.svg';
import {
  Container, ToggleBtn, NavLink, NavMenu, MenuLink,
} from './styles';

class Navbar extends Component {
  static propTypes = {
    fetchRequest: PropTypes.func.isRequired,
    name: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.string,
  };

  state = { menuActive: false, prefLoading: false, name: '' };

  componentDidMount() {
    this.setState({ menuActive: false, prefLoading: true });
    this.loadUser();
  }

  toggleMenu = () => {
    const { menuActive } = this.state;
    this.setState({ menuActive: !menuActive });
    this.loadUser();
  };

  hideMenu = () => {
    this.loadUser();
    this.setState({ menuActive: false });
  };

  loadUser = () => {
    const { fetchRequest, name } = this.props;
    fetchRequest();
    this.setState({
      name,
      prefLoading: false,
    });
  };

  render() {
    const { menuActive, name, prefLoading } = this.state;
    const { logoutRequest } = this.props;

    return (
      <Container>
        <div onClick={this.hideMenu}>
          <img src={siteLogo} alt="Logo" />
          <NavLink to="/dashboard">Inicio</NavLink>
          <NavLink to="/newmeetup">Novo Meetup</NavLink>
          <NavLink to="/search">Buscar Meetup</NavLink>
        </div>

        <div>
          <ToggleBtn onClick={this.toggleMenu}>
            {!menuActive ? (
              <img src={profileLogo} alt="Logo" />
            ) : (
              <img src={activeProfileLogo} alt="Logo" />
            )}
          </ToggleBtn>
          {menuActive && (
            <NavMenu onClick={this.hideMenu}>
              {!prefLoading ? (
                <strong>
                  <MenuLink to="/profile">{`Olá, ${name.split(' ')[0]}`}</MenuLink>
                </strong>
              ) : (
                <strong>...</strong>
              )}

              <div className="row">
                <MenuLink to="/profile">Meu Perfil</MenuLink>
              </div>
              <div className="row">
                <MenuLink to="/about">Sobre Nós</MenuLink>
              </div>
              <br />
              <div className="row">
                <li className="logout" onClick={logoutRequest}>
                  Sair
                </li>
              </div>
            </NavMenu>
          )}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  name: state.user.name,
  error: state.login.error,
  loading: state.login.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...LoginActions, ...UserActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navbar);
