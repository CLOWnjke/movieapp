import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import './spin.css';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);
const LoaderSpin = () => {
  return (
    <div className="spin">
      <Spin indicator={antIcon} />
    </div>
  );
};
export default LoaderSpin;
