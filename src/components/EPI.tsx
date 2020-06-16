import React, { FunctionComponent } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import FormControlLabel from '@gojob/ui-bits/FormControlLabel';
import AdvancedSelect from '@gojob/ui-bits/AdvancedSelect';

const EPI: FunctionComponent = () => {
  const { control, errors } = useFormContext();
  return (
    <Controller
      render={(field) => (
        <FormControlLabel
          label="EPI"
          control={AdvancedSelect}
          error={errors?.EPI?.message}
          {...field}
          onChange={(value: string) => {
            console.log(value);
            field.onChange({
              listEntryId: value,
            });
          }}
          options={{ '1234': 'label: 1234', abcd: 'label: abcd' }}
          css={{ width: 300 }}
        />
      )}
      name="EPI"
      control={control}
      rules={{
        validate: (value) => value?.listEntryId === '1234' || 'Should be "1234"',
      }}
    />
  );
};

export default EPI;
