import { Toolbar, Typography } from '@mui/material';
import MUIAppBar from '@mui/material/AppBar';

const drawerWidth = 240;
export default function AppBar() {
  return (
    <MUIAppBar
      position='fixed'
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
        <Typography variant='labelLarge' noWrap component='div'>
          Permanent drawer
        </Typography>
      </Toolbar>
    </MUIAppBar>
  );
}
