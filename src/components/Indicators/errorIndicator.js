import React from 'react';
import { Alert, Space } from 'antd';

export const ErrorIndicator = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message="Error" description="Something went wrong :(" type="error" showIcon />
  </Space>
);

export const EmptyIndicator = () => (
  <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert message="Information" description="Unfortunately, your search returned no results" type="info" showIcon />
  </Space>
);
