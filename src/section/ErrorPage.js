import React, { Component } from 'react';
import { Section, Title } from '../components';

export default class ErrorBoundary extends Component {
  constructor (props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError (e) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch (error, info) {
    console.error(error, info);
  }

  render () {
    if (this.state.hasError) {
      return (
        <Section>
          <Title size='2' unique bold>Uh oh!.</Title>
          <Title size='1.75'>Something went terribly wrong. Try again later, please.</Title>
          <Title size='1'>Check console for more info.</Title>
        </Section>
      );
    }

    return this.props.children;
  }
}
