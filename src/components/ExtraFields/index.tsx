import React, { FunctionComponent } from 'react';
import Checkbox from './Checkbox';
import { useFormContext } from 'react-hook-form';
import MoreField from './MoreField';

export type ExtraFieldsProps = {};

const ExtraFields: FunctionComponent<ExtraFieldsProps> = (props) => {
  const { watch } = useFormContext();
  const moreFields = watch('moreField');

  return (
    <>
      <Checkbox />
      {moreFields && <MoreField />}
    </>
  );
};

export default ExtraFields;
