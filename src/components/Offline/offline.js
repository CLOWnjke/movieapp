import React from 'react';
import { Offline } from 'react-detect-offline';

const OfflineIndicator = () => (
  <div>
    <Offline>
      <div
        style={{
          textAlign: 'center',
          fontSize: '50px',
        }}
      >
        You are offline. Check your internet connection
      </div>
    </Offline>
  </div>
);

export default OfflineIndicator;
