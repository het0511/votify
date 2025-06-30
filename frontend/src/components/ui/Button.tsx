import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'disabled';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  isLoading = false,
  className = '',
  ...props 
}: ButtonProps) => {
  // Base classes that are always applied
  const baseClasses = 'inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';
  
  // Dynamic classes based on variant
  let variantClasses = '';
  if (props.disabled || variant === 'disabled') {
    variantClasses = 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed';
  } else if (variant === 'primary') {
    variantClasses = 'border-transparent bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500';
  } else if (variant === 'secondary') {
    variantClasses = 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary-500';
  }
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const allClasses = `${baseClasses} ${variantClasses} ${widthClasses} ${className}`;
  
  return (
    <button
      className={allClasses}
      disabled={props.disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
          <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;