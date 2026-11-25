import React from 'react';

const page = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-5 text-center">
      <h1 className="text-2xl sm:text-3xl font-semibold text-text">
        Check our storefront page
      </h1>
      <p className="text-[13px] sm:text-sm text-muted">Visit us at</p>
      <a
        href="https://jompshop.com"
        className="text-base sm:text-lg font-medium text-primary underline underline-offset-4 break-all"
      >
        jompshop.com
      </a>
    </div>
  );
};

export default page;
