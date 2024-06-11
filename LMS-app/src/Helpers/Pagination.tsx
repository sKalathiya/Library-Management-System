export const renderPagination = (currentPage: number, totalPages: number, handlePageClick) => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    if( startPage != 1){
        pages.push(
            <button
              key={totalPages - 1}
              onClick={() => handlePageClick(startPage - 1)}
              className="btn join-item bg-base-100 hover:bg-base-100 border-gray-600 border-2 mr-1"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
          );
    }


    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={(currentPage === i ? "border-0 " : "") + "btn join-item bg-base-100 hover:bg-base-100  border-gray-600 border-2 mr-1"}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
  
    if (endPage < totalPages) {
      pages.push(
        <button
          key={totalPages + 1}
          onClick={() => handlePageClick(endPage + 1)}
          className="btn join-item bg-base-100 hover:bg-base-100  border-gray-600 border-2 mr-1"
        >
          <i className="fas fa-arrow-right"></i>
        </button>
      );
    }

    
  
    return pages;
  };
  