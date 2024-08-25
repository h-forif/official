import { ReactNode } from 'react';

import { Box, Stack, Typography, styled } from '@mui/material';

import { motion } from 'framer-motion';

const marqueeVariants = {
  animate: {
    x: [0, -1300],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 8,
        ease: 'linear',
      },
    },
  },
};

const marqueeVariants2 = {
  animate: {
    x: [-1300, 0],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 8,
        ease: 'linear',
      },
    },
  },
};

const Marquee = () => {
  return (
    <MarqueeBox>
      <motion.div
        style={{
          position: 'absolute',
          whiteSpace: 'nowrap',
          display: 'flex',
        }}
        variants={marqueeVariants}
        animate='animate'
      >
        <Stack gap={4} direction={'row'} alignItems={'center'} mr={4}>
          <FlowBox type='wide'># 한양대학교 중앙동아리</FlowBox>
          <FlowBox type='narrow'># SHARE</FlowBox>
          <FlowBox type='wide'># 프로그래밍 동아리</FlowBox>
          <FlowBox type='narrow'># 프로그래밍 동아리</FlowBox>
        </Stack>
        <Stack gap={4} direction={'row'} alignItems={'center'} mr={4}>
          <FlowBox type='wide'># 한양대학교 중앙동아리</FlowBox>
          <FlowBox type='narrow'># SHARE</FlowBox>
          <FlowBox type='wide'># 프로그래밍 동아리</FlowBox>
          <FlowBox type='narrow'># 프로그래밍 동아리</FlowBox>
        </Stack>
      </motion.div>
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          whiteSpace: 'nowrap',
          display: 'flex',
        }}
        variants={marqueeVariants2}
        animate='animate'
      >
        <Stack gap={4} direction={'row'} alignItems={'center'} mr={4}>
          <FlowBox type='wide'># FORIF</FlowBox>
          <FlowBox type='narrow'># 비전공자도 환영</FlowBox>
          <FlowBox type='wide'># 전공자도 환영</FlowBox>
          <FlowBox type='narrow'># GROWTH</FlowBox>
        </Stack>
        <Stack gap={4} direction={'row'} alignItems={'center'} mr={4}>
          <FlowBox type='wide'># FORIF</FlowBox>
          <FlowBox type='narrow'># 비전공자도 환영</FlowBox>
          <FlowBox type='wide'># 전공자도 환영</FlowBox>
          <FlowBox type='narrow'># GROWTH</FlowBox>
        </Stack>
      </motion.div>
    </MarqueeBox>
  );
};

const MarqueeBox = styled(Box)(() => ({
  position: 'relative',
  width: '100vw',
  maxWidth: '100%',
  height: '320px',
  overflow: 'hidden',
}));

const FlowBox = ({
  children,
  type,
}: {
  children: ReactNode;
  type: 'narrow' | 'wide';
}) => {
  const BoxType = type === 'narrow' ? NarrowBox : WideBox;
  return (
    <BoxType>
      <Typography variant='titleLarge' color={'primary.main'}>
        {children}
      </Typography>
    </BoxType>
  );
};

const WideBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),
  borderRadius: theme.spacing(5),
  backgroundColor: 'white',
}));

const NarrowBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  borderRadius: theme.spacing(5),
  backgroundColor: 'rgba( 255, 255, 255, 0.5 )',
}));

export default Marquee;
