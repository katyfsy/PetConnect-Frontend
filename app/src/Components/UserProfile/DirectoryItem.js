import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const DirectoryItem = (props) => {
  const { data } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };
  const rowItem = currentItems.map((element) => {
    let blankCityState = "";
    if (element.city === null && element.state === null) {
      blankCityState = "";
    } else {
      blankCityState = element.city + ", " + element.state;
    }
    return (
      <tr>
        <td>
          <a href={`/profile/${element.username}`}>{element.businessName} </a>
        </td>
        <td>
          <a href={`/petlist/${element.username}`}>
            {" "}
            <i class="bi bi-house-heart hheart"></i>
          </a>
        </td>
        <td>{blankCityState}</td>
        <td>{element.phone}</td>
        <td>{element.email}</td>
      </tr>
    );
  });

  return (
    <>
      {rowItem}
      <div className="pagination justify-content-left">
      <ReactPaginate
        breakLabel="..."
        nextLabel="NEXT"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="PREV"
        renderOnZeroPageCount={null}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'}
      />
      </div>
    </>
  );
};

export default DirectoryItem;
