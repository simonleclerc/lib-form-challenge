import React, { FunctionComponent } from 'react';
import { BaseInput } from '@gojob/ui-bits/Input';
import FormControlLabel from '@gojob/ui-bits/FormControlLabel';
import { useFormContext } from 'react-hook-form';

export type CheckboxProps = {};

const Checkbox: FunctionComponent<CheckboxProps> = (props) => {
  const { register } = useFormContext();

  return (
    <FormControlLabel
      label="Use more Field ?"
      controlRef={register}
      control={BaseInput}
      type="checkbox"
      name="moreField"
    />
  );
};

export default Checkbox;
