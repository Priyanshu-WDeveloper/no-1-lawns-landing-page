'use client';

import { motion } from 'motion/react';

export function AnimateOnScroll({
  children,
  delay = 0,
  className,
  noscroll,
  noblur,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  noscroll?: boolean;
  noblur?: boolean;
}) {
  const initBlur = noblur ? {} : { filter: 'blur(4px)' };
  const endBlur = noblur ? {} : { filter: 'blur(0px)' };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, ...initBlur }}
      {...(noscroll
        ? { animate: { opacity: 1, y: 0, ...endBlur } }
        : { whileInView: { opacity: 1, y: 0, ...endBlur }, viewport: { once: true, amount: 0.1 } })}
      transition={{ duration: 0.4, delay: delay / 1000, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
