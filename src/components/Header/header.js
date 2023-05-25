import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import './header.css';

export default class Header extends React.Component {
  render() {
    const { onSearch } = this.props;

    return (
      <header className="header">
        <form onSubmit={(e) => e.preventDefault()}>
          <input className="search-input" placeholder="Type to search..." onChange={debounce(onSearch, 500)}></input>
        </form>
      </header>
    );
  }
}

Header.defaultProps = {
  onSearch: () => {},
};

Header.propTypes = {
  onSearch: PropTypes.func,
};
