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

const App = () => {
  return (
    <SafeAreaProvider>
      <ServicesProvider services={services}>
        <TranslationProvider language={Language.En}>
          <ThemeProvider theme={defaultTheme}>
            <NavigationContainer>
              <MainRouter />
            </NavigationContainer>
          </ThemeProvider>
        </TranslationProvider>
      </ServicesProvider>
    </SafeAreaProvider>
  );
};

export default App;
