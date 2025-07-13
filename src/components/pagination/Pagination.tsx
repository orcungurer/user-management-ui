import { Fragment } from "react";
import Button from "../ui/button/Button";
import {
  ITEMS_PER_PAGE,
  MAX_PAGINATION_BUTTONS,
  PAGINATION_VISIBLE_RANGE,
} from "@/constants/pagination";
import { Info, PaginationWrapper } from "./Pagination.styles";

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  setCurrentPage,
}) => {
  const totalPage = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startingPage = Math.max(
    Math.min(
      currentPage - Math.floor(PAGINATION_VISIBLE_RANGE / 2),
      totalPage - MAX_PAGINATION_BUTTONS + 1
    ),
    1
  );

  const endingPage = Math.min(
    startingPage + MAX_PAGINATION_BUTTONS - 1,
    totalPage
  );

  const pageNumbers = Array.from(
    { length: endingPage - startingPage + 1 },
    (_, i) => i + startingPage
  );

  const isEmpty = pageNumbers.length === 0;

  const startItemIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItemIndex = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  return (
    <Fragment>
      {totalItems > 0 && (
        <Info>
          {startItemIndex}-{endItemIndex} of {totalItems} items
        </Info>
      )}
      <PaginationWrapper>
        <Button
          type="button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          outline={currentPage !== 1}
        >
          Prev
        </Button>

        <Button
          type="button"
          key={1}
          onClick={() => setCurrentPage(1)}
          outline={currentPage !== 1}
        >
          1
        </Button>

        {startingPage > 1 && (
          <Button type="button" disabled>
            ...
          </Button>
        )}

        {pageNumbers.map(
          (pageNumber) =>
            pageNumber !== 1 &&
            pageNumber !== totalPage && (
              <Button
                type="button"
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                outline={pageNumber !== currentPage}
              >
                {pageNumber}
              </Button>
            )
        )}

        {endingPage < totalPage - 1 && (
          <Button type="button" disabled>
            ...
          </Button>
        )}

        {startingPage !== endingPage && !isEmpty && (
          <Button
            type="button"
            key={totalPage}
            onClick={() => setCurrentPage(totalPage)}
            outline={currentPage !== totalPage}
          >
            {totalPage}
          </Button>
        )}

        <Button
          type="button"
          disabled={currentPage === totalPage || isEmpty}
          onClick={() => setCurrentPage(currentPage + 1)}
          outline={currentPage !== totalPage}
        >
          Next
        </Button>
      </PaginationWrapper>
    </Fragment>
  );
};

export default Pagination;
