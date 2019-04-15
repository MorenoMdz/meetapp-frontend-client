import React from 'react';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spinner = ({ loading }) => (
  <ClipLoader css={override} sizeUnit="px" size={150} color="#123abc" loading={loading} />
);

export default Spinner;
