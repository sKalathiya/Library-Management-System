export const renderPagination = (
    currentPage: number,
    totalPages: number,
    handlePageClick: (i: number) => void
) => {
    const pages = [];
    if (currentPage != 1) {
        pages.push(
            <button
                key={totalPages - 1}
                onClick={() => handlePageClick(currentPage - 1)}
                className="btn join-item bg-base-100 hover:bg-base-100 border-gray-600 border-2 mr-1"
            >
                <i className="fas fa-arrow-left"></i>
            </button>
        );
    }

    if (currentPage < totalPages) {
        pages.push(
            <button
                key={totalPages + 1}
                onClick={() => handlePageClick(currentPage + 1)}
                className="btn join-item bg-base-100 hover:bg-base-100  border-gray-600 border-2 mr-1"
            >
                <i className="fas fa-arrow-right"></i>
            </button>
        );
    }

    return pages;
};
