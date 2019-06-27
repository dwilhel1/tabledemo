import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);
const host = process.env.REACT_APP_HOST;
const apiKey = process.env.REACT_APP_API_KEY;

const requestConfig = req => {
    req.set('Api-Token', apiKey);
};
const responseBody = res => res.body;

const requests = {
    get: (url, body) =>
        superagent.get(`https://${host}${url}`, body).use(requestConfig).then(responseBody),
};

const Contacts = {
    getContacts: () =>
        requests.get('/contacts'),
};

export default {
    Contacts,
}
