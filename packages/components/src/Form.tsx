import { Controller, Path, useForm } from 'react-hook-form';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';

import { zodResolver } from '@hookform/resolvers/zod';
import z, { ZodObject, ZodRawShape } from 'zod';

import { FormProps } from '@components/types/form';

import { Button } from './Button';
import { Input } from './Input';

export function Form<T extends ZodObject<ZodRawShape>>({
  schema,
  onSubmit = () => console.log(schema),
  config,
}: FormProps<T>) {
  type FormData = z.infer<T>;

  // Create default values
  const defaultValues = Object.keys(schema.shape).reduce(
    (acc, key) => {
      acc[key] = '';
      return acc;
    },
    {} as Record<string, string>,
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
  });

  const fields = Object.keys(schema.shape) as Array<keyof FormData & string>;

  return (
    <Stack component={'form'} spacing={2} onSubmit={handleSubmit(onSubmit)}>
      {fields.map((fieldName) => {
        const fieldConfig = config[fieldName];
        return (
          <Controller
            key={fieldName as string}
            name={fieldName as Path<FormData>}
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors[fieldName]}>
                <Input
                  {...field}
                  type={fieldConfig.type || 'text'}
                  label={fieldConfig.label}
                  placeholder={fieldConfig.placeholder}
                  error={!!errors[fieldName]}
                  autoComplete={
                    fieldConfig.type === 'password' ? 'off' : undefined
                  }
                />
                {errors[fieldName] && (
                  <FormHelperText>
                    {fieldConfig.errorMessage ||
                      (errors[fieldName]?.message as string)}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
        );
      })}
      <Button size='large' type='submit' variant='contained'>
        제출하기
      </Button>
    </Stack>
  );
}
