import { container } from 'tsyringe';
import * as yup from 'yup';

import { TranslationService } from '../../../services/Translation.service';
import { validationMessages } from '../../../util';

import { AddPostField } from './fields';

const { strings } = container.resolve(TranslationService);

const addPostSchema = yup.object().shape({
  [AddPostField.Title]: yup
    .string()
    .trim()
    .required(validationMessages.required(strings.addPostTitle)),

  [AddPostField.Body]: yup
    .string()
    .trim()
    .required(validationMessages.required(strings.addPostBody)),
});

export default addPostSchema;
