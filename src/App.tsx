import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MainRouter from './navigation/MainRouter';
import NavigationContainer from './navigation/NavigationContainer';
import { getServices, ServicesProvider } from './services/Provider';
import { Language } from './services/Translation.service';
import { defaultTheme } from './theme/default';
import { ThemeProvider } from './theme/Provider';
import { TranslationProvider } from './translation/Provider';

const services = getServices();

const client = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <SafeAreaProvider>
      <ServicesProvider services={services}>
        <ApolloProvider client={client}>
          <TranslationProvider language={Language.En}>
            <ThemeProvider theme={defaultTheme}>
              <NavigationContainer>
                <MainRouter />
              </NavigationContainer>
            </ThemeProvider>
          </TranslationProvider>
        </ApolloProvider>
      </ServicesProvider>
    </SafeAreaProvider>
  );
};

export default App;
