import axios from 'axios';

export const getIps = async () =>
  await axios.get(`${process.env.REACT_APP_API}/fetch-ips`);

export const removeIp = async (ipId, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/remove-ip/${ipId}`, {
    headers: {
      authtoken,
    },
  });

export const banIp = async (ip, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/ban-ip`,
    { ip },
    {
      headers: {
        authtoken,
      },
    }
  );
