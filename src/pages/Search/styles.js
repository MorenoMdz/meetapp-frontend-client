import styled from 'styled-components';

export const Container = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;

  h4 {
    margin: 20px 0 20px 10px;
  }

  #meetups {
    max-width: 90%;
  }
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
  width: 90%;
  font-size: 1.2rem;
`;

export const Error = styled.p`
  color: #ff817e;
  margin-bottom: 20px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;
