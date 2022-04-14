import React from 'react';
import { Link } from 'react-router-dom';

const RelCoach = () => {
  return (
    <>
      <div className='info-img-bg'>
        <h1>Relationship Coaching</h1>
      </div>
      <div className='info-white-bg shadow'>
        <div className='info-content'>
          <h3>
            Our resident Life Coach Carol Page can offer you Relationship
            Coaching to help you meet your ideal partner.
          </h3>
          <br />
          <hr />
          <br />
          <p>
            We all long for happy, healthy relationships which are meaningful
            and fulfilling, but finding that special person to share your life
            with can be a real challenge.
          </p>
          <br />
          <p>
            Maybe you have found yourself repeatedly attracting the wrong type
            of person. Perhaps your confidence has taken a blow and you may be
            anxious about starting over. The dating game may seem scary and
            intimidating and you may fear that getting into a new relationship
            could cause more pain than it's worth.
          </p>
          <br />
          <p>
            That is why it is so important to get the foundation for a good
            relationship right before you launch into dating. Being clear about
            your values, interests and your personal criteria for a good
            relationship will help to ensure that you don't set yourself up for
            heartache and failure. Take the time now, and it will pay off in the
            long run.
          </p>
          <br />
          <p>
            Our resident Life Coach Carol Page can offer you Relationship
            Coaching to help you meet your ideal partner. She is a fully trained
            Life and Relationship Coach with many years experience helping
            people like you overcome the challenges of starting over.
          </p>
          <br />
          <p>Carol can help you:</p>
          <br />
          <div className='bullets'>
            <ul>
              <li>
                Identify and overcome repeating patterns that are sabotaging
                your relationships
              </li>
              <li>
                Identify the type of person who would be a good match for you
              </li>
              <li>Stay safe and feel supported as you begin dating</li>
              <li>Gain confidence in all your relationships</li>
            </ul>
          </div>
          <br />
          <p>
            Contact her <Link to='/contact-us'>here</Link> or go to her website
            at{' '}
            <Link
              to={{
                pathname: 'https://www.newpagelc.co.uk',
              }}
              target='_blank'
            >
              www.newpagelc.co.uk
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default RelCoach;
