import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props =>
    props.remove ? 'inherit' : props.theme.primary};
  color: ${props => (props.remove ? props.theme.primary : props.theme.text)};
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  border: ${props =>
    props.remove ? `1px solid ${props.theme.primary}` : 'none'};

  &:hover {
    background-color: ${props => (props.remove ? 'none' : props.theme.text)};
    color: ${({ theme }) => theme.primary};
  }
`;

export default Button;
