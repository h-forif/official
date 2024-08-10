import { useRef } from 'react';

import { Box, Typography } from '@mui/material';

import ParallaxImage from '@assets/images/main/hackathon4.jpg';
import { motion, useScroll, useTransform } from 'framer-motion';

const SECTION_HEIGHT = 1500;

export default function ParallaxContainer() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  // const [offsetTop, setOffsetTop] = useState(0);

  // useEffect(() => {
  //   if (ref.current) {
  //     const offset = ref.current.offsetTop;
  //     setOffsetTop(offset);
  //   }
  // }, []);

  // const clip1 = useTransform(
  //   scrollY,
  //   [offsetTop, offsetTop + SECTION_HEIGHT],
  //   [25, 0],
  // );
  // const clip2 = useTransform(
  //   scrollY,
  //   [offsetTop, offsetTop + SECTION_HEIGHT],
  //   [75, 100],
  // );

  // const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const opacity = useTransform(scrollY, [0, SECTION_HEIGHT + 500], [1, 0]);

  const textOpacity = useTransform(scrollY, [200, SECTION_HEIGHT / 2], [0, 1]);

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ['100%', '170%'],
  );
  return (
    <>
      <Box
        ref={ref}
        style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
        sx={{ position: 'relative', width: '100%' }}
        bgcolor={'text.primary'}
      >
        <motion.div
          style={{
            opacity,
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            filter: 'brightness(0.5)',
            backgroundImage: `url(${ParallaxImage})`,
            backgroundSize,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <motion.div
          style={{
            opacity: textOpacity,
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant='headlineSmall' color={'background.default'}>
            코딩의 세계로 빠져들어보세요.
          </Typography>
        </motion.div>
        {/* <ParallaxItems /> */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '24rem', // h-96 equivalent
            background:
              'linear-gradient(to bottom, rgba(24, 24, 27, 0) 0%, rgba(24, 24, 27, 1) 100%)', // Gradient equivalent
          }}
        />
      </Box>
    </>
  );
}
