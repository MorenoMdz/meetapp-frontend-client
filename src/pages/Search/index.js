import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as SearchActions } from '../../store/ducks/search';

import { Input, Container } from './styles';
import Spinner from '../../components/Spinner';
import HorizontalList from '../../components/HorizontalList';

class Search extends Component {
  state = {
    page: 1, // get from page params?
    searchInput: '',
    meetupsFound: [],
    error: false,
    loading: false,
    nothingFound: '',
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { fetchManyRequest } = this.props;
    const { searchInput, page } = this.state;
    fetchManyRequest({ title: searchInput, page });
    this.handleNothingFound();
  };

  handleInput = async (e) => {
    // this.setState({ searchInput: e.target.value });
    const { fetchManyRequest } = this.props;
    const { searchInput, page } = this.state;
    setTimeout(() => {
      fetchManyRequest({ title: searchInput, page });
    }, 200);
    this.handleNothingFound();
  };

  handleEmpty = (list = []) => list.length > 0;

  handleNothingFound = () => this.setState({ nothingFound: 'Nada Encontrado' });

  render() {
    const { searchInput, nothingFound } = this.state;
    const { meetupsFound, loading, error } = this.props;
    console.log('found', this.props.meetupsFound.data);
    console.log('loading', loading);

    return (
      <Fragment>
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
            <HorizontalList meetups={meetupsFound} error={error} loading={loading} />
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
