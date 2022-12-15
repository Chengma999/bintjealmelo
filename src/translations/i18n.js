import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { TRANSLATIONS_ZH } from "./zh/translations";
import { TRANSLATIONS_EN } from "./en/translations";
import { TRANSLATIONS_NL } from "./nl/translations";
import { TRANSLATIONS_FR } from "./fr/translations";
import gegevens from "Utilities/gegevens";
const { language } = gegevens;
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: TRANSLATIONS_EN,
      },
      zh: {
        translation: TRANSLATIONS_ZH,
      },
      nl: {
        translation: TRANSLATIONS_NL,
      },
      fr: {
        translation: TRANSLATIONS_FR,
      },
    },
    lng: !language ? "nl" : language,
  });

// i18n.changeLanguage("fr");
