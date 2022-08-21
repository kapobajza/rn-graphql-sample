import React, { useState, type PropsWithChildren } from 'react';

import { useService } from '../services/Provider';
import { Strings } from '../services/types';

export interface ITranslationContext {
  strings: Strings;
  setLanguage: (langauge: string) => void;
  language: string;
}

export const TranslationContext = React.createContext<ITranslationContext | undefined>(undefined);

export const TranslationProvider: React.FC<PropsWithChildren<{ language: string }>> = ({
  children,
  language,
}) => {
  const { translationService } = useService();
  const [currentLanguage, setCurrentLanguage] = useState<string>(language);

  const contextValue: ITranslationContext = {
    strings: translationService.strings,
    setLanguage: (ln: string) => {
      translationService.strings.setLanguage(ln);
      setCurrentLanguage(ln);
    },
    language: currentLanguage,
  };

  return <TranslationContext.Provider value={contextValue}>{children}</TranslationContext.Provider>;
};

export const useTranslation = () => {
  const context = React.useContext(TranslationContext);

  if (!context) {
    throw new Error('Must be inside TranslationProvider');
  }

  return context;
};
