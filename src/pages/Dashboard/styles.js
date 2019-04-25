import styled from 'styled-components';

export const Container = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto;

  h4 {
    margin: 20px 0;
  }

  div {
    justify-content: center;
    margin-bottom: 30px;
  }
`;

export const Error = styled.p`
  color: #ff817e;
  margin-bottom: 20px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;
