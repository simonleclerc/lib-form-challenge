import React, { FunctionComponent, useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Row from './Row';
import Button from '@gojob/ui-bits/Button';
import Typography from '@gojob/ui-bits/Typography';
import Flex from '@gojob/ui-bits/Flex';

export type WorkersProps = {};

const Workers: FunctionComponent<WorkersProps> = (props) => {
  const { control, errors, trigger, clearError, formState } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workers',
  });

  useEffect(() => {
    if (formState.isDirty) {
      clearError();
      trigger();
    }
  }, [clearError, trigger, fields.length, formState.isDirty]);

  console.log('here', errors?.workers?.message);

  return (
    <Flex flexDirection="column" style={{ margin: '24px 0' }}>
      <Flex alignItems="center">
        <Typography variant="headline1" align="left" style={{ flexGrow: 1 }}>
          My Fellow mates
        </Typography>
        <Button
          type="button"
          onClick={() => {
            append({ firstName: '', lastName: '' });
          }}
        >
          Add a mate
        </Button>
      </Flex>

      {fields.map(({ id }, index) => {
        return (
          <Row
            index={index}
            namePrefix={`workers[${index}]`}
            onRemove={() => {
              remove(index);
            }}
            key={id}
          />
        );
      })}
    </Flex>
  );
};

export default Workers;
