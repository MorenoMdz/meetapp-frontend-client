import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as SearchActions } from '../../store/ducks/search';
import Navbar from '../../components/Navbar';

import { Container } from './styles';
import CardList from '../../components/CardList';
import Pagination from '../../components/Pagination';
import Spinner from '../../components/Spinner';

class Dashboard extends Component {
  static propTypes = {
    fetchRegisteredRequest: PropTypes.func.isRequired,
    meetupsRegisteredSoon: PropTypes.object,
    fetchNotRegSoonRequest: PropTypes.func.isRequired,
    meetupsNotRegSoon: PropTypes.object,
    fetchRecommendedRequest: PropTypes.func.isRequired,
    meetupsRecommendedSoon: PropTypes.object,
    error: PropTypes.string,
  };

  state = {
    meetupsRegisteredSoon: { page: 1 },
    meetupsNotRegSoon: { page: 1 },
    meetupsRecommendedSoon: { page: 1 },
    loading: true,
  };

  componentDidMount() {
    // TODO usar um placeholder no lugar do delay
    // usei o delay de 1s pra retirar o load pra manter um tempo de carregamento consistente
    setTimeout(() => {
      this.fetchRegistered();
      this.fetchNotRegSoon();
      this.fetchRecommended();
      this.setState({ loading: false });
    }, 1000);
  }

  handleEmpy = (list = []) => list.length > 0;

  paginate = (list, type, page) => {
    const isLastPage = page === list.lastPage;
    const isFirstPage = page === 1;
    if (type === 'next' && !isLastPage) {
      page++;
    } else if (type === 'prev' && !isFirstPage) {
      page--;
    }
    return page;
  };

  fetchRegistered = (type) => {
    const { fetchRegisteredRequest, meetupsRegisteredSoon } = this.props;
    const statePage = this.state.meetupsRegisteredSoon.page;
    const page = this.paginate(meetupsRegisteredSoon, type, statePage);
    this.setState({ meetupsRegisteredSoon: { page } });
    fetchRegisteredRequest({ page });
  };

  fetchNotRegSoon = (type) => {
    const { fetchNotRegSoonRequest, meetupsNotRegSoon } = this.props;
    const statePage = this.state.meetupsNotRegSoon.page;
    const page = this.paginate(meetupsNotRegSoon, type, statePage);
    this.setState({ meetupsNotRegSoon: { page } });
    fetchNotRegSoonRequest({ page });
  };

  fetchRecommended = (type) => {
    const { fetchRecommendedRequest, meetupsRecommendedSoon } = this.props;
    const statePage = this.state.meetupsRecommendedSoon.page;
    const page = this.paginate(meetupsRecommendedSoon, type, statePage);
    this.setState({ meetupsRecommendedSoon: { page } });
    fetchRecommendedRequest({ page });
  };

  render() {
    const {
      meetupsRegisteredSoon, meetupsRecommendedSoon, meetupsNotRegSoon, error,
    } = this.props;
    const { loading } = this.state;

    return (
      <Fragment>
        <Navbar />
        {loading ? (
          <Container>
            <Spinner />
          </Container>
        ) : (
          <Container>
            <div>
              <h4>Suas Inscrições para os próximos dias</h4>
              {this.handleEmpy(meetupsRegisteredSoon.data) ? (
                <CardList
                  listType="grid"
                  meetups={meetupsRegisteredSoon}
                  error={error}
                  loading={loading}
                />
              ) : (
                <p>Você não tem nenhum evento acontecendo em breve.</p>
              )}
              {meetupsRegisteredSoon.lastPage > 1 && (
                <Pagination
                  page={meetupsRegisteredSoon.page}
                  total={meetupsRegisteredSoon.total}
                  lastPage={meetupsRegisteredSoon.lastPage}
                  changePage={this.fetchRegistered}
                />
              )}
            </div>

            <div>
              <h4>Próximos Meetups</h4>
              {this.handleEmpy(meetupsNotRegSoon.data) ? (
                <CardList
                  listType="grid"
                  meetups={meetupsNotRegSoon}
                  error={error}
                  loading={loading}
                />
              ) : (
                <p>Nenhum meetup acontecendo em breve.</p>
              )}
              {meetupsNotRegSoon.lastPage > 1 && (
                <Pagination
                  page={meetupsNotRegSoon.page}
                  total={meetupsNotRegSoon.total}
                  lastPage={meetupsNotRegSoon.lastPage}
                  changePage={this.fetchNotRegSoon}
                />
              )}
            </div>

            <div>
              <h4>Recomendados</h4>
              {this.handleEmpy(meetupsRecommendedSoon.data) ? (
                <CardList
                  listType="grid"
                  meetups={meetupsRecommendedSoon}
                  error={error}
                  loading={loading}
                />
              ) : (
                <p>Sem recomendações no momento.</p>
              )}
              {meetupsRecommendedSoon.lastPage > 1 && (
                <Pagination
                  page={meetupsRecommendedSoon.page}
                  total={meetupsRecommendedSoon.total}
                  lastPage={meetupsRecommendedSoon.lastPage}
                  changePage={this.fetchRecommended}
                />
              )}
            </div>
          </Container>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
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
