import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  background: transparent;
`;

export const MeetupCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;

  width: 300px;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px 10px 0 0;
  }

  #title-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 0 0 10px 10px;

    color: #000;
    padding: 10px;
    background: #fff;
    width: 100%;

    #title-text {
      display: flex;
      flex-direction: column;
      align-items: center;

      small {
        margin: -10px 0 15px 0;
      }
    }

    button {
      background: #e5556e;
      border-radius: 50%;
      border: 0;
      color: white;
      width: 50px;
      height: 50px;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }
`;
