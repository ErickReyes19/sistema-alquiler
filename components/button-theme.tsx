"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { MoonIcon } from "./ui/moon";
import { SunMediumIcon } from "./ui/sun-medium";

export default function ToggleThemeButton() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    const initialTheme = storedTheme || systemTheme;
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme} className="gap-2" aria-label="Cambiar tema">
      {theme === "light" ? <MoonIcon size={16} /> : <SunMediumIcon size={16} />}
      <span className="hidden text-xs md:inline">{theme === "light" ? "Dark" : "Light"}</span>
      <span className="sr-only">Tema</span>
    </Button>
  );
}
