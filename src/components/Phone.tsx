import React, { FunctionComponent, useEffect } from 'react';
import PhoneInput from '@gojob/ui-bits/PhoneInput';
import { useFormContext } from 'react-hook-form';
import FormControlLabel from '@gojob/ui-bits/FormControlLabel';

const Phone: FunctionComponent = () => {
  const { setValue, register, watch, unregister } = useFormContext();

  const phone = watch('phoneNumber');
  const country = watch('country');

  useEffect(() => {
    register({ name: 'phoneNumber' });
    register({ name: 'country' });

    // clean the state on unmount
    return () => unregister(['conutry', 'phoneNumber']);
  }, [register, unregister]);

  return (
    <FormControlLabel
      label="Phone"
      control={PhoneInput}
      value={phone}
      onChange={(value?: string) => setValue('phoneNumber', value)}
      region={country}
      onRegionChange={(value?: string) => setValue('country', value)}
    />
  );
};

export default Phone;
