import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as MeetupActions } from '../../store/ducks/meetup';

import {
  Card, Container, Description, Error,
} from './styles';
import Button from '../../components/Button';

class Meetup extends Component {
  state = {};

  componentDidMount() {
    const { fetchRequest } = this.props;
    const id = this.props.match.params;
    fetchRequest(id);
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    // TODO POST to server to register to the meetup
  };

  render() {
    const {
      title, description, cover, event_date, address, error, loading,
    } = this.props;

    return (
      <Fragment>
        <Container>
          <Card>
            <img src={cover} alt="cover" />
            <Description>
              <h2 onClick={this.handleSubmit}>{title}</h2>
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
              {error && <Error>TODO error</Error>}
              <Button type="submit">{loading ? 'Carregando' : 'Inscreva-se'}</Button>
            </Description>
          </Card>
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
  flash: state.meetup.flash,
  error: state.meetup.error,
  loading: state.meetup.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(MeetupActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Meetup);
