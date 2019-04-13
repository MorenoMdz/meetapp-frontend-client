import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as SearchActions } from '../../store/ducks/search';

import { Container } from './styles';
import Navbar from '../../components/Navbar';
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
      meetupsRegistered, meetupsRegisteredSoon, meetupsRecommendedSoon, error,
    } = this.props;
    console.log('meetupsRecommendedSoon', meetupsRecommendedSoon);

    return (
      <Fragment>
        <Navbar />
        <Container>
          <div>
            <h4>Suas Inscrições para os próximos dias</h4>
            <HorizontalList meetups={meetupsRegisteredSoon} error={error} />
          </div>
          <div>
            <h4>Próximos Meetups</h4>
            {/* <HorizontalList meetups={nextMeetups} error={error} /> */}
          </div>
          <div>
            <h4>Recomendados</h4>
            {meetupsRecommendedSoon ? (
              <HorizontalList meetups={meetupsRecommendedSoon} error={error} />
            ) : (
              <p>Nenhuma recomendação encontrada!</p>
            )}
          </div>
          <div>
            <h4>Todas Suas Inscrições</h4>
            <HorizontalList meetups={meetupsRegistered} error={error} />
          </div>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  meetupsRegistered: state.search.meetupsRegistered,
  meetupsRegisteredSoon: state.search.meetupsRegisteredSoon,
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
