import styled from 'styled-components';

const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }

  return <Notify error={error}>{message}</Notify>;
};

export default Notification;

//Styles

const Notify = styled.div`
  color: ${props => (props.error ? 'red' : 'green')};
  background: ${({ theme }) => theme.text};
  font-size: 1rem;
  border-style: 1px solid ${({ theme }) => theme.primary};
  padding: 0.5rem;
  margin-inline: auto;
  position: absolute;
  max-width: 40rem;
  height: 2rem;
  top: 0;
`;
