import { CardMedia, Chip } from '@mui/material';
import MUICard from '@mui/material/Card';
import MUICardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface HackathonCard {
  image: string;
  title: string;
  type: string;
  desc: string;
}

export function HackathonCard({ image, title, desc, type }: HackathonCard) {
  return (
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
          sx={{ mb: 1 }}
        >
          {title}
        </Typography>
        <Typography
          variant='labelMedium'
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
            mb: 2,
          }}
          color='text.secondary'
        >
          {desc}
        </Typography>
        <Chip label='WEB' />
      </MUICardContent>
    </MUICard>
  );
}
