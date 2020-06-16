import React from 'react';

import Button from '@gojob/ui-bits/Button';
import { FormProvider, useForm } from 'react-hook-form';
import Typography from '@gojob/ui-bits/Typography';
import * as yup from 'yup';

import './App.css';
import Email, { asyncIsUnique } from './components/Email';
import Password from './components/Password';
import Phone from './components/Phone';
import EPI from './components/EPI';
import Workers from './components/Workers';
import ExtraFields from './components/ExtraFields';
import { yupResolver } from '@hookform/resolvers';

type FormValues = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string;
  country?: string;
  EPI?: { listEntryId: string };
  workers?: { firstName: string; lastName: string }[];
};

export const schema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email()
    .test('isUnique', 'This email is already in use', async (value) => await asyncIsUnique(value)),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')]),
  workers: yup
    .array()
    .of(
      yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
      })
    )
});

function App() {
  const formMethods = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      workers: [{ firstName: '', lastName: '' }],
    },
    // comment this line if you want field level validation
    resolver: async (values) => {
      const a = await yupResolver(schema)(values);
      console.log(a);
      return a;
    },
  });
  const { handleSubmit } = formMethods;

  const onSubmit = (data: FormValues) => {
    alert(`${JSON.stringify(data)}`);
  };

  console.log(formMethods.getValues().workers);

  return (
    <div className="App">
      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', width: 600, margin: 'auto' }}
        >
          <Typography variant="headline1" align="left">
            Profile
          </Typography>
          <Email />
          <Password />
          <EPI />
          <Phone />
          <Workers />
          <ExtraFields />

          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
}

export default App;
