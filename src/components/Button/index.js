import React from 'react';
import PropTypes from 'prop-types';

import { ButtonStyle } from './styles';

const Button = ({ children, type }) => <ButtonStyle type={type}>{children}</ButtonStyle>;

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Button;
