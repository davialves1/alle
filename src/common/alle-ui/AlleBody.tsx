import { CircularProgress } from '@mui/joy';
import { CSSProperties } from 'react';

const AlleBody = ({
  className,
  children,
  loading,
  style,
}: {
  className?: string;
  children: any;
  loading?: boolean;
  style?: CSSProperties;
}) => {
  return (
    <div
      style={style}
      className={` flex justify-items-center justify-center bg-slate-200 p-4 min-h-screen h-full ${className}`}
    >
      {loading ? <CircularProgress /> : children}
    </div>
  );
};

export default AlleBody;
