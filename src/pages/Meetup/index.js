import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as MeetupActions } from '../../store/ducks/meetup';

import api from '../../services/api';
import Spinner from '../../components/Spinner';
import Navbar from '../../components/Navbar';

import {
  Card, Container, Description, Error, Success, ButtonWrapper,
} from './styles';
import Button from '../../components/Button';

class Meetup extends Component {
  static propTypes = {
    fetchRequest: PropTypes.func.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    cover: PropTypes.string,
    event_date: PropTypes.string,
    address: PropTypes.object,
    alreadyRegistered: PropTypes.bool,
    error: PropTypes.string,
  };

  state = {
    flash: '',
    error: '',
    hideButtons: false,
    unsubConfirmation: false,
    loading: true,
  };

  componentDidMount() {
    this.fetchMeetup();
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  fetchMeetup() {
    const { fetchRequest } = this.props;
    const meetup_id = this.props.match.params;
    fetchRequest(meetup_id);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const meetup_id = this.props.match.params.id;
    const response = await api.post(`/meetups/${meetup_id}/register`);
    if (response.data.error) {
      this.setState({ error: response.data.error.message });
      setTimeout(() => {
        this.setState({ error: '' });
      }, 5000);
    } else {
      this.setState({
        flash: response.data.success.message,
        hideButtons: true,
        unsubConfirmation: false,
      });
      setTimeout(() => {
        this.fetchMeetup();
        this.setState({ flash: '', hideButtons: false });
      }, 3000);
    }
  };

  handleUnsub = async (e) => {
    e.preventDefault();
    const meetup_id = this.props.match.params.id;
    const response = await api.delete(`/meetups/${meetup_id}/unregister`);
    if (response.data.error) {
      this.setState({ error: response.data.error.message, unsubConfirmation: false });
      setTimeout(() => {
        this.setState({ error: '' });
      }, 3000);
    } else {
      this.setState({
        flash: 'Seu registro foi removido com sucesso',
        unsubConfirmation: false,
        hideButtons: true,
      });
      setTimeout(() => {
        this.fetchMeetup();
        this.setState({
          flash: '',
          unsubConfirmation: false,
          hideButtons: false,
        });
      }, 5000);
    }
  };

  render() {
    const {
      title, description, cover, event_date, address, alreadyRegistered,
    } = this.props;
    const {
      error, flash, loading, hideButtons, unsubConfirmation,
    } = this.state;

    return (
      <Fragment>
        <Navbar />
        <Container>
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <Card>
              <img src={cover} alt="cover" />
              <Description>
                <h2>{title}</h2>
                <small>120 membros</small>
                <br />
                <h4>Descrição do evento:</h4>
                <p>{description}</p>
                <small>Realizado em:</small>
                <span>{event_date}</span>
                <br />
                <h4>Endereço:</h4>
                <small>{address.street}</small>
                <small>{address.number}</small>
                <small>{address.district}</small>
                <small>{address.city}</small>
                <small>{address.state}</small>
                {error && <Error>{error}</Error>}
                {flash && <Success>{flash}</Success>}
                {alreadyRegistered && !hideButtons ? (
                  <ButtonWrapper>
                    <Button disabled>Você já está registrado!</Button>
                    {!unsubConfirmation ? (
                      <button
                        className="confirm"
                        onClick={() => this.setState({ unsubConfirmation: true })}
                      >
                        Sair do meetup
                      </button>
                    ) : (
                      <button className="confirm" onClick={e => this.handleUnsub(e)}>
                        Certeza?
                      </button>
                    )}
                  </ButtonWrapper>
                ) : (
                  <ButtonWrapper>
                    {!hideButtons && (
                      <form onSubmit={e => this.handleSubmit(e)}>
                        <Button type="submit">{loading ? 'Carregando' : 'Inscreva-se'}</Button>
                      </form>
                    )}
                  </ButtonWrapper>
                )}
              </Description>
            </Card>
          )}
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  title: state.meetup.title,
  description: state.meetup.description,
  preferences: state.meetup.preferences,
  address: {
    ...state.meetup.address,
  },
  cover: state.meetup.cover_url,
  event_date: state.meetup.event_date,
  alreadyRegistered: state.meetup.alreadyRegistered,
  flash: state.meetup.flash,
  error: state.meetup.error,
  loading: state.meetup.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(MeetupActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Meetup);
