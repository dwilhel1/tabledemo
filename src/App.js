import React from 'react';
import './App.scss';

import agent from './services/agent';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            contacts: [],
            columns: ['', 'Contact', 'Total Value', 'Location', 'Deals', 'Tags'],
        };
    }

    componentDidMount() {
        agent.Deals.getAllDeals().then(allDealsResult => console.log(allDealsResult));
        // agent.Tags.getAllTags().then(allTagsResult => console.log(allTagsResult));
        agent.Contacts.getAllContacts()
            .then(
                (contactsList) => {
                    console.log(contactsList);
                    this.setState({
                        isLoaded: true,
                        contacts: contactsList.contacts,
                    });
                    contactsList.contacts.forEach(contact => {
                        // agent.Contacts.getContactData(contact.id).then((result) => console.log(result));
                        // agent.Contacts.getContactTags(contact.id).then((result) => console.log(result));
                        agent.Contacts.getContactDeals(contact.id).then((result) => console.log(result));
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                });
    }

    render () {
        const { error, isLoaded, contacts, columns } = this.state;

        return (
            <table>
                <thead>
                    <tr>
                        {columns.map(item => (
                            <th key={item}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {error ? <tr><td>Error: {error.message}</td></tr> : !isLoaded ? <tr><td>Loading...</td></tr> :
                        contacts.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <input type="checkbox"/>
                                </td>
                                <td>
                                    <span>{item.id} {item.firstName} {item.lastName}</span>
                                </td>
                                <td>
                                    <span></span>
                                </td>
                                <td>
                                    <span></span>
                                </td>
                                <td>
                                    <span></span>
                                </td>
                                <td>
                                    <span></span>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }
}

export default App;
