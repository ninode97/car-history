import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { Language } from "./api/agent";
const fallbackLng = ["en"];
const availableLanguages = ["en", "lt"];

i18n
  .use(
    new Backend(null, {
      loadPath: Language.loadPath,
    })
  )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng,
    detection: {},
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    supportedLngs: availableLanguages,
    react: {
      bindI18n: "loaded languageChanged",
      bindI18nStore: "added",
      useSuspense: true,
    },
  });
export default i18n;
