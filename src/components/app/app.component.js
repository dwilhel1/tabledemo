import React from 'react';

import agent from '../../services/agent';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                contacts: false,
                deals: false,
            },
            isLoaded: {
                contacts: false,
                deals: false,
            },
            contacts: [],
            columns: ['', 'Contact', 'Total Value', 'Location', 'Deals', 'Tags'],
        };
    }

    componentDidMount() {
        agent.Contacts.getAllContacts().then(
            (contactsListResult) => {
                this.setState({
                    isLoaded: {
                        ...this.state.isLoaded,
                        contacts: true,
                    },
                    contacts: contactsListResult.contacts,
                });
                this.state.contacts.forEach((contact, index) => {
                    // agent.Contacts.getContactData(contact.id).then((result) => console.log(result));
                    // agent.Contacts.getContactTags(contact.id).then((result) => console.log(result));
                    agent.Contacts.getContactDeals(contact.id).then((contactDealsResult) => {
                        const contacts = this.state.contacts;
                        contacts[index].custom = {
                            deals: contactDealsResult.contactDeals,
                        };
                        this.setState({
                            isLoaded: {
                                ...this.state.isLoaded,
                                deals: true,
                            },
                            contacts,
                        });
                    });
                });
            },
            (error) => {
                this.setState({
                    isLoaded: {
                        contacts: true,
                    },
                    error: {
                        ...this.state.error.contacts,
                        error,
                    },
                });
            }
        );
    }

    render () {
        const { error, isLoaded, contacts, columns } = this.state;

        return (
            <>
                <table>
                    <thead>
                        <tr>
                            {columns.map((item, index) => (<th className={index === 0 ? 'padding-left-m' : index === (columns.length - 1) ? 'padding-right-m' : ''} key={item}>{item}</th>))}
                        </tr>
                    </thead>
                    <tbody>{contacts.length ? contacts.map(item => (
                        <tr key={item.id}>
                            <td className='padding-left-m'>
                                <input type='checkbox' className='checkbox-default'/>
                            </td>
                            <td title={`ID: ${item.id}`}>
                                <span className='color-action'>{item.firstName} {item.lastName}</span>
                            </td>
                            <td>
                                <span></span>
                            </td>
                            <td>
                                <span></span>
                            </td>
                            <td>
                                <span>
                                    {isLoaded.deals && item.custom ? item.custom.deals.length : 'Loading...'}
                                </span>
                            </td>
                            <td className={'padding-right-m'}>
                                <span></span>
                            </td>
                        </tr>
                    )) : null}
                    </tbody>
                </table>

                {error.contacts ? <p>Error: {error.contacts.message}</p> : !isLoaded.contacts ? <p>Loading...</p>: null}
            </>
        );
    }
}

export default App;
