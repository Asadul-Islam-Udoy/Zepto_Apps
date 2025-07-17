interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // how many pages to show around current page, default 1
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: Props) => {
  if (totalPages === 0) return null;

  // Helper to create range of numbers
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  // Calculate page numbers to show with ellipsis
  // Always show first and last pages, currentPage ± siblingCount
  let pages: (number | "DOTS")[] = [];

  const totalPageNumbers = siblingCount * 2 + 5; // first, last, current, 2* siblings, 2 * DOTS

  if (totalPages <= totalPageNumbers) {
    // Show all pages
    pages = range(1, totalPages);
  } else {
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - 1);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      // Left side has no dots, right side has dots
      const leftRange = range(1, 3 + 2 * siblingCount);
      pages = [...leftRange, "DOTS", totalPages];
    } else if (showLeftDots && !showRightDots) {
      // Left side has dots, right side no dots
      const rightRange = range(totalPages - (3 + 2 * siblingCount) + 1, totalPages);
      pages = [1, "DOTS", ...rightRange];
    } else if (showLeftDots && showRightDots) {
      // Both sides have dots
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      pages = [1, "DOTS", ...middleRange, "DOTS", totalPages];
    }
  }

  return (
    <nav
      className="flex justify-center mt-10 space-x-2"
      aria-label="Pagination Navigation"
    >
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-indigo-300 hover:bg-indigo-700 transition"
        aria-label="Previous page"
      >
        Prev
      </button>

      {/* Page numbers */}
      {pages.map((page, idx) => {
        if (page === "DOTS") {
          return (
            <span key={`dots-${idx}`} className="px-3 py-2 text-gray-500 select-none">
              &hellip;
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`px-4 py-2 rounded transition ${
              page === currentPage
                ? "bg-indigo-700 text-white"
                : "bg-indigo-100 text-indigo-800 hover:bg-indigo-300"
            }`}
            aria-current={page === currentPage ? "page" : undefined}
            aria-label={page === currentPage ? `Page ${page}, current page` : `Go to page ${page}`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-indigo-300 hover:bg-indigo-700 transition"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
