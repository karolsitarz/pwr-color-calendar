import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { getCalendars, getEvents } from '../gapi';
import { Section, Title, Spacer, Button, Loading, Container } from '../Components';

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
  border-radius: 1em;
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
    transition: opacity .3s ease;
  }
  ${props => props.selected && css`
    &::before {
      opacity: 1;
    }
  `}
`;

export const slide = keyframes`
  from {
    opacity: 0;
    transform: translateX(1em) scale(0.95);
  }
`;
export const Page = styled(Container)`
  animation: ${slide} .5s ease backwards;
`;

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      lists: [],
      selected: undefined,
      page: 0
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
        {this.state.page !== 0 ? null : (
          <Page>
            <Title size='2'>Step one.</Title>
            <Title size='1.75' unique bold>Pick your calendar.</Title>
            <Spacer size='2' />
            <CalendarList>
              {this.state.lists.length === 0
                ? <Loading />
                : this.state.lists.map((c, i) => (
                  <CalendarItem
                    selected={this.state.selected === i}
                    onClick={e => this.setState({ selected: i })}
                    key={c.id} >
                    <span>{c.summary}</span>
                    <div style={{ backgroundColor: c.backgroundColor }} />
                  </CalendarItem>
                ))}
            </CalendarList>
            <Spacer size='2' />
            {isNaN(this.state.selected) ? null
              : <Button type='button' value='Next' onClick={e => this.checkIfHas()} /> }
          </Page>
        )}
      </Section>
    );
  }
  checkIfHas () {
    getEvents(this.state.lists[this.state.selected].id)
      .then(res => {
        if (!res || !res.result || !res.result.items || res.result.items.length === 0) return;
        console.log(res);
        const events = res.result.items;
        // this.setState({ lists: res.result.items });
        const W = events.some(e => e.summary &&
          typeof e.summary === 'string' &&
          e.summary.substring(0, 2) === 'W ');

        const C = events.some(e => e.summary &&
          typeof e.summary === 'string' &&
          e.summary.substring(0, 2) === 'C ');

        const L = events.some(e => e.summary &&
          typeof e.summary === 'string' &&
          e.summary.substring(0, 2) === 'L ');

        const S = events.some(e => e.summary &&
          typeof e.summary === 'string' &&
          e.summary.substring(0, 2) === 'S ');

        const P = events.some(e => e.summary &&
          typeof e.summary === 'string' &&
          e.summary.substring(0, 2) === 'P ');
      });
  }
}
