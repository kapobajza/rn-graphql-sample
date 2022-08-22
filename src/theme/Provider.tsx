import React, { FC, useState, useMemo, useContext, PropsWithChildren, createContext } from 'react';

import { useService } from '../services/Provider';

import { colors } from './colors';
import { Colors, IThemeContext, Theme, ThemeName } from './types';

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider: FC<PropsWithChildren<{ theme: Theme }>> = ({
  children,
  theme: initialTheme,
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const { themeService } = useService();

  const contextValue = useMemo<IThemeContext>(
    () => ({
      ...theme,
      setTheme: (valueOrCb) => {
        setTheme((t) => {
          let themeName: ThemeName;
          let newColors: Colors = colors;

          if (typeof valueOrCb === 'function') {
            themeName = valueOrCb(t.name);
          } else {
            themeName = valueOrCb;
          }

          const newTheme = {
            ...t,
            colors: newColors,
            name: themeName,
          };

          themeService.current = newTheme;

          return newTheme;
        });
      },
    }),
    [theme, themeService],
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('Must be inside ThemeProvider!');
  }

  return context;
};
