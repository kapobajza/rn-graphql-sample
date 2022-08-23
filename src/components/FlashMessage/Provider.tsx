import React, { PropsWithChildren, useContext, useState } from 'react';

import { FlashMessageContextType } from './types';
import FlashMessage from './FlashMessage';

interface Props {
  timeout?: number;
}

const FlashMessageContext = React.createContext<FlashMessageContextType | undefined>(undefined);

export const FlashMessageProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  timeout = 6000,
}) => {
  const [contextValue, setContextValue] = useState<FlashMessageContextType>();

  return (
    <FlashMessageContext.Provider value={contextValue}>
      {children}
      <FlashMessage setContextValue={setContextValue} timeout={timeout} />
    </FlashMessageContext.Provider>
  );
};

export function useFlashMessage() {
  const context = useContext(FlashMessageContext);
  return (context || {}) as FlashMessageContextType;
}
