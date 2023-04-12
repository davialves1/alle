import { ColorVariants } from '../models/ColorVariants';

const AlleButton = ({
  children,
  variant,
  className,
  onClick,
}: {
  children: any;
  variant?: ColorVariants;
  className?: string;
  onClick?: any;
}) => {
  const bg = (): string => {
    switch (variant) {
      case ColorVariants.primary:
        return 'bg-emerald-400 hover:bg-emerald-300 text-white';
      case ColorVariants.secondary:
        return 'bg-white hover:bg-emerald-50 text-emerald-400';
      case ColorVariants.outline:
        return 'border-2 border-white hover:bg-white/25 text-white';
      default:
        return 'bg-emerald-400 hover:bg-emerald-300 text-white';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${bg()} py-3 px-4 rounded-lg text-sm font-semibold ${className}`}
    >
      {children}
    </button>
  );
};

export default AlleButton;
