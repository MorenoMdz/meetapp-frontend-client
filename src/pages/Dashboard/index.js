import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as SearchActions } from '../../store/ducks/search';

import { Container } from './styles';
import HorizontalList from '../../components/HorizontalList';

class Dashboard extends Component {
  state = {
    title: '',
    description: '',
    file: '',
    registeredMeetups: [],
    nextMeetups: [],
    recomendedMeetups: [],
    error: false,
    loading: false,
  };

  componentDidMount() {
    const { fetchSoonRequest } = this.props;
    fetchSoonRequest();
  }

  handleSubmit = async (e) => {};

  render() {
    const {
      meetupsRegistered,
      meetupsRegisteredSoon,
      meetupsRecommendedSoon,
      meetupsNotRegSoon,
      error,
    } = this.props;
    console.log('meetupsNotRegSoon from comp', meetupsNotRegSoon);

    return (
      <Fragment>
        <Container>
          <div>
            <h4>Suas Inscrições para os próximos dias</h4>
            {meetupsRegisteredSoon.data && (
              <HorizontalList meetups={meetupsRegisteredSoon} error={error} />
            )}
          </div>
          <div>
            <h4>Próximos Meetups</h4>
            {meetupsRecommendedSoon.data ? (
              <HorizontalList meetups={meetupsRecommendedSoon} error={error} />
            ) : (
              <p>Sem recomendações no momento.</p>
            )}
          </div>
          <div>
            <h4>Recomendados</h4>
            {meetupsRecommendedSoon.data ? (
              <HorizontalList meetups={meetupsRecommendedSoon} error={error} />
            ) : (
              <p>Sem recomendações no momento.</p>
            )}
          </div>
          <div>
            <h4>Todas Suas Inscrições</h4>
            {meetupsRegistered.data ? (
              <HorizontalList meetups={meetupsRegistered} error={error} />
            ) : (
              <p>Você não está inscrito em nenhum meetup.</p>
            )}
          </div>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  meetupsRegistered: state.search.meetupsRegistered,
  meetupsRegisteredSoon: state.search.meetupsRegisteredSoon,
  meetupsNotRegSoon: state.search.meetupsNotRegSoon,
  meetupsRecommendedSoon: state.search.meetupsRecommendedSoon,
  flash: state.search.flash,
  error: state.search.error,
  loading: state.search.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(SearchActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
