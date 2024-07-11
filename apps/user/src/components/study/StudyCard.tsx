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
        <CardMedia
          component='img'
          height={240}
          image={image}
          title={title}
          alt={`card-image-${title}`}
          loading='lazy'
        />
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
            size='large'
            disableElevation
            disableRipple
            sx={{
              '&.MuiButtonBase-root:hover': {
                bgcolor: 'transparent',
              },
            }}
          >
            자세히 보기
          </Button>
        </MUICardActions>
      </MUICard>
    </Link>
  );
}
