import React from 'react';
import { Formik, Form } from 'formik';
import { Input } from './TextFields';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faUndo,
  faFloppyDisk,
  faMoneyCheck,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const PaymentForm = ({ handleSubmit, processing, succeeded, cartTotal }) => {
  const validate = yup.object({
    cardHolder: yup.string().required('Please enter your full name'),
    cardNumber: yup.string().required('Please enter your card number'),
    expiry: yup
      .string()
      .required('Please enter your card expiry date in the form MM/YYYY'),
    cvc: yup
      .string()
      .required('Please enter the 3 numbers on the back of your card'),
  });

  return (
    <Formik
      initialValues={{
        cardHolder: 'Daniel Nolan',
        cardNumber: '5555555555554444',
        expiry: '122024',
        cvc: '222',
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(formik) => (
        <div className='form-box address'>
          <div className='button-box'>
            <p className='form-header'>Payment Information</p>
          </div>
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
                disabled={processing || succeeded}
              >
                {processing ? (
                  <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                ) : (
                  <FontAwesomeIcon icon={faMoneyCheck} className='fa' />
                )}
                Submit
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
            {cartTotal && (
              <p
                className={
                  succeeded ? 'result-message' : 'result-message hidden'
                }
              >
                Thanks for your purchase.{' '}
                <Link to='purchase/history'>View purchase history</Link>
              </p>
            )}
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default PaymentForm;
