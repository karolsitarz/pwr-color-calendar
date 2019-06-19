import React from 'react';
import { Section, Title, Spacer, Button } from '../components';
import { handleSignInClick as signIn } from '../util/gapi';

export default props => (
  <Section>
    <Title size='2'>Color-code your <Title unique bold>PWR</Title> timetable.</Title>
    <Title size='1.75' unique bold>The easy way.</Title>
    <Spacer $size='2' />
    <Button type='button' value='Connect with Google' onClick={e => signIn()} />
  </Section>
);
