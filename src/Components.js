import styled, { keyframes, css } from 'styled-components';

export const Container = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(1em) scale(0.95);
  }
`;
export const Section = styled(Container)`
  animation: ${fadeIn} .5s ease backwards;
`;

export const spin = keyframes`
  to {
    transform: rotate(1080deg);
  }
`;
export const Loading = styled.div`
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

export const Button = styled.input`
  color: #fff;
  background: var(--main);
  border-radius: .5em;
  padding: .5em 2em;
  border: none;
  transition: transform .3s ease;
  cursor: pointer;
  pointer-events: auto;

  &:hover {
    transform: scale(0.95);
  }
`;

export const Title = styled.span`
  text-align: center;
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

export const Spacer = styled.span`
  align-self: stretch;
  min-height: ${props => props.size || 0}em;
  min-width: ${props => props.size || 0}em;
  max-height: 100%;
  max-width: 100%;
`;
