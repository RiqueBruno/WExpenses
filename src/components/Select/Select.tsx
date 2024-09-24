import React, { SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  value: string;
  options: string[];
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({
  label,
  value,
  onChange,
  options,
  name,
  ...props
}: SelectProps): React.ReactElement => {
  return (
    <label
      htmlFor={`inputMethod-${label}`}
      className="flex flex-col w-full my-4"
    >
      {label}
      <select
        name={name}
        id={`inputMethod-${label}`}
        value={value}
        onChange={onChange}
        className="border border-x-primary rounded-md p-2 placeholder:text-grayOrangeLight text-primary w-full"
        {...props}
      >
        {options.map((acronym) => (
          <option key={acronym} value={acronym}>
            {acronym}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
