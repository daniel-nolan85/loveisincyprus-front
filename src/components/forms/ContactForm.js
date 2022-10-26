import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Input, TextArea } from './TextFields';
import * as yup from 'yup';
import { contactFormEmail } from '../../functions/sendMessage';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faPaperPlane,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ReCaptchaV2 from 'react-google-recaptcha';

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [human, setHuman] = useState(false);

  const validate = yup.object({
    name: yup.string().required('Please enter your name'),
    email: yup
      .string()
      .email('This email format is invalid')
      .required('Please enter your email'),
    subject: yup
      .string()
      .max(32, 'Subject must not exceed 32 characters')
      .required('Please include a subject'),
    message: yup
      .string()
      .max(2000, 'Message must not exceed 2000 characters')
      .required('Please write your message'),
  });

  const sendMessage = async (values) => {
    if (!human) {
      toast.error('You must pass ReCaptcha verification to send a message.', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else {
      console.log(values);
      setLoading(true);
      await axios
        .post(`${process.env.REACT_APP_API}/contact-form-email`, {
          values,
        })
        // contactFormEmail(values)
        .then((res) => {
          console.log(res);
          setLoading(false);
          toast.success(`Your message has been sent.`, {
            position: toast.POSITION.TOP_CENTER,
          });
          document.getElementById('contact-form').reset();
          setHuman(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
  };

  const handleRecaptcha = async (token) => {
    setToken(token);
    const secret = process.env.REACT_APP_SECRET_KEY;

    await axios
      .post(`${process.env.REACT_APP_API}/recaptcha`, {
        token,
        secret,
      })
      .then((res) => {
        setHuman(res.data.success);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleExpire = () => {
    setToken(null);
  };

  return (
    <Formik
      initialValues={{
        name: 'Daniel Nolan',
        email: 'danielnolan85@yahoo.com',
        subject: 'Test subject',
        message: 'This is a test email',
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        sendMessage(values);
      }}
    >
      {(formik) => (
        <div className='form-box'>
          <div className='button-box'>
            <p className='form-header'>Contact</p>
          </div>
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
              label='Subject'
              className='input-field'
              name='subject'
              type='text'
              placeholder='Subject'
            />
            <TextArea
              label='Message'
              className='input-field'
              name='message'
              type='text'
              placeholder='Your message...'
            />
            <ReCaptchaV2
              sitekey={process.env.REACT_APP_SITE_KEY}
              onChange={handleRecaptcha}
              onExpired={handleExpire}
              // name='recaptcha'
            />
            <div className='contact-form-btns'>
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} className='fa' spin />
              ) : (
                <button type='submit' className='submit-btn'>
                  {loading ? (
                    <FontAwesomeIcon icon={faSpinner} className='fa' spin />
                  ) : (
                    <FontAwesomeIcon icon={faPaperPlane} className='fa' />
                  )}
                  Send
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

export default ContactForm;
