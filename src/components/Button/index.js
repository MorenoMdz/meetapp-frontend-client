import React from 'react';
import PropTypes from 'prop-types';

import { ButtonStyle } from './styles';

const Button = ({
  children, onClick, type, disabled,
}) => (
  <ButtonStyle type={type} disabled={disabled} onClick={onClick}>
    {children}
  </ButtonStyle>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
