import React from "react";
import DateTime from "react-datetime";

type DateTimePickerProps = {
  label: string;
  name: string;
  onChange: (e: any) => void;
  value: Date;
};

const DateTimePicker: React.FC<DateTimePickerProps> = ({ label, name, value, onChange }) => {
  return (
    <div className="col-span-3 sm:col-span-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <DateTime className="w-full dateTimePicker border-gray-300"  value={value} onChange={(e) => onChange(e)}/>
      </div>
    </div>
  );
};

export default DateTimePicker;
