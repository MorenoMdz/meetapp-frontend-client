import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import api from '../../services/api';
import { Creators as MeetupActions } from '../../store/ducks/meetup';
import Navbar from '../../components/Navbar';

import 'react-datepicker/dist/react-datepicker.css';

import {
  Card,
  Container,
  Form,
  Input,
  TextArea,
  Error,
  Success,
  DateWrapper,
  Preferences,
} from './styles';

import Button from '../../components/Button';
import Upload from '../../components/Upload';
import FileList from '../../components/FileList';

class Meetup extends Component {
  static propTypes = {
    newMeetupRequest: PropTypes.func.isRequired,
    flash: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.string,
  };

  state = {
    title: '',
    description: '',
    cover: '',
    uploadedFiles: [],
    event_date: new Date(),
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
      title,
      description,
      uploadedFiles,
      preferences,
      event_date,
      street,
      number,
      district,
      city,
      state,
      history,
    } = this.state;

    const cover_url = uploadedFiles.length ? uploadedFiles[0].url : null;

    newMeetupRequest({
      title,
      description,
      uploadedFiles,
      preferences,
      event_date,
      street,
      number,
      district,
      city,
      state,
      cover_url,
      history,
    });
  };

  handlePrefChange = (e, name) => {
    const { preferences } = this.state;
    const { checked } = e.target;

    const newPreferences = preferences.map(pref => (pref.name === name ? { ...pref, checked } : pref));

    this.setState({ preferences: newPreferences });
  };

  handleDateChange = (date) => {
    this.setState({
      event_date: date,
    });
  };

  handleUpload = (files) => {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles),
    });

    uploadedFiles.forEach(this.processUpload);
  };

  handleDelete = async (id) => {
    await api.delete(`files/${id}`);

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id),
    });
  };

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => (id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile)),
    });
  };

  processUpload = (uploadedFile) => {
    const data = new FormData();

    data.append('file', uploadedFile.file, uploadedFile.name);

    api
      .post('files', data, {
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          this.updateFile(uploadedFile.id, {
            progress,
          });
        },
      })
      .then((response) => {
        this.updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data.id,
          url: response.data.url,
        });
      })
      .catch(() => {
        this.updateFile(uploadedFile.id, {
          error: true,
        });
      });
  };

  componentWillUnmount() {
    this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }

  render() {
    const { preferences, uploadedFiles } = this.state;
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
                id="title"
                onChange={e => this.setState({ title: e.target.value })}
                placeholder="Digite o título do Meetup"
              />
              <label htmlFor="date">Data do Evento</label>
              <DateWrapper>
                <DatePicker
                  className="react-datepicker"
                  id="date"
                  selected={this.state.event_date}
                  onChange={date => this.handleDateChange(date)}
                />
              </DateWrapper>
              <label htmlFor="description">Descrição</label>
              <TextArea
                id="description"
                onChange={e => this.setState({ description: e.target.value })}
                placeholder="Descreva o seu Meetup"
              />
              <h4>Local</h4>
              <label>Rua</label>
              <Input
                type="text"
                onChange={e => this.setState({ street: e.target.value })}
                placeholder="Nome da rua"
              />
              <label>Número</label>
              <Input
                type="number"
                onChange={e => this.setState({ number: e.target.value })}
                placeholder="Número"
              />
              <label>Bairro</label>
              <Input
                type="text"
                onChange={e => this.setState({ district: e.target.value })}
                placeholder="Bairro"
              />
              <label>Cidade</label>
              <Input
                type="text"
                onChange={e => this.setState({ city: e.target.value })}
                placeholder="Cidade"
              />
              <label>Estado</label>
              <Input
                type="text"
                onChange={e => this.setState({ state: e.target.value })}
                placeholder="Estado"
              />
              <label htmlFor="file">Imagem de Capa</label>
              {!uploadedFiles.length && <Upload onUpload={this.handleUpload} />}
              {!!uploadedFiles.length && (
                <FileList files={uploadedFiles} onDelete={this.handleDelete} />
              )}
              <Preferences>
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
              </Preferences>
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
