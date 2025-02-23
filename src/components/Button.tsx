import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = "font-bold py-4 px-4 rounded-lg transition-colors duration-200 text-2xl font-bold";
  const variantStyles = {
    primary: "bg-green-300 hover:bg-green-500 text-black",
    secondary: "bg-[#3B4877] hover:bg-[#4B5887] text-white"
  };
  
  const widthStyle = fullWidth ? "w-full" : "";
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 