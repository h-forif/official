import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from '@mui/material/Typography';

import hackathon3 from '@assets/images/main/hackathon3.jpg';
import Hackathon from '@assets/images/main/hackathon.png';
import invite_lecture from '@assets/images/main/invite_lecture.jpg';
import MT from '@assets/images/main/mt_2023.jpeg';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <ImageList
      sx={{ width: '100%', height: 'auto', px: { sm: 16, xs: 4 } }}
      gap={32}
      variant='quilted'
      cols={4}
      rowHeight={120}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.title}
          cols={item.cols || 1}
          rows={item.rows || 1}
          sx={{ position: 'relative' }} // Add relative positioning to parent
        >
          {item.img ? (
            <img
              {...srcset(item.img, 240, item.rows, item.cols)}
              alt={item.title}
              loading='lazy'
              style={{
                borderRadius: '16px',
                filter: 'brightness(50%)', // Darkening filter
              }}
            />
          ) : (
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              width={'100%'}
              height={'100%'}
              bgcolor={'background.default'}
              color={'text.primary'}
              sx={{
                borderRadius: 2,
                padding: 1,
              }}
            >
              <Typography variant='headlineLarge'>{item.title}</Typography>
            </Box>
          )}

          {item.img && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <Typography variant='headlineMedium'>{item.title}</Typography>
            </Box>
          )}
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: invite_lecture,
    title: '성장',
    rows: 3, // 3 parts height
    cols: 2,
  },
  {
    img: Hackathon,
    title: '공유',
    rows: 4, // 4 parts height
    cols: 2,
  },
  {
    title: '누적 프로젝트 100+',
    rows: 1, // 1 part height
    cols: 2,
  },
  {
    img: MT,
    title: '네트워킹',
    rows: 2, // Adjust height as needed
    cols: 3, // 3 parts width
  },
  {
    img: hackathon3,
    title: '',
    rows: 2, // Match height with the other image
    cols: 1, // 1 part width
  },
];
