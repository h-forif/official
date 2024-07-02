import { InputHTMLAttributes } from 'react';
import { SubmitHandler } from 'react-hook-form';

import z, { ZodObject, ZodRawShape } from 'zod';

export type FieldConfig = {
  label: string;
  placeholder?: string;
  errorMessage?: string;
  type?: InputHTMLAttributes<unknown>['type'];
};

export type FormConfig<T extends ZodObject<ZodRawShape>> = {
  // eslint-disable-next-line no-unused-vars
  [K in keyof z.infer<T>]: FieldConfig;
};

export type FormProps<T extends ZodObject<ZodRawShape>> = {
  schema: T;
  config: FormConfig<T>;
  onSubmit?: SubmitHandler<z.infer<T>>;
};
