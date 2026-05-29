import HomePage from '@/features/landingPage/HomePage';
import ComingSoon from '@/features/waitlist/COmingSOon';

const page = () => {
  const modeLive = false;
  return modeLive ? <HomePage /> : <ComingSoon />;
};

export default page;
