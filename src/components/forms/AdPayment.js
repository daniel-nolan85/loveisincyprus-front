import React from 'react';
import { Formik, Form } from 'formik';
import { Input } from './TextFields';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

const AdPayment = ({ setAccountInfo }) => {
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
        cardHolder: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        setAccountInfo(values);
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
                disabled={!(formik.isValid && formik.dirty)}
              >
                <FontAwesomeIcon icon={faFloppyDisk} className='fa' />
                Save
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
