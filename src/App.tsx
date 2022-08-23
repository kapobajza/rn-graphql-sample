import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FlashMessageProvider } from './components/FlashMessage';
import { ModalProvider, ModalStack } from './components/Modal';
import AddPostModal from './modules/post/components/AddPostModal';
import MainRouter from './navigation/MainRouter';
import NavigationContainer from './navigation/NavigationContainer';
import { getServices, ServicesProvider } from './services/Provider';
import { Language } from './services/Translation.service';
import { defaultTheme } from './theme/default';
import { ThemeProvider } from './theme/Provider';
import { TranslationProvider } from './translation/Provider';

const services = getServices();

const client = new ApolloClient({
  uri: 'http://localhost:3000/',
  cache: new InMemoryCache(),
});

const modalStack: ModalStack = {
  AddPost: AddPostModal,
};

const App = () => {
  return (
    <SafeAreaProvider>
      <ServicesProvider services={services}>
        <ApolloProvider client={client}>
          <TranslationProvider language={Language.En}>
            <ThemeProvider theme={defaultTheme}>
              <FlashMessageProvider>
                <ModalProvider stack={modalStack}>
                  <NavigationContainer>
                    <MainRouter />
                  </NavigationContainer>
                </ModalProvider>
              </FlashMessageProvider>
            </ThemeProvider>
          </TranslationProvider>
        </ApolloProvider>
      </ServicesProvider>
    </SafeAreaProvider>
  );
};

export default App;
