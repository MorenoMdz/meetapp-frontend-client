import styled from 'styled-components';

export const Container = styled.div`
  width: 400px;
  margin: 5px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled.button`
  width: 100px;
  height: 30px;
  border: 0;
  background: teal;
  opacity: ${props => (props.disabled ? '0.3' : '1')};
  color: #fff;
  font-weight: bold;
  cursor: ${props => (props.disabled ? '' : 'pointer')};
  border-bottom-left-radius: ${props => (props.left ? '7px' : '')};
  border-bottom-right-radius: ${props => (props.right ? '7px' : '')};
`;
