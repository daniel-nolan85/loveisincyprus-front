import React from 'react';
import { Formik, Form } from 'formik';
import { Input } from './TextFields';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUndo,
  faFloppyDisk,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const AdPayment = ({
  accountInfoSaved,
  setAccountInfoSaved,
  setAccountInfo,
  loading,
}) => {
  const validate = yup.object({
    cardHolder: yup.string().required('Please enter your full name'),
    cardNumber: yup
      .string()
      .required('Please enter your card number')
      .matches(/^[0-9]+$/, 'Card number must contain only digits 0-9')
      .min(16, 'Card number must be 16 digits')
      .max(16, 'Card number must be 16 digits'),
    expiry: yup
      .string()
      .required('Please enter your card expiry date in the form MM/YYYY')
      .matches(
        /^(0[1-9]|1[0-2])\/?([0-9]{4})$/,
        'Please enter your card expiry date in the form MM/YYYY'
      ),
    cvc: yup
      .string()
      .required('Please enter the 3 numbers on the back of your card')
      .matches(/^[0-9]+$/, 'CVC must contain only digits 0-9')
      .min(3, 'CVC must be 3 digits')
      .max(3, 'CVC must be 3 digits'),
  });

  return (
    <Formik
      initialValues={{
        cardHolder: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        setAccountInfoSaved(true);
        setAccountInfo(values);
        toast.success(`Account info saved.`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }}
    >
      {(formik) => (
        <div className='form-box ad-payment'>
          <Form className='contact-form' id='contact-form'>
            <Input
              label='Card Holder'
              className='input-field'
              name='cardHolder'
              type='text'
              placeholder='Card Holder'
            />
            <Input
              label='Card Number'
              className='input-field'
              name='cardNumber'
              type='text'
              placeholder='Card Number'
            />
            <Input
              label='Expiry'
              className='input-field'
              name='expiry'
              type='text'
              placeholder='Expiry (MM/YYYY)'
            />
            <Input
              label='CVC'
              className='input-field'
              name='cvc'
              type='text'
              placeholder='CVC'
            />
            <div className='contact-form-btns'>
              <button
                type='submit'
                className='submit-btn'
                disabled={!(formik.isValid && formik.dirty) || loading}
              >
                {!accountInfoSaved ? (
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

export default AdPayment;
