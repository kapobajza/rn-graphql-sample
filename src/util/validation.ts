import { container } from 'tsyringe';

import { TranslationService } from '../services/Translation.service';

const { strings } = container.resolve(TranslationService);

export const validationMessages = {
  required: (field: string) =>
    strings.formatString(strings.validationMessagesRequired, field) as string,
};
