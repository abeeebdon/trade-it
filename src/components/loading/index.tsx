type Props = {
  className?: string;
};

export const Loading = ({ className }: Props) => {
  return (
    <div
      className={`w-30 h-30 rounded-full animate-spin border-14 border-dashed border-secondary border-t-transparent ${className}`}
    ></div>
  );
};
