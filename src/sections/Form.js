import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { getCalendars } from '../gapi';
import { Section, Title, Spacer, Button, Loading } from '../Components';

const CalendarList = styled.div`
  background: #f5f5f5;
  min-width: 200px;
  max-width: 90%;
  width: 15em;
  height: 10em;
  border-radius: 1em;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  pointer-events: auto;
`;

const CalendarItem = styled.div`
  flex-shrink: 0;
  width: 100%;
  min-height: 2em;
  display: flex;
  align-items: center;
  padding: 1em;
  box-shadow: inset 0 -1px #0000000d;
  pointer-events: auto;
  overflow: hidden;
  cursor: pointer;
  > span {
    display: inline-flex;
    height: 100%;
    align-items: center;
    flex-grow: 1;
    text-overflow: ellipsis;
    font-size: 0.75em;
    padding-right: 1.5em;
  }
  > div {
    height: 1em;
    width: 1em;
    border-radius: 50%;
    flex-shrink: 0;
  }
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #00000010;
    opacity: 0;
  }
  ${props => props.selected && css`
    &::before {
      opacity: 1;
    }
  `}
`;

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      lists: [],
      selected: 0
    };
  }
  componentDidMount () {
    if (this.state.lists.length === 0) {
      getCalendars()
        .then(res => {
          if (!res || !res.result || !res.result.items || res.result.items.length === 0) return;
          console.log(res);
          this.setState({ lists: res.result.items });
        });
    }
  }
  render () {
    return (
      <Section>
        <Title size='2'>Step one.</Title>
        <Title size='1.75' unique bold>Pick your calendar.</Title>
        <Spacer size='2' />
        <CalendarList>
          {this.state.lists.length === 0
            ? <Loading />
            : this.state.lists.map(c => (
              <CalendarItem
                selected={this.state.selected === c.id}
                onClick={e => this.setState({ selected: c.id })}
                key={c.id} >
                <span>{c.summary}</span>
                <div style={{ backgroundColor: c.backgroundColor }} />
              </CalendarItem>
            ))}
        </CalendarList>
        <Spacer size='2' />
        <Button type='button' value='Next' onClick={e => {}} />
      </Section>
    );
  }
}
