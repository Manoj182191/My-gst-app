import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

// Define theme colors
const lightTheme = {
  colors: {
    primary: '#4F46E5',
    secondary: '#6366F1',
    background: '#F9FAFB',
    cardBackground: '#FFFFFF',
    cardBackgroundAlt: '#F3F4F6',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    inputBackground: '#FFFFFF',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    shadow: '#000000',
    white: '#FFFFFF',
  },
};

const darkTheme = {
  colors: {
    primary: '#6366F1',
    secondary: '#818CF8',
    background: '#111827',
    cardBackground: '#1F2937',
    cardBackgroundAlt: '#374151',
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    border: '#374151',
    inputBackground: '#374151',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    shadow: '#000000',
    white: '#FFFFFF',
  },
};

// Available themes
const themes = {
  light: lightTheme,
  dark: darkTheme,
  blue: {
    ...lightTheme,
    colors: {
      ...lightTheme.colors,
      primary: '#2563EB',
      secondary: '#3B82F6',
    },
  },
  green: {
    ...lightTheme,
    colors: {
      ...lightTheme.colors,
      primary: '#059669',
      secondary: '#10B981',
    },
  },
  purple: {
    ...lightTheme,
    colors: {
      ...lightTheme.colors,
      primary: '#7C3AED',
      secondary: '#8B5CF6',
    },
  },
  orange: {
    ...lightTheme,
    colors: {
      ...lightTheme.colors,
      primary: '#EA580C',
      secondary: '#F97316',
    },
  },
};

type ThemeType = 'light' | 'dark' | 'blue' | 'green' | 'purple' | 'orange';

interface ThemeContextType {
  theme: typeof lightTheme;
  themeType: ThemeType;
  isDarkMode: boolean;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  themeType: 'light',
  isDarkMode: false,
  setTheme: () => {},
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>(colorScheme === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    // Update theme based on system preference changes
    if (colorScheme === 'dark' && (themeType === 'light' || themeType === 'blue' || themeType === 'green' || themeType === 'purple' || themeType === 'orange')) {
      setThemeType('dark');
    } else if (colorScheme === 'light' && themeType === 'dark') {
      setThemeType('light');
    }
  }, [colorScheme]);

  const toggleTheme = () => {
    setThemeType(themeType === 'dark' ? 'light' : 'dark');
  };

  const setTheme = (newTheme: ThemeType) => {
    setThemeType(newTheme);
  };

  const theme = themes[themeType];
  const isDarkMode = themeType === 'dark';

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeType,
        isDarkMode,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};