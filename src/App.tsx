import React, { useEffect } from 'react';

import FormControlLabel from '@gojob/ui-bits/FormControlLabel';
import { BaseInput } from '@gojob/ui-bits/Input';

import { Controller, ErrorMessage, FieldError, FieldErrors, useFieldArray, useForm } from 'react-hook-form';

import './App.css';
import { DevTool } from 'react-hook-form-devtools';
import PhoneInput from '@gojob/ui-bits/PhoneInput';
import AdvancedSelect from '@gojob/ui-bits/AdvancedSelect';

type FormValues = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string;
  country?: string;
  EPI?: { listEntryId: string };
  workers?: { firstname: string; lastname: string }[];
};

const asyncIsUnique = (value: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value.length % 2 === 0);
    }, 500);
  });
};

const isSame = (value: string, getValues: () => any) => {
  return value === getValues().password;
};

function App() {
  const { handleSubmit, control, errors, register, getValues, watch, setValue } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      workers: [{ firstname: '', lastname: '' }],
    },
    // validationResolver: (values) => {
    //   const err: any = {};
    //   if (values?.workers?.length && values.workers.length > 2) {
    //     err.workers = [{ firstname: { message: 'Man this is too much workers', type: 'IsTooLong' } }];
    //   }
    //   console.log(values?.workers, err);
    //   return {
    //     values,
    //     errors: err,
    //   };
    // },
  });

  const { fields, append, remove } = useFieldArray<{ lastname: string; firstname: string }>({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'workers', // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const phone = watch('phoneNumber');
  const country = watch('country');

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const emailRef = register({
    validate: {
      isUnique: async (value) => ((await asyncIsUnique(value)) as any) || 'Should be unique',
    },
  });
  const confirmRef = register({
    validate: {
      isSame: (value) => isSame(value, getValues) || 'Should be the same than password',
    },
  });

  useEffect(() => {
    register({ name: 'phoneNumber' });
    register({ name: 'country' });
  }, [register]);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControlLabel
          name="email"
          label="Email"
          error={errors?.email?.message?.toString()}
          control={BaseInput}
          controlRef={emailRef as any}
        />
        <FormControlLabel
          label="Password"
          control={BaseInput}
          name="password"
          error={errors?.password?.message?.toString()}
          controlRef={register}
          type="password"
        />
        <FormControlLabel
          label="Confirm Password"
          control={BaseInput}
          name="confirmPassword"
          error={errors?.confirmPassword?.message?.toString()}
          controlRef={confirmRef as any}
          type="password"
        />
        <PhoneInput
          value={phone}
          onChange={(value) => setValue('phoneNumber', value)}
          region={country}
          onRegionChange={(value) => setValue('country', value)}
        />
        <Controller
          as={
            <FormControlLabel
              label="EPI"
              control={AdvancedSelect}
              controlRef={confirmRef as any}
              error={errors?.EPI?.message?.toString()}
            />
          }
          options={{ '1234': 'label: 1234', abcd: 'label: abcd' }}
          name="EPI"
          control={control}
          onChange={([value]) => {
            return {
              listEntryId: value,
            };
          }}
          rules={{ validate: (value) => value?.listEntryId === '1234' || 'Should be "1234"' }}
        />

        {fields.map((field, index) => (
          <div key={field.id}>
            <FormControlLabel
              label="Firstname"
              control={BaseInput}
              name={`workers[${index}].firstname`}
              controlRef={register({ required: 'Is required' })}
              error={(errors?.workers as any)?.[index]?.firstname?.message?.toString()}
            />
            <FormControlLabel
              label="Lastname"
              control={BaseInput}
              name={`workers[${index}].lastname`}
              controlRef={register({ required: 'Is required' })}
              error={(errors?.workers as any)?.[index]?.lastname?.message?.toString()}
            />
            <button
              onClick={() => {
                remove(index);
              }}
            >
              -
            </button>
          </div>
        ))}
        <ErrorMessage errors={errors} name="workers" />
        <button
          onClick={() => {
            append({});
          }}
        >
          +
        </button>

        <input type="submit" />
      </form>

      <DevTool control={control} />
    </div>
  );
}

export default App;
