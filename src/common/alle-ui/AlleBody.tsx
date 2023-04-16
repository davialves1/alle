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
      className={`flex justify-items-center items-center justify-center bg-slate-200 p-4 min-h-screen h-full ${className}`}
    >
      {loading ? <CircularProgress /> : children}
    </div>
  );
};

export default AlleBody;
