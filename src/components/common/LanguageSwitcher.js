import React, { useState } from "react";
import en from "../../assets/united-kingdom.png";
import nl from "../../assets/netherlands.png";
import fr from "../../assets/france.png";
import i18n from "i18next";
const languages = [
  { name: "en", src: en },
  { name: "fr", src: fr },
  { name: "nl", src: nl },
];
export default function LanguageSwitcher() {
  const [showlist, setShowlist] = useState(false);
  const toggle = () => {
    setShowlist(!showlist);
  };
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng.name);
    setShowlist(false);
  };
  const currentLng = i18n.language;
  const currentSrc = languages.find((lng) => lng.name === currentLng)?.src;
  return (
    <div>
      <div onClick={toggle} id="languageSwitcher">
        <img
          src={currentSrc}
          alt={currentLng}
          style={{ width: 25, paddingRight: "4px" }}
        />
        {currentLng.toUpperCase()}
      </div>
      {!showlist ? null : (
        <div id="languagesList">
          {languages.map((lng, i) => (
            <div id="languageOption" onClick={() => changeLanguage(lng)}>
              <img
                key={i}
                src={lng.src}
                alt={lng.name}
                style={{ width: 25, paddingRight: "4px" }}
              />
              {lng.name.toUpperCase()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
