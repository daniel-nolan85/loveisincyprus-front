import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Input } from './TextFields';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faUndo,
  faMoneyCheck,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

const GCPaymentForm = ({
  paymentDetails,
  setPaymentDetails,
  processing,
  succeeded,
  setFormReady,
  formikRef
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
      initialValues={paymentDetails}
      validationSchema={validate}
      onSubmit={(values) => {
        setPaymentDetails(values);
        setFormReady(true);
      }}
      innerRef={formikRef}
    >
      {(formik) => (
        <div className='form-box ad-payment' style={{ marginBottom: '0' }}>
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
                disabled={
                  !(formik.isValid && formik.dirty) || processing || succeeded
                }
              >
                {!processing && !succeeded ? (
                  <>
                    <FontAwesomeIcon icon={faMoneyCheck} className='fa' />
                    Submit
                  </>
                ) : processing && !succeeded ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                    Submit
                  </>
                ) : (
                  !processing &&
                  succeeded && (
                    <>
                      <FontAwesomeIcon icon={faCheck} className='fa' />
                      Submitted
                    </>
                  )
                )}
              </button>
              <button
                type='reset'
                className='submit-btn reset'
                disabled={processing}
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

export default GCPaymentForm;
