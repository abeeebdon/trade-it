'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // 👇 IMPORTANT: render placeholder, not null
  if (!mounted) {
    return (
      <div className="w-22.5 h-9 rounded-md bg-gray-200 dark:bg-gray-800" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-1 rounded-md cursor-pointer bg-gray-200 dark:bg-gray-800"
    >
      {isDark ? '🌙 ' : '☀️ '}
    </button>
  );
}
