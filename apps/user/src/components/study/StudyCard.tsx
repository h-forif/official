import { CardMedia } from '@mui/material';
import MUICard from '@mui/material/Card';
import MUICardActions from '@mui/material/CardActions';
import MUICardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Button } from '@packages/components/Button';
import { Link } from '@tanstack/react-router';

export interface StudyCardProps {
  id: number;
  image: string;
  title: string;
  mentor: string;
}

export function StudyCard({ id, image, mentor, title }: StudyCardProps) {
  return (
    <Link to={`/studies/${id}`} resetScroll>
      <MUICard elevation={0} sx={{ border: 'none', borderRadius: 2 }}>
        <CardMedia sx={{ height: 240 }} title={title}>
          <img
            src={image}
            height={'100%'}
            width={'100%'}
            style={{ objectFit: 'cover' }}
          />
        </CardMedia>
        <MUICardContent
          sx={{ textAlign: 'left', backgroundColor: 'background.default' }}
        >
          <Typography
            variant='titleMedium'
            color='text.primary'
            fontWeight={600}
          >
            {title}
          </Typography>
          <Typography
            variant='labelMedium'
            sx={{ mb: 1.5 }}
            color='text.secondary'
          >
            {mentor}
          </Typography>
        </MUICardContent>
        <MUICardActions sx={{ backgroundColor: 'background.default' }}>
          <Button
            size='small'
            disableElevation
            disableRipple
            sx={{
              '&.MuiButtonBase-root:hover': {
                bgcolor: 'transparent',
              },
            }}
          >
            Learn More
          </Button>
        </MUICardActions>
      </MUICard>
    </Link>
  );
}
