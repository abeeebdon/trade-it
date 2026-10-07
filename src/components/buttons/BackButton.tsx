import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
interface BackButtonPRops {
  title?: string;
  path?: string;
}
const BackButton = ({ title = 'Go Back', path }: BackButtonPRops) => {
  const router = useRouter();
  const handleGoBack = () => {
    return path ? router.push(path) : router.back();
  };
  return (
    <button
      className="inline-flex cursor-pointer items-center gap-1.5 text-sm text-muted hover:text-text"
      onClick={handleGoBack}
    >
      <ArrowLeft size={16} />
      {title}
    </button>
  );
};

export default BackButton;
