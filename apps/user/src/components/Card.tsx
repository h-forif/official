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
      <MUICard
        elevation={3}
        sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}
      >
        <CardMedia
          sx={{ height: 180, border: '1px solid', borderColor: 'divider' }}
          image={image}
          title={title}
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
            variant='labelSmall'
            sx={{ mb: 1.5 }}
            color='text.secondary'
          >
            {mentor}
          </Typography>
        </MUICardContent>
        <MUICardActions sx={{ backgroundColor: 'background.default' }}>
          <Button size='small'>Learn More</Button>
        </MUICardActions>
      </MUICard>
    </Link>
  );
}
