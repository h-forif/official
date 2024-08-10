import { ImageListItemBar, Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Hackathon2 from '@assets/images/main/hackathon2.jpg';
import HPEC from '@assets/images/main/hpec.jpeg';
import OT from '@assets/images/main/ot_2024_1.jpeg';
import Study2 from '@assets/images/main/study2.jpg';
import { motion } from 'framer-motion';

import OutwardBtn from '@components/button/outward-btn';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // Stagger effect for children
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function JourneyImageList() {
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }} // Trigger only once when 20% in view
    >
      <ImageList
        sx={{ width: '100%', height: '584px' }}
        variant='woven'
        cols={4}
        gap={12}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.title}>
            <motion.div variants={itemVariants}>
              <img
                src={item.img}
                alt={item.title}
                loading='lazy'
                style={{
                  borderRadius: '16px',
                  width: '100%',
                  height: '360px',
                  objectFit: 'cover',
                }}
              />
              <ImageListItemBar
                sx={{ mt: 4 }}
                title={
                  <Typography
                    variant='titleSmall'
                    color='inherit'
                    textAlign={'left'}
                  >
                    {item.title}
                  </Typography>
                }
                position='below'
                actionIcon={<OutwardBtn to={item.link} />}
                actionPosition='right'
              />
            </motion.div>
          </ImageListItem>
        ))}
      </ImageList>
    </motion.div>
  );
}

const itemData = [
  {
    img: OT,
    title: '멘토 · 부원 모집',
    link: '/apply/member',
  },
  {
    img: Study2,
    title: '스터디 진행',
    link: '/studies',
  },
  {
    img: HPEC,
    title: '다양한 행사 개최',
    link: '/announcement',
  },
  {
    img: Hackathon2,
    title: '해커톤',
    link: '/hackathon',
  },
];
