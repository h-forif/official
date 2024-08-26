import { Card, CardActions, CardContent, CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';

import { Button } from '@packages/components/Button';
import Image from '@packages/components/Image';

import type { Project } from './../../types/project.type';

export default function ProjectCard({
  team_id,
  project_name,
  result_url,
  held_semester,
  held_year,
}: Project) {
  return (
    <a href={result_url} target='_blank'>
      <Card elevation={0} sx={{ border: 'none', borderRadius: 2 }}>
        <CardMedia
          component={'picture'}
          sx={{
            width: '100%',
            height: 240,
            bgcolor: 'white',
          }}
        >
          <Image
            src={
              'https://res.cloudinary.com/dheikvmxu/image/upload/v1724670092/studies/hackathon/hackathon-cover.png'
            }
            height={'100%'}
            alt={`card-image-${team_id}-${held_year}-${held_semester}`}
            loading='lazy'
            title={project_name}
            width={'100%'}
            style={{ objectFit: 'cover' }}
          />
        </CardMedia>
        <CardContent
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
            {project_name}
          </Typography>
        </CardContent>
        <CardActions
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
        </CardActions>
      </Card>
    </a>
  );
}
