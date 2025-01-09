"use client";

import { useTranslation } from "react-i18next";

export default function Localization() {
  const { i18n, ready } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <select
      onChange={changeLanguage}
      value={i18n.language}
      className="text-white bg-transparent focus:ring-4 focus:ring-primary-light font-medium rounded-lg text-sm py-1 px-1.5 text-center border border-transparent focus:border-primary transition-colors duration-100"
    >
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  );
}

