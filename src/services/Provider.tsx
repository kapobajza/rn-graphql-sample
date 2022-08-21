import React, { FC, useContext, PropsWithChildren, createContext } from 'react';
import { container } from 'tsyringe';

import { ThemeService } from './Theme.service';
import { TranslationService } from './Translation.service';
import { Services, ServicesProviderProps } from './types';

export const ServicesContext = createContext<Services | undefined>(undefined);

export const ServicesProvider: FC<PropsWithChildren<ServicesProviderProps>> = ({
  children,
  services,
}) => {
  return <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>;
};

export const useService = () => {
  const context = useContext(ServicesContext);

  if (!context) {
    throw new Error('You are not in the Services provider!');
  }

  return context;
};

export const getServices = (): Services => ({
  translationService: container.resolve(TranslationService),
  themeService: container.resolve(ThemeService),
});
