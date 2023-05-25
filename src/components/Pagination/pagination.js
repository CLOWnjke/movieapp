import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

import './pagination.css';

const PagePagination = ({ totalPages, changePage, page }) => {
  const pageCount = totalPages * 10;

  return (
    <div className="pagination">
      <Pagination current={page} onChange={changePage} total={pageCount} showSizeChanger={false} />
    </div>
  );
};

PagePagination.defaultProprs = {
  totalPages: 50,
  changePage: () => {},
  page: 1,
};

PagePagination.propTypes = {
  totalPages: PropTypes.number,
  changePage: PropTypes.func,
  page: PropTypes.number,
};

export default PagePagination;
