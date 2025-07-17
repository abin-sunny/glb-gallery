"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleDarkMode}
      className="border-gray-300 dark:border-gray-600 bg-transparent"
      aria-label="Toggle dark mode"
    >
      {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </Button>
  );
} 