import styled from 'styled-components';

export const Container = styled.div`
  height: 92vh;
  width: 100vw;
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
  width: 380px;
  max-height: 500px;

  p {
    margin-bottom: 20px;
  }

  h4 {
    margin-bottom: 10px;
  }

  button {
    width: 100%;
  }

  a {
    color: #6a666f;
    font-size: 1rem;
    text-decoration: none;
  }
`;

export const Form = styled.form`
  div {
    margin: 5px 0;
  }

  label {
    font-size: 18px;
  }

  #cover-image {
    margin-top: 10px;
  }

  input[type='checkbox']:not(old) {
    width: 2em;
    margin: 0;
    padding: 0;
    font-size: 1em;
    opacity: 0;
  }

  input[type='checkbox']:not(old) + label {
    display: inline-block;
    margin-left: -2em;
    line-height: 1.5em;
  }

  input[type='checkbox']:not(old) + label > span {
    display: inline-block;
    width: 0.875em;
    height: 0.875em;
    margin: 0.25em 0.5em 0.25em 0.25em;

    border-radius: 0.15em;
    background: #666;
    background-image: #666;
    vertical-align: bottom;
  }

  input[type='checkbox']:not(old):checked + label > span {
    background-image: linear-gradient(#e5556e, #e5556e);
  }
`;

export const Input = styled.input.attrs({
  placeholderTextColor: '#999',
})`
  background: transparent;
  border: 0;
  margin: 20px 0;
  margin-top: 0;
  padding: 10px;
  height: 50px;
  width: 100%;
  font-size: 1.2rem;
  color: #ccc;
`;

export const TextArea = styled.textarea.attrs({
  placeholderTextColor: '#999',
})`
  background: transparent;
  border: 0;
  margin: 20px 0;
  margin-top: 0;
  padding: 10px;
  height: 100px;
  width: 100%;
  font-size: 1.2rem;
  color: #ccc;
`;

export const Success = styled.p`
  color: #b061ff;
  margin-bottom: 20px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;

export const Error = styled.p`
  color: #ff817e;
  margin-bottom: 20px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;
