import React from 'react';
import { Section, Title, Spacer, Button } from '../Components';
import { handleSignInClick as signIn } from '../gapi';

export default props => (
  <Section>
    <Title size='2'>Color-code your timetable.</Title>
    <Title size='1.75' unique bold>The easy way.</Title>
    <Spacer $size='2' />
    <Button type='button' value='Connect with Google' onClick={e => signIn()} />
  </Section>
);
