type Props = {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

const sizeMap = {
  sm: 'w-6 h-6 border-2',
  md: 'w-10 h-10 border-[3px]',
  lg: 'w-16 h-16 border-4',
  xl: 'w-30 h-30 border-8',
};

export const Loading = ({ className, size = 'lg' }: Props) => {
  return (
    <div
      className={`rounded-full animate-spin border-solid border-primary border-t-transparent ${sizeMap[size]} ${className ?? ''}`}
    />
  );
};

type PageLoadingProps = {
  className?: string;
  message?: string;
};

export const PageLoading = ({ className, message }: PageLoadingProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[60vh] gap-4 ${className ?? ''}`}
    >
      <Loading size="lg" />
      {message && <p className="text-muted text-sm animate-pulse">{message}</p>}
    </div>
  );
};
