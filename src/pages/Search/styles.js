import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input.attrs({
  placeholderTextColor: '#999',
})`
  background: #2f2c38;
  color: #ccc;
  border: 0;
  margin: 20px 0;
  padding: 10px;
  text-align: left;
  height: 50px;
  width: 900px;
  font-size: 1.2rem;

  @media screen and (max-width: 768px) {
    width: 400px;
  }
`;

export const Error = styled.p`
  color: #ff817e;
  margin-bottom: 20px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;
