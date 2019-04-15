import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 25px;
  width: 100% !important;

  background: #e5556e;

  img {
    width: 1.4rem;
  }
`;

export const NavMenu = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  max-width: 200px;
  margin-top: 22px;
  padding: 25px;
  background: rgba(0, 0, 0, 0.2);
  line-height: 1.5;

  text-decoration: none;
  list-style: none;
  font-size: 1.1rem;

  strong {
    margin-bottom: 10px;
    border-bottom: 2px solid #e5556e;
    max-width: 15ch;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    cursor: pointer;
    a:hover {
      color: #fff !important;
    }
  }

  .logout {
    border-bottom: 2px solid white;
    margin-right: 10px;
    cursor: pointer;
  }

  .row:hover {
    background-color: #ebebeb;
    color: #000;
    width: 100%;
    text-align: right;
  }
  a:hover {
    color: #000 !important;
  }
`;

export const NavLink = styled(Link)`
  color: #fff;
  font-size: 1, 2rem;
  font-weight: bold;
  margin: 0 20px 0 25px;
  text-decoration: none;
  cursor: pointer;
`;

export const MenuLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  margin-right: 10px;
  cursor: pointer;
  :hover {
    color: #fff;
  }
`;

export const ToggleBtn = styled.button`
  color: #fff;
  background: transparent;
  border: 0;
  cursor: pointer;
`;
