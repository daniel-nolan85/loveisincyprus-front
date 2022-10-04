import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Input } from './TextFields';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faUndo,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';

const AddressForm = ({ address, saveAddressToDb }) => {
  const [loading, setLoading] = useState(false);

  const validate = yup.object({
    firstLine: yup
      .string()
      .required('Please enter the first line of your address'),
    secondLine: yup.string(),
    city: yup.string().required('Please tell us which city you live in'),
    state: yup.string().required('Please tell us which state you live in'),
    zip: yup.string().required('Please enter your zip code'),
    country: yup.string().required('Please tell us which country you live in'),
  });

  const saveAddress = async (values) => {
    saveAddressToDb(values);
  };

  return (
    <Formik
      //   initialValues={{
      //     firstLine: '',
      //     secondLine: '',
      //     city: '',
      //     state: '',
      //     zip: '',
      //     country: '',
      //   }}
      initialValues={address}
      validationSchema={validate}
      onSubmit={(values) => {
        saveAddress(values);
      }}
    >
      {(formik) => (
        <div className='form-box address'>
          <div className='button-box'>
            <p className='form-header'>Delivery Address</p>
          </div>
          <Form className='contact-form' id='contact-form'>
            <Input
              label='First Line'
              className='input-field'
              name='firstLine'
              type='text'
              placeholder='First Line'
            />
            <Input
              label='Second Line'
              className='input-field'
              name='secondLine'
              type='text'
              placeholder='Second Line'
            />
            <Input
              label='City'
              className='input-field'
              name='city'
              type='text'
              placeholder='City'
            />
            <Input
              label='State'
              className='input-field'
              name='state'
              type='text'
              placeholder='State'
            />
            <Input
              label='Zip Code'
              className='input-field'
              name='zip'
              type='text'
              placeholder='Zip Code'
            />
            <Input
              label='Country'
              className='input-field'
              name='country'
              type='text'
              placeholder='Country'
            />
            <div className='contact-form-btns'>
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} className='fa' spin />
              ) : (
                <button type='submit' className='submit-btn'>
                  {loading ? (
                    <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                  ) : (
                    <FontAwesomeIcon icon={faFloppyDisk} className='fa' />
                  )}
                  Save
                </button>
              )}
              <button
                type='reset'
                className='submit-btn reset'
                disabled={loading}
              >
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

export default AddressForm;
