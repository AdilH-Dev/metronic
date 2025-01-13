import React from 'react';
import { DataGridTableBodyRowSelect, useDataGrid } from '..';
const DataGridTableBodyRow = ({ id, children, className, onRowClick, data }) => {
  const { props } = useDataGrid();
  return (
    <tr
      className={className && className}
      onClick={() => {
        onRowClick(data?.original?.id);
      }}
    >
      {props.rowSelect && <DataGridTableBodyRowSelect id={id} />}
      {children}
    </tr>
  );
};
export { DataGridTableBodyRow };
