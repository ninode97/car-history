import React from "react";

type TextInputProps = {
  label: string;
  name: string;
  placeHolder: string;
  value: string;
  onChange: (e: any) => void;
};
const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  placeHolder,
  value,
  onChange,
}) => {
  return (
    <div className="col-span-3 sm:col-span-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          onChange={onChange}
          value={value}
          type="text"
          name={name}
          id={name}
          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
          placeholder={placeHolder}
        />
      </div>
    </div>
  );
};

export default TextInput;
