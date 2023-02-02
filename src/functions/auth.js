import axios from 'axios';

export const createUser = async (
  authtoken,
  name,
  username,
  email,
  mobile,
  secondMobile,
  statement,
  answer
) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-user`,
    { name, username, email, mobile, secondMobile, statement, answer },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const loginUser = async (authtoken, mobile) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/login-user`,
    { mobile },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const loginUserWithSecret = async (authtoken, email) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/login-user-with-secret`,
    { email },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentSubscriber = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-subscriber`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
