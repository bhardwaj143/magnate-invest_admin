import React, { useState } from "react";
import { useParams } from "react-router";
import Pagination from "react-js-pagination";

const Paging = (props) => {
  const { page } = useParams();
  // const [activePage, setCurrentPage] = useState(page * 1);
  const handlePageChange = (pageNumber) => {
    props.searchPage(pageNumber);
    // setCurrentPage(pageNumber);
  };

  return (
    <>
      {(props.status === 200 || props.status === 404) &&
      props.totalCount !== null ? (
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-12">
              <div className="pagination">
                <Pagination
                  activePage={page * 1}
                  itemsCountPerPage={10}
                  totalItemsCount={props.totalCount ? props.totalCount : null}
                  pageRangeDisplayed={5}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Paging;
