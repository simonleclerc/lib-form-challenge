import React, { FunctionComponent } from 'react';
import FormControlLabel from '@gojob/ui-bits/FormControlLabel';
import { BaseInput } from '@gojob/ui-bits/Input';
import { useFormContext } from 'react-hook-form';

const Password: FunctionComponent = () => {
  const { register, errors, formState } = useFormContext();
  return (
    <>
      <FormControlLabel
        label="Password"
        control={BaseInput}
        name="password"
        error={errors.password?.message}
        controlRef={register}
        type="password"
      />
      <FormControlLabel
        label="Confirm Password"
        control={BaseInput}
        name="confirmPassword"
        error={formState.dirtyFields?.confirmPassword && errors.confirmPassword?.message}
        controlRef={register}
        type="password"
      />
    </>
  );
};

export default Password;
