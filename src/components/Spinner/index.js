import React from 'react';
import { css } from '@emotion/core';
import { PropagateLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 33% 40%;
`;

const Spinner = ({ loading }) => (
  <PropagateLoader css={override} sizeUnit="px" size={15} color="#ebebeb" loading={loading} />
);

export default Spinner;
