import { useEffect, useRef, useState } from 'react';

import {
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { motion, useInView } from 'framer-motion';

interface JourneyBoxProps {
  month: number;
  year: number;
  title: string;
  contents: string[];
  index: number;
}

const listVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

function JourneyBox({ month, year, title, contents, index }: JourneyBoxProps) {
  const [isHovered, setIsHovered] = useState(false);
  const boxRef = useRef(null);
  const containerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const isInView = useInView(boxRef, {
    root: containerRef,
    margin: '0px 0px -50px 0px',
    once: true,
    amount: 'some',
  });

  useEffect(() => {
    if (isInView && index === 0) {
      const timer = setTimeout(() => {
        setIsHovered(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isInView, index]);

  useEffect(() => {
    if (isMobile) {
      setIsHovered(true);
    }
  }, [isMobile]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (index !== 0 && !isMobile) {
      setIsHovered(false);
    }
  };

  return (
    <Grid item md={3} xs={12}>
      <motion.div
        ref={boxRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={false}
        animate={{
          height: isHovered ? 240 : 144,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
        style={{
          overflow: 'hidden',
          border: '1px solid #ddd',
          borderRadius: '10px',
          padding: '20px',
          width: '100%',
        }}
      >
        <Stack direction={'column'} spacing={2} width={'100%'}>
          <Typography variant='labelSmall' sx={{ mb: '32px!important' }}>
            {month} {year}
          </Typography>
          <Typography variant='titleMedium'>{title}</Typography>
          {isHovered && (
            <>
              <motion.ul
                variants={containerVariant}
                initial='hidden'
                animate='visible'
                style={{ paddingLeft: '16px', marginTop: '8px' }}
              >
                {contents.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={listVariant}
                    style={{ listStyle: 'none', marginBottom: '4px' }}
                  >
                    <Typography variant='bodySmall'>- {item}</Typography>
                  </motion.li>
                ))}
              </motion.ul>
            </>
          )}
        </Stack>
      </motion.div>
    </Grid>
  );
}

export default JourneyBox;
