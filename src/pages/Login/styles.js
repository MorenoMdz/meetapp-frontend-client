import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.img`
  width: 32px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  width: 300px;
`;

export const Input = styled.input.attrs({
  placeholderTextColor: '#999',
})`
  background: #fff;
  border-radius: 4px;
  padding: 0 20px;
  margin: 5px;
  height: 52px;
  font-size: 16px;
  color: #333;
`;

export const Button = styled.button`
  background: #5dc4b3;
  border-radius: 4px;
  height: 52px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const Error = styled.p`
  color: #ff817e;
  margin-bottom: 20px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;
