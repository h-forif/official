import { ImageListItemBar, Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Hackathon2 from '@assets/images/main/hackathon2.jpg';
import OT from '@assets/images/main/ot_2024_1.jpeg';
import Study2 from '@assets/images/main/study2.jpg';
import {
  RECRUIT_END_DATE,
  RECRUIT_START_DATE,
} from '@constants/apply.constant';
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
        cols={3}
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
                subtitle={
                  <Typography
                    variant='bodySmall'
                    color='inherit'
                    textAlign={'left'}
                  >
                    {item.desc}
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
    title: `멘토 · 부원 모집`,
    desc: `${RECRUIT_START_DATE} - ${RECRUIT_END_DATE}`,
    link: '/apply/member',
  },
  {
    img: Study2,
    title: '스터디 진행',
    desc: `한 학기 동안 이루어지는 지식의 나눔`,
    link: '/studies',
  },
  {
    img: Hackathon2,
    title: '해커톤',
    desc: `한 해의 마무리를 장식하는 해커톤`,
    link: '/',
  },
];
