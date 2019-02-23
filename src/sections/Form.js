import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { getCalendars, getEvents } from '../gapi';
import { Section, Title, Spacer, Button, Loading } from '../Components';
import ColorPicker from '../ColorPicker';

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

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      lists: [],
      selected: undefined,
      page: 0,
      types: {
        W: false,
        C: false,
        L: false,
        S: false,
        P: false
      }
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
          <Section>
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
          </Section>
        )}
        {this.state.page !== 1 ? null : (
          <Section>
            <Loading />
            <Spacer size='2' />
            <Title size='1.25'>Please wait.</Title>
          </Section>
        )}
        {this.state.page !== 2 ? null : (
          <Section>
            <ColorPicker
              def={this.state.lists[this.state.selected].backgroundColor}
              text='Wykład'
              initial={4} />
            <ColorPicker
              def={this.state.lists[this.state.selected].backgroundColor}
              text='Ćwiczenia'
              initial={2} />
            <ColorPicker
              def={this.state.lists[this.state.selected].backgroundColor}
              text='Laboratorium'
              initial={9} />
            <ColorPicker
              def={this.state.lists[this.state.selected].backgroundColor}
              text='Seminarium'
              initial={3} />
            <ColorPicker
              def={this.state.lists[this.state.selected].backgroundColor}
              text='Projekt'
              initial={5} />
          </Section>
        )}
      </Section>
    );
  }
  checkIfHas () {
    this.setState({ page: 1 });
    getEvents(this.state.lists[this.state.selected].id)
      .then(res => {
        if (!res || !res.result || !res.result.items) {
          window.alert('Please try again later.');
          this.setState({ page: 0 });
          return;
        }
        if (res.result.items.length === 0) {
          window.alert('Please choose a different calendar.');
          this.setState({ page: 0 });
          return;
        }
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

        if (!W && !C && !L && !S && !P) {
          window.alert('Please choose a different calendar.');
          this.setState({ page: 0 });
          return;
        }
        this.setState({
          page: 2,
          types: { W, C, L, S, P }
        });
      });
  }
}
