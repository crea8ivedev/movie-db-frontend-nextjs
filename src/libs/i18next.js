"use client";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend) // Load translations from the backend
  .use(LanguageDetector) // Detect user's language
  .use(initReactI18next) // Connect with React
  .init({
    fallbackLng: "en", // Default language
    supportedLngs: ["en", "es", "fr"], // Add supported languages
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Path to translation files
    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator"],
      caches: ["localStorage", "cookie"],
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
