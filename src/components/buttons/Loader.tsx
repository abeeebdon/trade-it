import { LoaderCircle } from 'lucide-react';

const Loader = () => {
  return (
    <LoaderCircle
      className="text-center w-full animate-spin text-white"
      size={30}
    />
  );
};

export default Loader;
