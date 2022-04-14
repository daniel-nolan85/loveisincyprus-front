import React from 'react';
import { ErrorMessage, useField } from 'formik';

export const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <input {...field} {...props} autoComplete='off' />
      <ErrorMessage component='div' name={field.name} className='error' />
    </div>
  );
};

export const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <textarea
        {...field}
        {...props}
        autoComplete='off'
        cols='30'
        rows='2'
      ></textarea>
      <ErrorMessage component='div' name={field.name} className='error' />
    </div>
  );
};
