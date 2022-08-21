import { injectable } from 'tsyringe';

import { defaultTheme } from '../theme/default';
import { Theme } from '../theme/types';

export interface IThemeService {
  current: Theme;
}

@injectable()
export class ThemeService implements IThemeService {
  private _current: Theme;

  constructor() {
    this._current = defaultTheme;
  }

  public get current(): Theme {
    return this._current;
  }

  public set current(v: Theme) {
    this._current = v;
  }
}
