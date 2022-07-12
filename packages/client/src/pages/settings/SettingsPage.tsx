import React from "react";
import { useNavigate } from "react-router-dom";
import DefaultPage from "../DefaultPage";

const settingPages: OptionProps[] = [
  {
    title: "Car Brands",
    label: "View",
    description: "In this page, system users can be managed",
    link: "/settings/brands",
    buttons: {
      action: {
        color: "bg-red-500",
        hover: "bg-red-700",
        focus: "bg-red-700",
        active: "bg-red-800",
      },
    },
  },
];

type OptionProps = {
  title: string;
  label: string;
  description: string;
  buttons: {
    action: {
      color: string;
      hover: string;
      active: string;
      focus: string;
    };
  };
  link: string;
};
const Option: React.FC<OptionProps> = ({
  label,
  title,
  description,
  buttons,
  link,
}) => {
  const navigate = useNavigate();
  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm m-2">
      <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
        {title}
      </h5>
      <p className="text-gray-700 text-base mb-4">{description}</p>
      <button
        onClick={() => navigate(link)}
        type="button"
        className={`
        inline-block px-6 py-2.5 ${buttons.action.color} 
        text-white font-medium text-xs leading-tight
        uppercase rounded shadow-md hover:${buttons.action.hover} 
        hover:shadow-lg focus:${buttons.action.focus}  
        focus:shadow-lg focus:outline-none focus:ring-0
        active:${buttons.action.active} active:shadow-lg
        transition duration-150 ease-in-out`}
      >
        {label}
      </button>
    </div>
  );
};

const SettingsPage = () => {
  return (
    <DefaultPage>
      <div className="flex flex-wrap bg-gray-100 h-full">
        {settingPages.map((p) => (
          <Option key={p.link} {...p} />
        ))}
      </div>
    </DefaultPage>
  );
};

export default SettingsPage;
