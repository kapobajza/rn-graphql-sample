export type MessageType = 'error' | 'success' | 'info' | null;

type FlashMessageFn = (message: string) => void;

export interface FlashMessageContextType {
  showError: FlashMessageFn;
  showSuccess: FlashMessageFn;
  showInfo: FlashMessageFn;
}
