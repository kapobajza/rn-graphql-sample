import { container } from 'tsyringe';

import { config } from '../config';

import { DependencyName } from './dependencies';

container.register(DependencyName.Config, {
  useValue: config,
});
