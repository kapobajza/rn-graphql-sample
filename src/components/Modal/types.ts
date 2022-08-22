import { ComponentType } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

export interface ModalComponentProps<
  TName extends keyof ModalStackParams = any,
  TParams extends Record<string, any> = ModalStackParams,
> {
  getParams(): TParams[TName];
  closeModal(): void;
}

export type ModalComponent = ComponentType<ModalComponentProps>;

export type ModalStack = {
  [key in keyof ModalStackParams]: ModalComponent;
};

export type ModalAnimation = 'slide' | 'scale';

export interface ModalOptions {
  hasDrawerNotch?: boolean;
  innerContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  spacerStyle?: StyleProp<ViewStyle>;
  hideSpacer?: boolean;
  animationType?: ModalAnimation;
  closeOnOutsideDisabled?: boolean;
}

export interface ModalContextType {
  openModal: <TName extends keyof ModalStackParams = any>(
    name: TName,
    params?: ModalStackParams[TName],
    options?: ModalOptions,
  ) => void;
  closeModal: () => void;
  closeAllModals: () => void;
}

export interface ModalPropType<TParams = {}> {
  getParam<PFallbackValue>(name: keyof TParams, fallback: PFallbackValue): PFallbackValue;
  closeModal(): void;
}

export interface ModalComponentPropsType<TParams = {}> {
  modal: ModalPropType<TParams>;
}

export interface ModalStackParams {
  AddPost: undefined;
}

export type AnimationType = 'slide' | 'fade';

export interface ModalItemProps {
  index: number;
  options?: ModalOptions;
  initialPosition?: number;
  animationType: ModalAnimation;
  animated: SharedValue<number>;
}
