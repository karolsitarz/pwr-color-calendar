import React, { Component } from 'react';
import { on } from '../util/gapi';
import GlobalStyle from './GlobalStyle';
import { Container } from '.';
import Login from '../section/Login';
import Init from '../section/Init';
import Form from '../section/Form';
import ErrorPage from './ErrorPage';

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      section: 'INIT'
    };
  }
  componentDidMount () {
    on('logOut', e => this.setState({ section: 'LOGIN' }));
    on('signIn', e => this.setState({ section: 'FORM1' }));
  }
  render () {
    return (
      <Container>
        <GlobalStyle />
        <ErrorPage>
          {this.state.section !== 'INIT' ? null : (<Init />)}
          {this.state.section !== 'LOGIN' ? null : (<Login />)}
          {this.state.section !== 'FORM1' ? null : (<Form />)}
        </ErrorPage>
      </Container>
    );
  }
}
