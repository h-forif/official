import { CardMedia } from '@mui/material';
import MUICard from '@mui/material/Card';
import MUICardActions from '@mui/material/CardActions';
import MUICardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import FallbackImage from '@assets/images/cutie.svg';
import { Button } from '@packages/components/Button';
import Image from '@packages/components/Image';
import { Link } from '@tanstack/react-router';

export interface StudyCardProps {
  id: number;
  image?: string;
  title: string;
  mentor: string;
}

export function StudyCard({ id, image, mentor, title }: StudyCardProps) {
  return (
    <Link to={`/studies/${id}`} resetScroll>
      <MUICard elevation={0} sx={{ border: 'none', borderRadius: 2 }}>
        <CardMedia component={'picture'} sx={{ width: '100%', height: 240 }}>
          <Image
<<<<<<< HEAD
            src={image!}
=======
            src={image}
>>>>>>> 3612c02 (feat: API 연결)
            fallback={FallbackImage}
            height={'100%'}
            alt={`card-image-${title}`}
            loading='lazy'
            title={title}
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
