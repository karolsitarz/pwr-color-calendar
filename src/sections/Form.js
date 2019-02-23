import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { getCalendars, getEvents, updateEventColor } from '../gapi';
import { Section, Title, Spacer, Button, Loading } from '../Components';
import ColorPicker from '../ColorPicker';
import Bottleneck from 'bottleneck/es5';

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

const ProgressBar = styled.div`
  border-radius: 1000px;
  height: .15em;
  background: #ddd;
  min-width: 50%;
  margin: 2em 0;
  overflow: hidden;
  > div {
    background: var(--main);
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    transition: width .1s ease;
    border-radius: 1000px;
    width: calc(${props => props.progress} / ${props => props.max} * 100%);
  }
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
      },
      progress: 0
    };
    this.values = {
      W: 4,
      C: 2,
      L: 9,
      S: 3,
      P: 5
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
            <Button disabled={isNaN(this.state.selected)} type='button' value='Next' onClick={e => this.checkIfHas()} />
          </Section>
        )}
        {this.state.page !== -1 ? null : (
          <Section>
            <Loading />
            <Spacer size='2' />
            <Title size='1.25'>Please wait.</Title>
          </Section>
        )}
        {this.state.page !== 1 ? null : (
          <Section>
            <Title size='2'>Step two.</Title>
            <Title size='1.75' unique bold>Pick your colors.</Title>
            <Spacer size='2' />
            <ColorPicker
              onSelect={v => (this.value.W = v)}
              def={this.state.lists[this.state.selected].backgroundColor}
              text='Wykład'
              visible={this.state.types.W}
              initial={this.values.W} />
            <ColorPicker
              onSelect={v => (this.value.C = v)}
              def={this.state.lists[this.state.selected].backgroundColor}
              text='Ćwiczenia'
              visible={this.state.types.C}
              initial={this.values.C} />
            <ColorPicker
              onSelect={v => (this.value.L = v)}
              def={this.state.lists[this.state.selected].backgroundColor}
              text='Laboratorium'
              visible={this.state.types.L}
              initial={this.values.L} />
            <ColorPicker
              onSelect={v => (this.value.S = v)}
              def={this.state.lists[this.state.selected].backgroundColor}
              text='Seminarium'
              visible={this.state.types.S}
              initial={this.values.S} />
            <ColorPicker
              onSelect={v => (this.value.P = v)}
              def={this.state.lists[this.state.selected].backgroundColor}
              text='Projekt'
              visible={this.state.types.P}
              initial={this.values.P} />
            <Spacer size='2' />
            <Button type='button' value='Change colors' onClick={e => this.changeColors()} />
          </Section>
        )}
        {this.state.page !== -1 ? null : (
          <Section>
            <Loading />
            <Spacer size='1' />
            <ProgressBar progress={this.state.progress} max={this.state.events.length} />
            <Spacer size='2' />
            <Title size='1.25'>Please be patient.</Title>
          </Section>
        )}
        {this.state.page !== 2 ? null : (
          <Section>
            <Title size='2'>Congratulations!.</Title>
            <Title size='1.75' unique bold>Everything's nice and pretty.</Title>
          </Section>
        )}
      </Section>
    );
  }
  checkIfHas () {
    this.setState({ page: -1 });
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
        this.state.events = events;

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
          page: 1,
          types: { W, C, L, S, P }
        });
      });
  }
  changeColors () {
    this.setState({ page: -2 });
    const limiter = new Bottleneck({
      maxConcurrent: 1,
      minTime: 225
    });

    for (let e of this.state.events) {
      if (e.summary[1] === ' ' &&
      // pierwsza litera jest jedna z dozwolonych
      (e.summary[0] === 'W' || e.summary[0] === 'C' || e.summary[0] === 'L' || e.summary[0] === 'S' || e.summary[0] === 'P') &&
      this.state.types[e.summary[0]] === true &&
      this.values[e.summary[0]] &&
      (!e.colorId || (e.colorId && e.colorId !== this.values[e.summary[0]]))) {
        limiter.schedule(() => updateEventColor(this.state.lists[this.state.selected].id, e.id, this.values[e.summary[0]])).then(res => {
          console.log('Finished', res);
          this.setState({ progress: this.state.progress + 1 });
          limiter.running().then(count => {
            console.log(count + ' left');
            if (count === 0) this.setState({ page: 2 });
          });
        });
      } else {
        this.setState({ progress: this.state.progress + 1 });
      }
    }
  }
}
