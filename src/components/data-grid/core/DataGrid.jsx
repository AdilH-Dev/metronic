/* eslint-disable no-unused-vars */

import { DataGridInner, DataGridProvider } from '.';
const DataGrid = props => {
  console.log(props,"adadadadadadad")
  return <DataGridProvider {...props}>
      <DataGridInner />
    </DataGridProvider>;
};
export { DataGrid };