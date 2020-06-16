import React, { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import Card from '@gojob/ui-bits/Card';
import Fab from '@gojob/ui-bits/Fab';
import Icon from '@gojob/ui-bits/Icon';
import Delete from '@gojob/ui-bits/Icons/Delete';
import FormControlLabel from '@gojob/ui-bits/FormControlLabel';
import { BaseInput } from '@gojob/ui-bits/Input';

export type RowProps = {
  onRemove: () => void;
  index: number;
  namePrefix?: string;
};

const Row: FunctionComponent<RowProps> = ({ onRemove, namePrefix, index }) => {
  const { register, errors } = useFormContext();
  return (
    <Card style={{ alignItems: 'center', padding: 12, margin: '12px 0' }}>
      <FormControlLabel
        label="Firstname"
        name={`${namePrefix}firstName`}
        controlRef={register()}
        error={errors.workers?.[index]?.firstName?.message}
        control={BaseInput}
      />
      <FormControlLabel
        label="Lastname"
        name={`${namePrefix}lastName`}
        controlRef={register()}
        error={errors.workers?.[index]?.lastName?.message}
        control={BaseInput}
      />
      <Fab onClick={onRemove} color="alert" style={{ marginLeft: 12 }}>
        <Icon as={Delete as any} color="white" />
      </Fab>
    </Card>
  );
};

export default Row;
