import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';

const yupResolverAt = (schema: yup.ObjectSchema, name: string, value: any) => {
  return yupResolver(
    yup.object().shape({
      [name]: yup.reach(schema, name),
    })
  )({ [name]: value });
};

export default yupResolverAt;
