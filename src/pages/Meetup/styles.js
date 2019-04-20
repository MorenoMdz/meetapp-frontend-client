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

  img {
    max-width: 700px;
    max-height: 600px;
    margin-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 2px solid #e5556e;
    border-bottom-right-radius: 5px;

    @media screen and (max-width: 768px) {
      width: 400px;
    }

    @media screen and (max-height: 900px) {
      width: 600px;
    }

    @media screen and (max-height: 600px) {
      display: none;
    }
  }

  p {
    padding: 5px;
    margin-bottom: 20px;
    border-bottom: 2px solid #e5556e;
    border-bottom-right-radius: 5px;
  }

  button {
    width: 100%;
    margin: 30px 0;
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: 600px;

  small {
    color: #999;
  }
`;

export const ButtonWrapper = styled.div`
  height: 100px;
  .confirm {
    width: 100px;
    color: orange;
    margin-left: 10px;
    background: transparent;
    border: 0;
    border-bottom: 2px solid white;
  }
`;

export const Error = styled.span`
  color: #ff817e;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  padding-top: 10px;
`;
export const Success = styled.span`
  color: teal;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  padding-top: 10px;
`;
