import classnames from 'classnames';
import { usePagination, DOTS } from '../../Hooks/usePagination';

const Pagination = props => {
    const {
      onPageChange,
      totalPagesCount,
      siblingCount = 1,
      currentPage,
      className
    } = props;
  
    const paginationRange = usePagination({
      currentPage,
      totalPagesCount,
      siblingCount
    });

    if (currentPage === 0 || totalPagesCount === 0 || paginationRange.length < 2) {
      return null;
    }
  
    const onNext = () => { onPageChange(currentPage + 1);  };
    const onPrevious = () => { onPageChange(currentPage - 1); };
    let lastPage = paginationRange[paginationRange.length - 1];
    
    return (
      <ul className={classnames('pagination', { [className]: className })}>
        <li key="&laquo" className={classnames('page-item', { disabled: currentPage === 1 })} onClick={onPrevious}>
          <button className="page-link">&laquo;</button>
        </li>        
        {paginationRange.map(pageNumber => {
          if (pageNumber === DOTS) {
            return <li key={Math.random()} className="page-item dots disabled">
              <button className="page-link">&#8230;</button>
              </li>;
          }  
          return (
            <li key={pageNumber} className={classnames('page-item', { active: pageNumber === currentPage })} onClick={() => onPageChange(pageNumber)}>
                <button className="page-link">{pageNumber}</button>
            </li>
          );
        })}
        <li key="&raquo" className={classnames('page-item', { disabled: currentPage === lastPage })} onClick={onNext}>
          <button className="page-link">&raquo;</button>
        </li>
      </ul>
    );
  };

  export default Pagination;