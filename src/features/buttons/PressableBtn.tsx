import { cn } from '@/lib/cn';
import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface PressableBtnProps {
  title: string;
  className?: string;
  handleClick: () => void;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
}
const PressableBtn = ({
  title,
  className,
  handleClick,
  leftComponent,
  rightComponent,
  ...props
}: PressableBtnProps) => {
  return (
    <motion.button
      {...props}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.85 }}
      onClick={handleClick}
      className={cn('inline-flex items-center gap-2', className)}
    >
      {leftComponent && <span>{leftComponent}</span>}
      {title}
      {rightComponent && <span>{rightComponent}</span>}
    </motion.button>
  );
};

export default PressableBtn;
