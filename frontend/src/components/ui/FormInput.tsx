import { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FormInput = ({ label, ...props }: FormInputProps) => {
  const id = props.id || label.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div>
      <label 
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
                  focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        {...props}
      />
    </div>
  );
};

export default FormInput;