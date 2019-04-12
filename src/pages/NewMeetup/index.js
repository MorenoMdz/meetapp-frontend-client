import React, { Component, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import api from '../../services/api';
import { Creators as MeetupActions } from '../../store/ducks/meetup';

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
import Navbar from '../../components/Navbar';

class Meetup extends Component {
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

  async componentDidMount() {
    const response = await api.get('files');

    this.setState({
      uploadedFiles: response.data.map(file => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url,
      })),
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { newMeetupRequest } = this.props;
    const {
      title, description, uploadedFiles, preferences, event_date,
    } = this.state;

    const cover_url = uploadedFiles.length ? uploadedFiles[0].url : null;
    const file_id = uploadedFiles.length ? uploadedFiles[0].id : null;

    console.log('file_id', file_id);

    newMeetupRequest({
      title,
      description,
      cover_url,
      file_id,
      event_date,
      preferences,
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
    console.log('id', uploadedFiles[0].id);

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
        console.log(response.data.id);
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
