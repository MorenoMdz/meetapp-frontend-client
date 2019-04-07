import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  small {
    color: #6a666f;
    font-size: 1rem;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 500px;
  max-width: 400px;

  button {
    width: 100%;
  }
`;

export const Logo = styled.img`
  width: 32px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 30px;
  width: 100%;
`;

export const Input = styled.input.attrs({
  placeholderTextColor: '#999',
})`
  background: transparent;
  border: 0;
  margin: 5px;
  height: 50px;
  width: 100%;
  font-size: 1.2rem;
  color: #fff;
`;

export const Error = styled.p`
  color: #ff817e;
  margin-bottom: 20px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;
