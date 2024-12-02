import * as React from 'react';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
});

const PaginationButton = styled('button')({
  border: '1px solid #ccc',
  borderRadius: '4px',
  margin: '0 4px',
  padding: '4px 8px',
  background: 'white',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
  '&:disabled': {
    border: '1px solid #e0e0e0',
    color: '#e0e0e0',
    cursor: 'default',
  },
});

export default function UsePagination() {
  const { items } = usePagination({
    count: 10,
  });

  return (
    <nav>
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…';
          } else if (type === 'page') {
            children = (
              <PaginationButton
                type="button"
                style={{
                  fontWeight: selected ? 'bold' : undefined,
                }}
                {...item}
              >
                {page}
              </PaginationButton>
            );
          } else {
            children = (
              <PaginationButton type="button" {...item}>
                {type}
              </PaginationButton>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </List>
    </nav>
  );
}
