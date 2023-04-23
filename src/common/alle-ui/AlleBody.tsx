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
  const itemsCenter = loading ? 'items-center justify-center h-screen' : '';
  return (
    <div
      style={style}
      className={`flex justify-items-center ${itemsCenter} overflow-x-hidden bg-slate-100 p-4 h-full md:min-h-screen md:items-center ${className}`}
    >
      {loading ? <CircularProgress /> : children}
    </div>
  );
};

export default AlleBody;
