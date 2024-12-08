import { useState } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", lang: "English" },
  { code: "hi", lang: "Hindi" },
  { code: "ta", lang: "Tamil" },
];
const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState("English");
  const changeLanguage = (e) => {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value);
  };
  return (
    <div className="">
      <label>
        Select language:
        <select value={lang} onChange={changeLanguage}>
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.lang}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
export default LanguageSelector;
