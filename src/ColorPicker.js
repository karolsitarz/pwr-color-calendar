import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const colorID = {
  0: '#ffffff',
  1: '#7986CB',
  2: '#33B679',
  3: '#8E24AA',
  4: '#E67C73',
  5: '#F6BF26',
  6: '#F4511E',
  7: '#039BE5',
  8: '#616161',
  9: '#3F51B5',
  10: '#0B8043',
  11: '#D50000'
};

const ColorList = styled.div`
  background: #f5f5f5;
  width: 14em;
  border-radius: 1em;
  overflow: hidden;
  display: grid;
  grid-template-rows: 3em 3em 3em;
  grid-template-columns: 3em 3em 3em 3em;
  pointer-events: auto;
  transition: all .3s ease;
  height: 0;
  margin: 0;
  padding: 0 1em;
  opacity: 0;

  ${props => props.open === true && css`
    height: 11em;
    margin: .5em 0;
    padding: 1em;
    opacity: 1;
  `}
`;

const Badge = styled.div`
  background: ${props => props.cid !== 0 ? colorID[props.cid] : props.def};
  width: 14em;
  height: 3em;
  padding: 1em;
  border-radius: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  cursor: pointer;
  &::before {
    content: '${props => props.text}';
    font-size: 0.75em;
    color: #fff;
  }
`;

const Color = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition:
    opacity .3s ease,
    transform .3s ease;

  background: ${props => props.cid === props.selected ? '#0000000f' : 'transparent'};
  border-radius: 1em;
  &::after {
    content: "";
    background: ${props => colorID[props.cid]};
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    ${props => props.cid === 0 && css`
      box-shadow:
        0 0 0 0.1em #ddd,
        0 0 0 0.1em #ddd inset;
    `}
    transition: transform .3s ease;
  }
  &:hover::after {
    transform: scale(1.1);
  }
`;

export default class ColorPicker extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selected: this.props.initial || 0,
      open: false
    };
  }
  select (id) {
    this.setState({ selected: id });
  }
  render () {
    return (
      <div>
        <Badge
          def={this.props.def}
          onClick={e => this.setState({ open: !this.state.open })}
          text={this.props.text}
          cid={this.state.selected} />
        <ColorList open={this.state.open}>
          <Color
            cid={0}
            onClick={e => this.select(0)}
            selected={this.state.selected} />
          <Color
            cid={7}
            onClick={e => this.select(7)}
            selected={this.state.selected} />
          <Color
            cid={4}
            onClick={e => this.select(4)}
            selected={this.state.selected} />
          <Color
            cid={5}
            onClick={e => this.select(5)}
            selected={this.state.selected} />
          <Color
            cid={1}
            onClick={e => this.select(1)}
            selected={this.state.selected} />
          <Color
            cid={9}
            onClick={e => this.select(9)}
            selected={this.state.selected} />
          <Color
            cid={6}
            onClick={e => this.select(6)}
            selected={this.state.selected} />
          <Color
            cid={2}
            onClick={e => this.select(2)}
            selected={this.state.selected} />
          <Color
            cid={8}
            onClick={e => this.select(8)}
            selected={this.state.selected} />
          <Color
            cid={3}
            onClick={e => this.select(3)}
            selected={this.state.selected} />
          <Color
            cid={11}
            onClick={e => this.select(11)}
            selected={this.state.selected} />
          <Color
            cid={10}
            onClick={e => this.select(10)}
            selected={this.state.selected} />
        </ColorList>
      </div>
    );
  }
}
