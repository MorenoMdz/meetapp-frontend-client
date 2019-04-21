import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: 900px;
  margin-top: 100px;

  a {
    text-decoration: underline;
    color: #fff;
  }

  p {
    padding: 5px;
    margin-bottom: 20px;
  }
`;
