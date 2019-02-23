import React, { Component } from 'react';
import styled from 'styled-components';
import { on, handleSignOutClick as signOut } from './gapi';
import GlobalStyle from './GlobalStyle';
import { Button, fadeIn } from './Components';
import Login from './sections/Login';
import Init from './sections/Init';
import Form from './sections/Form';

const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Logout = styled(Button)`
  font-size: 0.75em;
  position: fixed;
  top: 1em;
  right: 1em;
  background: #eee;
  color: #666;
  animation: ${fadeIn} .5s ease backwards;
`;

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
        {this.state.section === 'LOGIN' || this.state.section === 'INIT' ? null : (
          <Logout type='button' value='Logout' onClick={e => signOut()} />
        )}
        {this.state.section !== 'INIT' ? null : (<Init />)}
        {this.state.section !== 'LOGIN' ? null : (<Login />)}
        {this.state.section !== 'FORM1' ? null : (<Form />)}
      </Container>
    );
  }
}
