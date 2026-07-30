'use client';

import JompsShopLogo from '@/assets/jompshop_logo';
import JompsShopLogoDark from '@/assets/JompshopLogoDark';
import useColorScheme from '@/hooks/useColorScheme';

const JompFullLogo = () => {
  const isDark = useColorScheme();
  return (
    <div className="">
      {isDark ? (
        <JompsShopLogoDark width={140} />
      ) : (
        <JompsShopLogo width={140} />
      )}
    </div>
  );
};

export default JompFullLogo;
