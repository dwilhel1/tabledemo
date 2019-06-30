import axios from 'axios';
const host = process.env.REACT_APP_HOST;
const hostProxy = process.env.REACT_APP_HOST_PROXY;
const apiKey = process.env.REACT_APP_API_KEY;

const axiosInstance = axios.create({
    timeout: 5000,
    headers: { 'Api-Token': apiKey },
});

const requests = {
    get: (url) =>
        axiosInstance.get(`${hostProxy}https://${host}${url}`).then(res => res.data),
};

const Contacts = {
    getAllContacts: () =>
        requests.get('/contacts'),
    getContactData: (contactId) =>
        requests.get(`/contacts/${contactId}/contactData`),
    getContactTags: (contactId) =>
        requests.get(`/contacts/${contactId}/contactTags`),
    getContactDeals: (contactId) =>
        requests.get(`/contacts/${contactId}/contactDeals`),
};

const Deal = {
    getAllDeals: () =>
        requests.get('/deals'),
};

const Tag = {
    getAllTags: () =>
        requests.get('/tags'),
    getContactTag: (contactId) =>
        requests.get(`/contactTags/${contactId}/tag`),
};

const Address = {
    getContactAddress: (addressId) =>
        requests.get(`/addresses/${addressId}`),
};

export default {
    Contacts,
    Deals: Deal,
    Tags: Tag,
    Address,
};
