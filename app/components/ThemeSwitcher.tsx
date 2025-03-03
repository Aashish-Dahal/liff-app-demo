"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@nextui-org/button";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex gap-4">
      <Button size="sm" variant="flat" onPress={() => setTheme("dark")}>
        Dark Theme
      </Button>
    </div>
  );
}
