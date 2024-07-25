import MUIAppBar from '@mui/material/AppBar';

export default function AppBar() {
  return (
    <div>
      <MUIAppBar
        position='sticky'
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          width: '100%',
          zIndex: 1100,
        }}
      >
        AppBar
      </MUIAppBar>
    </div>
  );
}
