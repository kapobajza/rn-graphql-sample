import { ApolloClient, InMemoryCache } from '@apollo/client';
import { container } from 'tsyringe';

import { MainConfig } from '../config';
import { DependencyName } from '../di';

const config = container.resolve<MainConfig>(DependencyName.Config);

export const apolloClient = new ApolloClient({
  uri: config.API_URL,
  cache: new InMemoryCache(),
});
