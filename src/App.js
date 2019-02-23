import React, { Component } from 'react';
import { on } from './gapi';
import GlobalStyle from './GlobalStyle';
import { Container } from './Components';
import Login from './sections/Login';
import Init from './sections/Init';
import Form from './sections/Form';

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
        {this.state.section !== 'INIT' ? null : (<Init />)}
        {this.state.section !== 'LOGIN' ? null : (<Login />)}
        {this.state.section !== 'FORM1' ? null : (<Form />)}
      </Container>
    );
  }
}
