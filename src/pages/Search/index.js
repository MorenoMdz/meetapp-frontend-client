import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as SearchActions } from '../../store/ducks/search';

import { Input, Container } from './styles';
import CardList from '../../components/CardList';
import Navbar from '../../components/Navbar';

class Search extends Component {
  static propTypes = {
    fetchByTitleRequest: PropTypes.func.isRequired,
    meetupsFound: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
  };

  state = {
    page: 1,
    searchInput: '',
    meetupsFound: [],
    error: false,
    loading: false,
    nothingFound: '',
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { fetchByTitleRequest } = this.props;
    const { searchInput, page } = this.state;
    fetchByTitleRequest({ title: searchInput, type: 'byTitle', page });
    this.handleNothingFound();
  };

  handleInput = async (e) => {
    const { fetchByTitleRequest } = this.props;
    const { searchInput, page } = this.state;
    setTimeout(() => {
      fetchByTitleRequest({ title: searchInput, type: 'byTitle', page });
    }, 200);
    this.handleNothingFound();
  };

  handleEmpty = (list = []) => list.length > 0;

  handleNothingFound = () => this.setState({ nothingFound: 'Nada Encontrado' });

  render() {
    const { searchInput, nothingFound } = this.state;
    const { meetupsFound, loading, error } = this.props;

    return (
      <Fragment>
        <Navbar />
        <Container>
          <form onSubmit={e => this.handleSubmit(e)}>
            <Input
              value={searchInput}
              onChange={e => this.setState({ searchInput: e.target.value })}
              onKeyUp={e => this.handleInput(e)}
              placeholder="🔍 Buscar por Meetups"
            />
          </form>
          {this.handleEmpty(meetupsFound.data) ? (
            <CardList listType="grid" meetups={meetupsFound} error={error} loading={loading} />
          ) : (
            <p>{nothingFound}</p>
          )}
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  meetupsFound: state.search.meetupsByTitle,
  loading: state.search.loading,
  error: state.search.error,
});

const mapDispatchToProps = dispatch => bindActionCreators(SearchActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
