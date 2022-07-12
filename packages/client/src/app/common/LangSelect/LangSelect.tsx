import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const LangSelect = () => {
  const selected = localStorage.getItem("i18nextLng") || "en";
  const { t } = useTranslation();
  return (
    <label className="block text-left" style={{ maxWidth: "400px" }}>
      <span className="text-gray-700">Language({selected})</span>
      <select
        className="form-select block w-full mt-1"
        onChange={(e) => {
          i18n.changeLanguage(e.target.value);
        }}
      >
        <option>en</option>
        <option>lt</option>
      </select>
    </label>
  );
};

export default LangSelect;
