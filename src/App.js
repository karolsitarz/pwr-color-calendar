import React, { Component } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { on, handleSignInClick as signIn, handleSignOutClick as signOut, getCalendars } from './gapi';
import GlobalStyle from './GlobalStyle';

const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const spin = keyframes`
  to {
    transform: rotate(1080deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(1em) scale(0.95);
  }
`;

const Section = styled(Container)`
  animation: ${fadeIn} .5s ease backwards;
`;

const Loading = styled.div`
  height: 4em;
  width: 4em;
  border-radius: 50%;
  border-width: .25em;
  border-style: solid;
  animation: ${spin} 2s ease infinite;
  background-image: linear-gradient(white, white), var(--main);
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-color: transparent transparent #ddd #ddd;
`;

const Button = styled.input`
  color: #fff;
  background: var(--main);
  border-radius: .5em;
  padding: .5em 2em;
  border: none;
  transition: transform .3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(0.95);
  }
`;

const Title = styled.span`
  font-size: ${props => props.size || 1}em;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  ${props => props.unique && css`
    background-image: var(--main);
    background-size: cover;
    background-position: center;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  `}
`;
export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      section: 'INIT',
      lists: [],
      currentList: 0
    };
  }
  componentDidMount () {
    on('logOut', e => this.setState({ section: 'LOGIN' }));

    on('signIn', e => {
      if (this.state.lists.length === 0) {
        getCalendars()
          .then(res => console.log(res));
      }
      this.setState({ section: 'FORM' });
    });
  }
  render () {
    return (
      <Container>
        <GlobalStyle />
        {this.state.section !== 'INIT' ? null : (
          <Section>
            <Loading />
          </Section>
        )}
        {this.state.section !== 'LOGIN' ? null : (
          <Section>
            <Title size='2'>Color-code your timetable.</Title>
            <Title size='1.75' unique bold>The easy way.</Title>
            <Button type='button' value='Connect with Google' onClick={e => signIn()} />
          </Section>
        )}
        {this.state.section !== 'FORM' ? null : (
          <Section>
            aaaaaaaaaaaaaaaaaaaaaaaaa
            <Button type='button' value='Logout' onClick={e => signOut()} />
          </Section>
        )}
      </Container>
    );
  }
}
