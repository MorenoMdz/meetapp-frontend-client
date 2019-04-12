import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as MeetupActions } from '../../store/ducks/meetup';

import {
  Card, Container, Form, Input,TextArea, Error, Success,
} from './styles';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';

class Meetup extends Component {
  state = {
    title: '',
    description: '',
    cover: '',
    event_date: '2019-04-11 14:56:00',
    preferences: [
      { id: 1, name: 'Front-end' },
      { id: 2, name: 'Back-end' },
      { id: 3, name: 'Mobile' },
      { id: 4, name: 'DevOps' },
      { id: 5, name: 'Gestão' },
      { id: 6, name: 'Marketing' },
    ],
    error: false,
    loading: false,
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { newMeetupRequest } = this.props;
    const {
      title, description, cover, preferences,
    } = this.state;
    console.log('_____________');
    console.log('from comp: ', {
      title,
      description,
      cover,
      preferences,
    });
    newMeetupRequest({
      title,
      description,
      cover,
      preferences,
    });
  };

  handlePrefChange = (e, name) => {
    const { preferences } = this.state;
    const { checked } = e.target;

    const newPreferences = preferences.map(pref => (pref.name === name ? { ...pref, checked } : pref));

    this.setState({ preferences: newPreferences });
  };

  render() {
    const { preferences } = this.state;
    const { flash, error, loading } = this.props;

    return (
      <Fragment>
        <Navbar />
        <Container>
          <Card>
            {(error && <Error>{error}</Error>) || (flash && <Success>{flash}</Success>)}
            <Form onSubmit={this.handleSubmit} name="login">
              <label htmlFor="title">Título</label>
              <Input
                onChange={e => this.setState({ title: e.target.value })}
                placeholder="Digite o título do Meetup"
              />
              <label htmlFor="description">Descrição</label>
              <TextArea
                onChange={e => this.setState({ description: e.target.value })}
                placeholder="Descreva o seu Meetup"
              />
              <label htmlFor="file">Image de Capa</label>
              <Input
                type="file"
                id="cover-image"
                accept="image/gif, image/jpeg, image/png"
                onChange={e => this.setState({ file: e.target.value })}
              />

              <h4>Preferências</h4>
              {(this.state.prefLoading && <p>Carregando...</p>)
                || preferences.map(pref => (
                  <div className="checkbox" key={pref.name}>
                    <input
                      id={pref.name}
                      type="checkbox"
                      name="preference"
                      value={pref.checked}
                      checked={!!pref.checked}
                      onChange={e => this.handlePrefChange(e, pref.name)}
                    />
                    <label htmlFor={pref.name}>
                      <span />
                      {pref.name}
                    </label>
                  </div>
                ))}
              <Button type="submit">{loading ? 'Carregando' : 'Salvar'}</Button>
            </Form>
          </Card>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  flash: state.meetup.flash,
  error: state.meetup.error,
  loading: state.meetup.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(MeetupActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Meetup);
