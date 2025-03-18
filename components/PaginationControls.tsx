import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

const PaginationControls = (props: any) => {
  return (
    <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => props?.setCurrentPage((prev: any) => Math.max(prev - 1, 1))}
                className={props?.currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {props?.paginationItems}

            <PaginationItem>
              <PaginationNext
                onClick={() => props?.setCurrentPage((prev: any) => Math.min(prev + 1, props?.totalPages))}
                className={props?.currentPage === props?.totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
  )
}

export default PaginationControls