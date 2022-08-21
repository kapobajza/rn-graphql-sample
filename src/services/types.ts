import { LocalizedStrings as LocalizedStringsType } from 'react-native-localization';

import en from '../languages/en.json';

import { ITranslationService } from './Translation.service';
import { IThemeService } from './Theme.service';

export interface Services {
  translationService: ITranslationService;
  themeService: IThemeService;
}

export interface ServicesProviderProps {
  services: Services;
}

export type Strings = LocalizedStringsType<typeof en>;
