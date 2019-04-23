import React from 'react';
import PropTypes from 'prop-types';

import { ButtonStyle } from './styles';

const Button = ({
  children, type, disabled, loading,
}) => (
  <ButtonStyle type={type} disabled={disabled} loading>
    {loading ? 'carregando...' : children}
  </ButtonStyle>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Button;
