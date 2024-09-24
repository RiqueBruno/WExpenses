import React, { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: 'text' | 'email' | 'password' | 'number';
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

const Input = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  children,
  ...props
}: InputProps): React.ReactElement => {
  return (
    <label htmlFor={type} className="flex flex-col w-full my-4">
      {label}
      <input
        className="border border-x-primary rounded-md p-2 placeholder:text-grayOrangeLight text-primary w-full"
        id={type}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {children}
    </label>
  );
};

export default Input;
