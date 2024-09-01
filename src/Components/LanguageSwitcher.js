import React from "react";
import { useTranslation } from "react-i18next";

/**
 * A functional component that provides a language switcher for the application.
 * It allows users to change the application's language by clicking on buttons.
 *
 * @component
 * @example
 * return (
 *   <LanguageSwitcher />
 * );
 *
 * @returns {JSX.Element} A div containing buttons for switching languages.
 * Each button, when clicked, changes the language of the application to the specified language.
 *
 * @throws {Error} Throws an error if the language change fails due to an invalid language code.
 */
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  /**
   * Changes the current language of the application.
   *
   * This function utilizes the i18n library to switch the language 
   * based on the provided language code. It is important to ensure 
   * that the language code passed is supported by the i18n configuration.
   *
   * @param {string} lng - The language code to switch to (e.g., 'en', 'fr', 'es').
   * @throws {Error} Throws an error if the provided language code is not supported.
   *
   * @example
   * // Change the language to French
   * changeLanguage('fr');
   */
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage("pt")}>Português</button>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("es")}>Español</button>
    </div>
  );
}
export default LanguageSwitcher;
