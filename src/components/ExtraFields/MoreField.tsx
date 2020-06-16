import React, { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { BaseInput } from '@gojob/ui-bits/Input';
import FormControlLabel from '@gojob/ui-bits/FormControlLabel';

export type MoreFieldsProps = {};

const MoreField: FunctionComponent<MoreFieldsProps> = (props) => {
  const { register, errors } = useFormContext();
  const ref = register({
    validate: (value) => (value && value[0] === 'a') || 'should begin with a "a"',
  });
  return (
    <FormControlLabel
      label="Favorite juice"
      control={BaseInput}
      controlRef={ref}
      error={errors.favoriteJuice?.message}
      name="favoriteJuice"
    />
  );
};

export default MoreField;
