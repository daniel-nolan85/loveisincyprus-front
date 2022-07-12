import axios from 'axios';

export const getEvents = async () =>
  await axios.get(`${process.env.REACT_APP_API}/events`);

export const getEvent = async (eventId) =>
  await axios.get(`${process.env.REACT_APP_API}/event/${eventId}`);

export const cancelEvent = async (eventId, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/event/${eventId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const updateEvent = async (event, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/event`, event, {
    headers: {
      authtoken,
    },
  });

export const createEvent = async (event, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/event`, event, {
    headers: {
      authtoken,
    },
  });
