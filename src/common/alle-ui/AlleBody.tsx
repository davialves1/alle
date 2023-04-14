const AlleBody = ({
  className,
  children,
}: {
  className?: string;
  children: any;
}) => {
  return (
    <div
      style={{ minHeight: 'calc(100vh - 80px)' }}
      className={`flex justify-items-center items-center justify-center bg-slate-200 px-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default AlleBody;
