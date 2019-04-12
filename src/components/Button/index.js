import React from 'react';
import PropTypes from 'prop-types';

import { ButtonStyle } from './styles';

const Button = ({ children, type, disabled }) => (
  <ButtonStyle type={type} disabled={disabled}>
    {children}
  </ButtonStyle>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Button;
