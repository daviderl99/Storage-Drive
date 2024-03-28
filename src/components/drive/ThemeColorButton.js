import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

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
    setIsActive(!isActive);
  }

  return (
    <Button onClick={toggleTheme} variant="outline-secondary">
      {isActive ? "☀" : "🌙"}
    </Button>
  );
}