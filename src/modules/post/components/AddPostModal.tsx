import { View } from 'react-native';
import React, { FC } from 'react';

import { ModalComponentProps } from '../../../components/Modal';
import { ControlInput } from '../../../components/Input';
import { useForm } from '../../../hooks';
import addPostSchema from '../validation/addPostSchema';
import { AddPostField } from '../validation/fields';
import { useTranslation } from '../../../translation/Provider';
import { styled } from '../../../theme/styled';
import { Box } from '../../../components/Container';
import { useTheme } from '../../../theme/Provider';
import { Button } from '../../../components/Button';
import useCreatePostMutation from '../hooks/useCreatePostMutation';
import { useFlashMessage } from '../../../components/FlashMessage';

interface FormInputs {
  [AddPostField.Title]: string;
  [AddPostField.Body]: string;
}

const AddPostModal: FC<ModalComponentProps<'AddPost'>> = ({ closeModal }) => {
  const { strings } = useTranslation();
  const { spacing } = useTheme();
  const { control, formState, handleSubmit } = useForm<FormInputs>({
    schema: addPostSchema,
  });
  const [addPost, { loading }] = useCreatePostMutation();
  const { showSuccess } = useFlashMessage();

  const onSavePress = handleSubmit(async (input) => {
    addPost({
      variables: {
        ...input,
        createdAt: new Date().toISOString(),
        user_id: 'df7b4181-7850-4ae9-bbbc-ce052c7fa830',
      },
      onCompleted: () => {
        closeModal();
        showSuccess(strings.addPostSuccess);
      },
    });
  });

  return (
    <Container>
      <Box marginBottom={spacing(2)}>
        <ControlInput
          control={control}
          name={AddPostField.Title}
          label={strings.addPostTitle}
          error={formState.errors.title}
        />
      </Box>
      <Box marginBottom={spacing(5)}>
        <BodyInput
          control={control}
          name={AddPostField.Body}
          label={strings.addPostBody}
          error={formState.errors.body}
          multiline
        />
      </Box>
      <Button
        title={strings.save}
        onPress={onSavePress}
        disabled={!formState.isValid}
        isLoading={loading}
      />
    </Container>
  );
};

export default AddPostModal;

const BodyInput = styled(ControlInput)(() => ({
  height: 200,
}));

const Container = styled(View)(({ spacing }) => ({
  margin: spacing(2),
  marginTop: 0,
}));
