import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import ContactForm from '../components/forms/ContactForm';

const Contact = () => {
  return (
    <>
      <div className='info-img-bg'>
        <h1>Contact Us</h1>
      </div>
      <div className='info-white-bg shadow'>
        <div className='info-content'>
          <h2>You can reach Love Is In Cyprus here:</h2>
          <section id='contact'>
            <div className='contact-container'>
              <div className='contact-info'>
                <br />
                <div className='contact-details'>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className='fa' />
                  <p>
                    <b>Ex Florum Limited</b> <br />
                    Agiou Athanasiou 16-2
                    <br />
                    8560 Peyia
                    <br />
                    Cyprus
                    <br />
                    Company number HE 404391
                  </p>
                </div>
              </div>
              <ContactForm />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Contact;
