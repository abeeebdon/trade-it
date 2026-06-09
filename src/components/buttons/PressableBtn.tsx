import { cn } from '@/lib/cn';
import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface PressableBtnProps {
  title: string;
  className?: string;
  handleClick: () => void;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  loading?: boolean;
}
const PressableBtn = ({
  title,
  className,
  handleClick,
  leftComponent,
  rightComponent,
  loading = false,
  ...props
}: PressableBtnProps) => {
  return (
    <motion.button
      {...props}
      whileHover={{ scale: 1.05 }}
      disabled={loading}
      whileTap={{ scale: 0.85 }}
      onClick={handleClick}
      className={cn('inline-flex items-center gap-2', className)}
    >
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          {leftComponent && <span>{leftComponent}</span>}
          {title}
          {rightComponent && <span>{rightComponent}</span>}
        </>
      )}
    </motion.button>
  );
};

export default PressableBtn;
