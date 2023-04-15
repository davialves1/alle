import { ColorVariants } from '../models/ColorVariants';

const AlleButton = ({
  children,
  variant,
  icon,
  className,
  onClick,
  type,
}: {
  children: any;
  variant?: ColorVariants;
  icon?: any;
  className?: string;
  onClick?: any;
  type?: string;
}) => {
  const bg = (): string => {
    switch (variant) {
      case ColorVariants.primary:
        return 'bg-emerald-400 hover:bg-emerald-300 text-white';
      case ColorVariants.secondary:
        return 'bg-white hover:bg-emerald-50 text-emerald-400 border border-emerald-400';
      case ColorVariants.outline:
        return 'border-2 border-white hover:bg-white/25 text-white';
      default:
        return 'bg-emerald-400 hover:bg-emerald-300 text-white';
    }
  };

  const iconStyle = icon ? 'flex items-center justify-center' : '';

  const classes = `${bg()} py-3 px-4 rounded-lg text-sm font-semibold ${className} ${iconStyle}`;

  return (
    <button onClick={onClick} className={classes}>
      {icon && icon}
      {children}
    </button>
  );
};

export default AlleButton;
