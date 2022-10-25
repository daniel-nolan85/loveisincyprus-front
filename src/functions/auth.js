import axios from 'axios';

// export const createOrUpdateUser = async (authtoken, name, email, mobile) => {
//   return await axios.post(
//     `${process.env.REACT_APP_API}/create-or-update-user`,
//     { name, email, mobile },
//     {
//       headers: {
//         authtoken,
//       },
//     }
//   );
// };

export const createUser = async (authtoken, name, email, mobile) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-user`,
    { name, email, mobile },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const loginUser = async (authtoken, email, mobile) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/login-user`,
    { email, mobile },
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
