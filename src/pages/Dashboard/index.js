import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as SearchActions } from '../../store/ducks/search';

import { Container } from './styles';
import HorizontalList from '../../components/HorizontalList';

class Dashboard extends Component {
  componentDidMount() {
    const { fetchManyRequest } = this.props;
    fetchManyRequest();
  }

  handleEmpy = (list = []) => list.length > 0;

  render() {
    const {
      meetupsRegistered,
      meetupsRegisteredSoon,
      meetupsRecommendedSoon,
      meetupsNotRegSoon,
      error,
      loading,
    } = this.props;
    // console.log('meetupsRegistered from comp', meetupsRegistered.data);

    return (
      <Fragment>
        <Container>
          <div>
            <h4>Suas Inscrições para os próximos dias</h4>
            {this.handleEmpy(meetupsRegisteredSoon.data) ? (
              <HorizontalList
                listType="flex"
                meetups={meetupsRegisteredSoon}
                error={error}
                loading={loading}
              />
            ) : (
              <p>Você tem nenhum evento acontecendo em breve.</p>
            )}
          </div>
          <div>
            <h4>Próximos Meetups</h4>

            {this.handleEmpy(meetupsNotRegSoon.data) ? (
              <HorizontalList
                listType="flex"
                meetups={meetupsNotRegSoon}
                error={error}
                loading={loading}
              />
            ) : (
              <p>Sem recomendações no momento.</p>
            )}
          </div>
          <div>
            <h4>Recomendados</h4>
            {this.handleEmpy(meetupsRecommendedSoon.data) ? (
              <HorizontalList
                listType="flex"
                meetups={meetupsRecommendedSoon}
                error={error}
                loading={loading}
              />
            ) : (
              <p>Sem recomendações no momento.</p>
            )}
          </div>
          <div>
            <h4>Todas Suas Inscrições</h4>

            {this.handleEmpy(meetupsRegistered.data) ? (
              <HorizontalList meetups={meetupsRegistered} error={error} loading={loading} />
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
  error: state.search.error,
  loading: state.search.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(SearchActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
