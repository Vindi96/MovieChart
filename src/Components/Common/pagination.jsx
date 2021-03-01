import React from 'react';
import _ from 'lodash';
import PropTypes from "prop-types";

const Pagination = (props) => {
  const {itemsCount,pageSize,onPage}=props;
  const pagesCount=itemsCount/pageSize;
  const pages=_.range(1,pagesCount+1);
  return <nav aria-label="Page navigation example">
  <ul className="pagination"> 
    {pages.map(page=>(
    <li key={page} className="page-item"m>
      <a className="page-link" onClick={()=>onPage(page)}>{page}</a>
      </li>
    ))}   
    
  </ul>
</nav>;
}
Pagination.propTypes={
  itemsCount: PropTypes.number.isRequired,
  pageSize:PropTypes.number.isRequired,
  onPage:PropTypes.func.isRequired,

}
 
export default Pagination;

