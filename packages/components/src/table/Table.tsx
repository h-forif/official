import { HTMLAttributes, JSXElementConstructor } from 'react';

import { Box, SxProps, Theme } from '@mui/material';
import {
  DataGrid,
  DataGridProps,
  FooterPropsOverrides,
} from '@mui/x-data-grid';

import { GridToolbar } from './GridToolbar';
import NoResultsOverlay from './NoResultOverlay';

interface TableProps extends DataGridProps {
  footer?:
    | JSXElementConstructor<
        HTMLAttributes<HTMLDivElement> & {
          sx?: SxProps<Theme>;
        } & FooterPropsOverrides
      >
    | undefined;
}
/**
 * A fast and extendable React data table and React data grid.
 * @param rows
 * @param columns
 * @returns
 */
export function Table({ rows, columns, footer, ...props }: TableProps) {
  return (
    <Box minHeight={320} bgcolor={'background.default'}>
      <DataGrid
        rows={rows}
        autoHeight
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        localeText={{
          toolbarColumns: '열 선택',
          toolbarFilters: '필터',
          toolbarDensity: '행 높이 조절',
          toolbarExport: '내보내기',
        }}
        disableRowSelectionOnClick
        pageSizeOptions={[10]}
        slots={{
          toolbar: GridToolbar,
          footer: footer,
          noResultsOverlay: NoResultsOverlay,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
          loadingOverlay: {
            variant: 'skeleton',
            noRowsVariant: 'skeleton',
          },
        }}
        {...props}
      />
    </Box>
  );
}
