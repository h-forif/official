import { CardMedia } from '@mui/material';
import MUICard from '@mui/material/Card';
import MUICardActions from '@mui/material/CardActions';
import MUICardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Button } from '@packages/components/Button';
import { Link } from '@tanstack/react-router';

export interface StudyCardProps {
  image: string;
  title: string;
  mentor: string;
  href: string;
}

export function StudyCard({ href, image, mentor, title }: StudyCardProps) {
  return (
    <Link to={href} resetScroll>
      <MUICard elevation={3}>
        <CardMedia sx={{ height: 180 }} image={image} title={title} />
        <MUICardContent sx={{ textAlign: 'left' }}>
          <Typography variant='titleMedium' color='text.primary'>
            {title}
          </Typography>
          <Typography
            variant='labelSmall'
            sx={{ mb: 1.5 }}
            color='text.secondary'
          >
            {mentor}
          </Typography>
        </MUICardContent>
        <MUICardActions>
          <Button size='small'>Learn More</Button>
        </MUICardActions>
      </MUICard>
    </Link>
  );
}
