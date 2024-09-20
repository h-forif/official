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

import useDeviceSize from '@hooks/useDeviceSize';

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
  const { isMobile } = useDeviceSize();
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      style={{
        overflowX: isMobile ? 'scroll' : 'unset',
        display: isMobile ? 'flex' : 'block',
        gap: isMobile ? '16px' : '0',
      }}
    >
      <ImageList
        sx={{
          height: isMobile ? 'auto' : '584px',
          flexWrap: isMobile ? 'nowrap' : 'wrap',
          width: isMobile ? '100%' : 'auto',
        }}
        variant={isMobile ? 'standard' : 'woven'}
        cols={isMobile ? 1 : 3}
        gap={isMobile ? 0 : 12}
      >
        {itemData.map((item) => (
          <ImageListItem
            key={item.title}
            sx={{ minWidth: isMobile ? '100%' : 'auto' }}
          >
            <motion.div variants={itemVariants}>
              <img
                src={item.img}
                alt={item.alt}
                loading='lazy'
                style={{
                  borderRadius: '16px',
                  width: '100%',
                  height: isMobile ? 'auto' : '360px',
                  objectFit: 'cover',
                }}
              />
              <ImageListItemBar
                sx={{ mt: isMobile ? 1 : 4 }}
                title={
                  <Typography
                    variant='titleSmall'
                    color={'black'}
                    textAlign={'left'}
                  >
                    {item.title}
                  </Typography>
                }
                position='below'
                actionIcon={
                  <OutwardBtn
                    width={isMobile ? 24 : 48}
                    height={isMobile ? 24 : 48}
                    to={item.link}
                    label={`${item.title}에 대해 더 자세히 알아보세요.`}
                  />
                }
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
    title: `멘토·부원 모집`,
    alt: '멘토와 부원을 모집한 후 OT를 진행합니다.',
    desc: `${RECRUIT_START_DATE} - ${RECRUIT_END_DATE}`,
    link: '/apply/member',
  },
  {
    img: Study2,
    title: '스터디 진행',
    alt: '스터디를 진행하는 모습을 담은 사진입니다.',
    desc: `한 학기 동안 이루어지는 지식의 나눔`,
    link: '/studies',
  },
  {
    img: Hackathon2,
    title: '해커톤',
    alt: '해커톤을 진행하는 모습을 담은 사진입니다.',
    desc: `한 해의 마무리를 장식하는 해커톤`,
    link: '/',
  },
];
