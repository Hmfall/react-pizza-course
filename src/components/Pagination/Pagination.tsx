import React, { FC } from 'react';
import classes from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
   currentPage: number;
   onChangePage: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ currentPage, onChangePage }) => {
   return (
      <ReactPaginate
         className={classes.root}
         breakLabel="..."
         nextLabel=">"
         previousLabel="<"
         onPageChange={(event) => onChangePage(event.selected + 1)}
         pageRangeDisplayed={4}
         pageCount={3}
         forcePage={currentPage - 1}
      />
   );
};

export default Pagination;