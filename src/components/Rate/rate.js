import React from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';

export default class Stars extends React.Component {
  render() {
    const { starChange, newRating } = this.props;

    return (
      <Rate
        allowHalf
        defaultValue={newRating}
        value={newRating}
        count={10}
        style={{ fontSize: 18, height: 202, marginLeft: 0 }}
        onChange={(star) => starChange(star)}
      />
    );
  }
}

Stars.defaultProps = {
  starChange: () => {},
};

Stars.propTypes = {
  starChange: PropTypes.func,
};
