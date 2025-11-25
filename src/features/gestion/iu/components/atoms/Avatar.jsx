export const Avatar = ({ src, alt, name, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  return (
    <img
      src={src}
      alt={alt || name}
      title={name}
      className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
    />
  );
};
