import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  max-width: 1200px;
  background: transparent;

  .flex {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 10px;
    /* border: 2px teal solid; */
  }

  .grid {
    display: grid;
    grid-gap: 10px;
    align-content: center;

    @media screen and (min-width: 468px) {
      grid-template-columns: auto;
    }

    @media screen and (min-width: 768px) {
      grid-template-columns: auto auto;
    }

    @media screen and (min-width: 1024px) {
      grid-template-columns: auto auto auto;
    }
  }
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
  }
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e5556e;
  border: 0;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
