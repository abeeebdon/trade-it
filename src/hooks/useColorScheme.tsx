import { useTheme } from 'next-themes';

const useColorScheme = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return isDark;
};

export default useColorScheme;
