import React, { FC, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: "text" | "email" | "password" | "number";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

const Input: FC<InputProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  children,
  ...props
}): React.ReactElement => {
  return (
    <label htmlFor={type} className="label">
      {label}
      <input
        className=""
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
