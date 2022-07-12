import React, { useEffect, useState } from "react";

type IntegerInputProps = {
  label: string;
  name: string;
  placeHolder: string;
  value: string;
  onChange: (e: any) => void;
};
const IntegerInput: React.FC<IntegerInputProps> = ({
  label,
  name,
  placeHolder,
  value,
  onChange,
}) => {
  const [int, setInteger] = useState<number | string>(value);
  useEffect(() => {
    onChange({
      target: {
        value: int.toString(),
      },
    });
  }, [int]);
  return (
    <div className="col-span-3 sm:col-span-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          onChange={(e) => {
            const parsed = parseInt(e.target.value);

            if (e.target.value && parsed) setInteger(parsed);
            if (e.target.value === "") setInteger("");
          }}
          type="number"
          value={int}
          name={name}
          id={name}
          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
          placeholder={placeHolder}
        />
      </div>
    </div>
  );
};

export default IntegerInput;
