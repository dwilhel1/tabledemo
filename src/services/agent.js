import axios from 'axios';
const host = process.env.REACT_APP_HOST;
const hostProxy = process.env.REACT_APP_HOST_PROXY;
const apiKey = process.env.REACT_APP_API_KEY;

const axiosInstance = axios.create({
    timeout: 1000,
    headers: { 'Api-Token': apiKey },
});

const requests = {
    get: (url) =>
        axiosInstance.get(`${hostProxy}https://${host}${url}`).then(res => res.body),
};

const Contacts = {
    getContacts: () =>
        requests.get('/contacts'),
};

export default {
    Contacts,
};
