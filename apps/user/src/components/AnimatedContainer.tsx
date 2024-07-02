import * as React from 'react';
import { Children, ReactNode, useRef } from 'react';

import { Box } from '@mui/system';

import { motion, useAnimation, useInView } from 'framer-motion';

const childVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.3 },
  }),
};

const AnimatedChild = ({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={controls}
      variants={childVariants}
      custom={index}
    >
      {children}
    </motion.div>
  );
};

const AnimatedContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '32px',
        borderRadius: 1,
        padding: 2,
        boxShadow: 3,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {Children.map(children, (child, index) => (
        <AnimatedChild key={index} index={index}>
          {child}
        </AnimatedChild>
      ))}
    </Box>
  );
};

export default AnimatedContainer;
