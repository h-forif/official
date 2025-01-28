import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { CardMedia, Chip, Rating, styled } from '@mui/material';
import MUICard from '@mui/material/Card';
import MUICardActions from '@mui/material/CardActions';
import MUICardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Button } from '@packages/components/Button';
import Image from '@packages/components/Image';
import { TAG_OPTIONS } from '@packages/constants';
import { Link } from '@tanstack/react-router';

export interface StudyCardProps {
  id: number;
  image?: string;
  title: string;
  primaryMentorName: string;
  secondaryMentorName?: string;
  difficulty: number;
  tag: string;
}

export function StudyCard({
  id,
  image,
  primaryMentorName,
  secondaryMentorName,
  title,
  difficulty,
  tag,
}: StudyCardProps) {
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link to={`/studies/${id}`} onClick={handleLinkClick}>
      <MUICard elevation={0} sx={{ border: 'none', borderRadius: 2 }}>
        <CardMedia
          component={'picture'}
          sx={{
            width: '100%',
            height: 240,
            bgcolor: 'white',
          }}
        >
          <Image
            src={image!}
            height={'100%'}
            alt={`card-image-${title}`}
            loading='lazy'
            title={title}
            width={'100%'}
            style={{ objectFit: 'cover' }}
          />
        </CardMedia>
        <MUICardContent
          sx={{
            textAlign: 'left',
            backgroundColor: 'background.default',
            height: 160,
          }}
        >
          <Typography
            variant='titleMedium'
            color='text.primary'
            fontWeight={600}
          >
            {title}
          </Typography>
          <Typography
            component={'p'}
            variant='labelMedium'
            sx={{ mb: 1.5 }}
            color='text.secondary'
          >
            {primaryMentorName || '미정'}{' '}
            {secondaryMentorName && `| ${secondaryMentorName}`}
          </Typography>
          <Chip label={getTag(tag)} color='primary' />
        </MUICardContent>
        <MUICardActions
          sx={{
            backgroundColor: 'background.default',
            justifyContent: 'space-between',
          }}
        >
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
          <StyledRating
            name='text-feedback'
            value={difficulty}
            readOnly
            precision={0.5}
            icon={<CircleIcon fontSize='small' />}
            emptyIcon={
              <CircleOutlinedIcon style={{ opacity: 0.55 }} fontSize='small' />
            }
          />
        </MUICardActions>
      </MUICard>
    </Link>
  );
}

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconFilled': {
    color: theme.palette.primary.main,
  },
  '& .MuiRating-iconEmpty': {
    color: theme.palette.primary.light,
  },
}));

const getTag = (tag: string) => {
  const tagOption = TAG_OPTIONS.find((option) => option.value === tag);
  if (!tagOption) return '기타';
  return tagOption.label;
};
