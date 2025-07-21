"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const handleSetTheme = (theme: string) => {
    const switchTheme = () => setTheme(theme);
    if (!document.startViewTransition) {
      switchTheme();
    } else {
      document.startViewTransition(switchTheme);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => handleSetTheme(theme === "dark" ? "light" : "dark")}
      className="border-gray-300 dark:border-gray-600 bg-transparent"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </Button>
  );
}
