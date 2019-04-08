import styled from 'styled-components';

export const Container = styled.div`
  min-height: 600px;
  max-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 380px;

  img {
    max-width: 900px;
    max-height: 400px;
    margin: 20px;

    @media screen and (max-width: 768px) {
      width: 400px;
    }

    @media screen and (max-height: 900px) {
      width: 400px;
    }

    @media screen and (max-height: 600px) {
      display: none;
    }
  }

  p {
    margin-bottom: 20px;
  }

  button {
    width: 100%;
    margin: 30px 0;
  }

  a {
    color: #6a666f;
    font-size: 1rem;
    text-decoration: none;
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 380px;

  small {
    color: #999;
  }

  p {
    margin: 30px 0;
  }
`;

export const Error = styled.p`
  color: #ff817e;
  margin-bottom: 20px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;
