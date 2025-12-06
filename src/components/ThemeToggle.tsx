import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [darkMode]);

  return (
    <Toggle
      pressed={darkMode}
      onPressedChange={setDarkMode}
      className="rounded-4xl"
    >
      {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </Toggle>
  );
}
