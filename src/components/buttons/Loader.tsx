import { cn } from '@/lib/cn';
import { LoaderCircle } from 'lucide-react';
interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return (
    <LoaderCircle
      className={cn('text-center w-full animate-spin text-white', className)}
      size={30}
    />
  );
};

export default Loader;
