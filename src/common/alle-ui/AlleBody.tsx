const AlleBody = ({
  className,
  children,
}: {
  className?: string;
  children: any;
}) => {
  return (
    <div
      className={`min-h-screen items-center justify-center bg-slate-200 pt-4 px-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default AlleBody;
