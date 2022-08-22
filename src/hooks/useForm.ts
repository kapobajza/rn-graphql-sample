import {
  FieldValues,
  useForm as useReactHookForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';
import { AnyObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormProps<TFieldValues extends FieldValues = FieldValues, TContext = any>
  extends UseFormProps<TFieldValues, TContext> {
  schema: AnyObjectSchema | undefined;
}

const useForm = <TFieldValues extends FieldValues = FieldValues, TContext = any>(
  props?: FormProps<TFieldValues, TContext>,
): UseFormReturn<TFieldValues, TContext> => {
  return useReactHookForm<TFieldValues, TContext>({
    mode: 'all',
    ...props,
    resolver: props?.schema ? yupResolver(props.schema) : undefined,
  });
};

export default useForm;
