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
        const contactDetails = [];
        agent.Contacts.getAllContacts()
            .then(
                (contactsList) => {
                    this.setState({
                        contacts: contactsList.contacts,
                    });
                    /* contactsList.contacts.forEach(contact => {
                        agent.Contacts.getContactData(contact.id)
                            .then((contactResult) => {
                                contactDetails.push(contactResult);
                            },
                            (error) => {
                                this.setState({
                                    isLoaded: true,
                                    error,
                                });
                            });
                    }); */
                    this.setState({
                        isLoaded: true,
                        contactDetailsList: contactDetails,
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
                {error ? (
                    <p>Error: {error.message}</p>): !isLoaded ? (
                    <p>Loading...</p>
                ) : (
                    <tbody>
                        {contacts.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <input type="checkbox"/>
                                </td>
                                <td>
                                    <span>{item.firstName} {item.lastName}</span>
                                </td>
                                <td>
                                    <span>{item.firstName} {item.lastName}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )
                }
            </table>
        );
    }
}

export default App;
