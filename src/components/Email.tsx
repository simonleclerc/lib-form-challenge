import React, { FunctionComponent } from 'react';
import { BaseInput } from '@gojob/ui-bits/Input';
import FormControlLabel from '@gojob/ui-bits/FormControlLabel';
import { useFormContext } from 'react-hook-form';
import { schema } from '../App';
import yupResolverAt from '../utils/yupResolverAt';


export const asyncIsUnique = (value: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value.length % 2 === 0);
    }, 500);
  });
};

const Email: FunctionComponent = () => {
  const { register, errors } = useFormContext();

  return (
    <FormControlLabel
      name="email"
      label="Email"
      error={errors.email?.message}
      control={BaseInput}
      controlRef={register({
        /*
         This validate function won't work with the resolver
         But is a valid one if used alone
         */
        validate: async (value) => {
          const { errors } = await yupResolverAt(schema, 'email', value);
          return errors?.email?.message;
        },
      })}
    />
  );
};

export default Email;
