import axios from 'axios';

export const contactFormEmail = async (data) =>
  await axios.post(`${process.env.REACT_APP_API}/contact-form-email`, data);
