import { Box } from '@mui/material';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';

interface TableProps extends DataGridProps {
  width?: string;
  height?: string;
}
/**
 * A fast and extendable React data table and React data grid.
 * @param rows
 * @returns
 */
export function Table({
  rows,
  columns,
  autoHeight = false,
  width = '100%',
  height = 'auto',
}: TableProps) {
  return (
    <Box sx={{ width: width, height: height }}>
      <DataGrid autoHeight={autoHeight} rows={rows} columns={columns} />
    </Box>
  );
}
