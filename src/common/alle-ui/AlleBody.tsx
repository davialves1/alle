import { CircularProgress } from '@mui/joy';

const AlleBody = ({
  className,
  children,
  loading,
}: {
  className?: string;
  children: any;
  loading?: boolean;
}) => {
  return (
    <div
      style={{ minHeight: 'calc(100vh - 80px)' }}
      className={`flex justify-items-center items-center justify-center bg-slate-200 px-4 ${className}`}
    >
      {loading ? <CircularProgress /> : children}
    </div>
  );
};

export default AlleBody;
