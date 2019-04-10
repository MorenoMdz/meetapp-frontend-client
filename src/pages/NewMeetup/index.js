import React, { Component, Fragment } from 'react';

import {
  Card, Container, Form, Input, Error,
} from './styles';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';

class Login extends Component {
  state = {
    title: '',
    description: '',
    file: '',
    preferences: [
      { title: 'Front-end' },
      { title: 'Back-end', checked: true },
      { title: 'Mobile' },
      { title: 'DevOps' },
      { title: 'Gestão' },
      { title: 'Marketing' },
    ],
    error: false,
    loading: false,
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    console.log(this.state);

    // TODO POST to server to login
    this.setState({
      email: '',
      password: '',
      file: '',
      loading: true,
    });
  };

  render() {
    const { preferences, error, loading } = this.state;

    return (
      <Fragment>
        <Navbar />
        <Container>
          <Card>
            <Form onSubmit={this.handleSubmit} name="login">
              <label htmlFor="title">Título</label>
              <Input
                onChange={e => this.setState({ title: e.target.value })}
                placeholder="Digite o título do Meetup"
              />
              <label htmlFor="description">Descrição</label>
              <Input
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
              {preferences.map(pref => (
                <div className="checkbox">
                  <input
                    id={pref.title}
                    type="checkbox"
                    name="preference"
                    value={pref.checked}
                    checked={pref.checked}
                    onClick={(e) => {}}
                  />
                  <label htmlFor={pref.title}>
                    <span />
                    {pref.title}
                  </label>
                </div>
              ))}
              {error && <Error>TODO error</Error>}
              <Button type="submit">{loading ? 'Carregando' : 'Salvar'}</Button>
            </Form>
          </Card>
        </Container>
      </Fragment>
    );
  }
}

export default Login;
