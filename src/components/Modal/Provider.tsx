import React, { createContext, useState, PropsWithChildren, useContext } from 'react';

import Modal from './Modal';
import { ModalContextType, ModalStack } from './types';

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface Props {
  stack: ModalStack;
}

export const ModalProvider: React.FC<PropsWithChildren<Props>> = ({ children, stack }) => {
  const [contextValue, setContextValue] = useState<ModalContextType>();

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal stack={stack} setContextValue={setContextValue} />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  return (context || {}) as ModalContextType;
};
