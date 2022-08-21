import LocalizedStrings from 'react-native-localization';
import { injectable } from 'tsyringe';

import en from '../languages/en.json';

import { Strings } from './types';

export enum Language {
  En = 'en',
}

const languages = {
  [Language.En]: en,
};

export interface ITranslationService {
  strings: Strings;
}

@injectable()
export class TranslationService implements ITranslationService {
  private _strings: Strings;

  constructor() {
    this._strings = new LocalizedStrings(languages);
  }

  public get strings(): Strings {
    return this._strings;
  }
}
