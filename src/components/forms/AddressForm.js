import React from 'react';
import { Formik, Form } from 'formik';
import { Input } from './TextFields';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTruck, faHouse } from '@fortawesome/free-solid-svg-icons';

const AddressForm = ({
  userAddress,
  saveAddressToDb,
  changeAddress,
  address,
  loadingAddress,
  deliverTo,
  addressSaved,
}) => {
  const validate = yup.object({
    firstLine: yup
      .string()
      .required('Please enter the first line of your address'),
    secondLine: yup.string(),
    city: yup.string().required('Please tell us which city you live in'),
    zip: yup.string().required('Please enter your zip code'),
  });

  const saveAddress = async (values) => {
    saveAddressToDb(values);
  };

  return (
    <Formik
      enableReinitialize={true}
      validateOnMount
      initialValues={userAddress}
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
              label='Post Code'
              className='input-field'
              name='zip'
              type='text'
              placeholder='Post Code'
            />
            <Input
              label='Country'
              className='input-field'
              name='country'
              type='text'
              placeholder='Country'
              readOnly
            />
            <div className='contact-form-btns'>
              <button
                type='submit'
                className='submit-btn'
                disabled={
                  !formik.isValid ||
                  loadingAddress ||
                  !deliverTo ||
                  addressSaved
                }
              >
                {loadingAddress ? (
                  <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                ) : (
                  <FontAwesomeIcon icon={faTruck} className='fa' />
                )}
                Deliver here
              </button>
              {address && address.length > 1 && (
                <button
                  type='button'
                  className='submit-btn reset'
                  disabled={loadingAddress}
                  onClick={changeAddress}
                >
                  <FontAwesomeIcon icon={faHouse} className='fa' />
                  Select other
                </button>
              )}
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default AddressForm;
