import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Input } from './TextFields';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFloppyDisk,
  faUndo,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const AdContact = ({
  contactInfoSaved,
  setContactInfoSaved,
  setContactInfo,
}) => {
  const validate = yup.object({
    name: yup.string().required('Please enter your name'),
    email: yup
      .string()
      .email('This email format is invalid')
      .required('Please enter your email'),
    phone: yup.number(),
  });

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phone: '',
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        setContactInfoSaved(true);
        setContactInfo(values);
        toast.success(`Contact info saved.`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }}
    >
      {(formik) => (
        <div className='form-box ad-contact'>
          <Form className='contact-form' id='contact-form'>
            <Input
              label='Name'
              className='input-field'
              name='name'
              type='text'
              placeholder='Full name'
            />
            <Input
              label='Email'
              className='input-field'
              name='email'
              type='text'
              placeholder='Email'
            />
            <Input
              label='Phone'
              className='input-field'
              name='phone'
              type='number'
              placeholder='Phone'
            />
            <div className='contact-form-btns'>
              <button
                type='submit'
                className='submit-btn'
                disabled={!(formik.isValid && formik.dirty)}
              >
                {!contactInfoSaved ? (
                  <>
                    <FontAwesomeIcon icon={faFloppyDisk} className='fa' />
                    Save
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCheck} className='fa' />
                    Saved
                  </>
                )}
              </button>
              <button type='reset' className='submit-btn reset'>
                <FontAwesomeIcon icon={faUndo} className='fa' />
                Reset
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default AdContact;
