import styled from 'styled-components';

export const ButtonStyle = styled.button`
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  background: #e5556e;
  height: 50px !important;
  width: 350px !important;
  margin-top: 10px;

  border: 0;
  border-radius: 25px;

  cursor: ${props => (props.disabled ? '' : 'pointer')};

  background: ${props => (props.disabled ? 'grey' : '#e5556e')};
`;
