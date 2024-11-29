import React from 'react';
import { Stack, Pagination } from '@mui/material';

const CustomPagination = ({ currentPage, setCurrentPage,totalRecords }) => {
    const handlePageClick = (_, value) => {
        setCurrentPage(value);
      };
  return (
    <Stack spacing={2}>
      <Pagination
        onChange={handlePageClick}
        page={currentPage}
        count={totalRecords} // Set the total number of pages
        sx={{
          '.MuiPaginationItem-root': {
            color: '#7e7f8c', // Text color for pagination items
            '&.Mui-selected': {
              backgroundColor: '#1f212a', // Background color when selected
              color: '#fff' // Text color for the selected page
            },
            '&:hover': {
              backgroundColor: '#1f212a', // Same background color on hover as selected
              color: '#fff' // Text color for hover to match the selected state
            }
          }
        }}
      />
    </Stack>
  );
};

export default CustomPagination;
