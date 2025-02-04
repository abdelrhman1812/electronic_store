import ReactResponsivePagination from "react-responsive-pagination";

const Pagination = ({ data, itemsPerPage, currentPage, setCurrentPage }) => {
  // Pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <ReactResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Pagination;
