import { useRef } from 'react';

import { Box } from '@mui/material';

import hackathon2 from '@assets/images/main/hackathon2.jpg';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';

interface ParallaxItemProps {
  ml?: string;
  w: string;
  start: number;
  end: number;
}

const ParallaxItems = () => {
  return (
    <Box sx={{ position: 'relative', zIndex: 10, mx: 'auto', px: 4, pt: 20 }}>
      {/* <ParallaxText
        text='지식의 선순환'
        start={-200}
        end={200}
        ml='auto'
        w='33%'
      /> */}
      <ParallaxImage start={-200} end={200} w='120px' ml='180px' />
    </Box>
  );
};

const ParallaxImage = ({ start, end, w }: ParallaxItemProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start end`, `end start`],
  });

  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);

  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={hackathon2}
      alt='parallax'
      style={{
        width: w,
        height: w,
        transform,
        borderRadius: '8px',
        position: 'relative',
        zIndex: 1, // 이미지가 위에 보이도록 설정
      }}
    />
  );
};

// const ParallaxText = ({ text, end, start }: ParallaxTextProps) => {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: [`${start} end`, `end ${end * -1}px`],
//   });

//   const y = useTransform(scrollYProgress, [0, 1], [start, end]);

//   useMotionValueEvent(y, 'change', (l) => console.log(l));

//   return (
//     <Typography
//       variant='headlineLarge'
//       color={'white'}
//       style={{
//         width: '100%',
//         position: 'absolute',
//         left: '50%',
//       }}
//       ref={ref}
//     >
//       {text}
//     </Typography>
//   );
// };

export { ParallaxItems };
