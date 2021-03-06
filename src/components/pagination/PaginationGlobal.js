import Pagination from 'react-js-pagination';
import './PaginationGlobal.scss';

const PaginationGlobal = ({ activePage, totalItemsCount, handlePageChange }) => {
  return (
    <div className='d-flex justify-content-center'>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={10}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass='page-item'
        hideFirstLastPages={true}
        nextPageText='Next'
        prevPageText='Previous'
        hideDisabled={true}
      />
    </div>
  );
};

export default PaginationGlobal;
