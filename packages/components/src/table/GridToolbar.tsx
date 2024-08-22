import { Box } from '@mui/material';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

export function GridToolbar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const semester = month >= 2 && month <= 7 ? 1 : 2;

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: 'Change density' } }}
      />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarQuickFilter />
      <GridToolbarExport
        csvOptions={{
          fileName: `${year}-${semester}-export`,
          utf8WithBom: true,
        }}
        slotProps={{
          tooltip: { title: 'Export data' },
          button: { variant: 'outlined' },
        }}
      />
    </GridToolbarContainer>
  );
}
