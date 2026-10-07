import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import "../../styles/main.scss";

export default function ThemeColorButton() {
  const [isActive, setIsActive] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme === "dark" : false;
  });

  useEffect(() => {
    localStorage.setItem("theme", isActive ? "dark" : "light");
    document.body.classList.toggle("dark-theme", isActive);
  }, [isActive]);

  const toggleTheme = () => {
    setIsActive((active) => !active);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${isActive ? "light" : "dark"} mode`}
      aria-pressed={isActive}
      title={`Switch to ${isActive ? "light" : "dark"} mode`}
    >
      <FontAwesomeIcon icon={isActive ? faSun : faMoon} aria-hidden="true" />
    </button>
  );
}