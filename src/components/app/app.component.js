import React from 'react';
import MenuDownIcon from 'mdi-react/MenuDownIcon';

import agent from '../../services/agent';
import { getInitial } from '../../utilities/string';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                contacts: false,
            },
            isLoaded: {
                contacts: false,
                deals: false,
            },
            contacts: [],
            columns: ['', 'ID', 'Contact', 'Phone', 'Deals', 'IP', ''],
            actions: ['Delete', 'Update'],
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
                    },
                    (error) => {
                        this.setState({
                            isLoaded: {
                                deals: true,
                            },
                            error: {
                                ...this.state.error.deals,
                                error,
                            },
                        });
                    }
                    );
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
                        <tr className='color-slate-400'>
                            {columns.map((item, index) => (<th className={index === 0 ? 'padding-left-m' : index === (columns.length - 1) ? 'padding-right-m' : ''} key={index}>{item}</th>))}
                        </tr>
                    </thead>
                    <tbody>{contacts.length ? contacts.map(contact => (
                        <tr key={contact.id}>
                            <td className='padding-x-m'>
                                <input type='checkbox' className='checkbox-default'/>
                            </td>
                            <td>
                                <span>{contact.id}</span>
                            </td>
                            <td className='flex-inline align-items-center'>
                                {(contact.firstName && contact.lastName) ?
                                    <div className='contact-initials margin-right-m color-background-lavender-500 flex justify-content-center align-items-center'>
                                        {getInitial(contact.firstName)}{getInitial(contact.lastName)}
                                    </div>
                                    : null
                                }
                                <span className='color-action'>{contact.firstName} {contact.lastName}</span>
                            </td>
                            <td>
                                <span>{contact.phone}</span>
                            </td>
                            <td>
                                <span>
                                    {isLoaded.deals && contact.custom ? contact.custom.deals.length : 'Loading...'}
                                </span>
                            </td>
                            <td>
                                <span>{contact.ip ? contact.ip : null}</span>
                            </td>
                            <td className='padding-right-m flex-inline align-items-center'>
                                {contact.email ?
                                    <>
                                        <a href={'mailto:' + contact.email}><button className='button-small button-multi-left'>Email</button></a>
                                        <button className='button-small button-multi-right'>
                                            <MenuDownIcon/>
                                        </button>
                                    </>
                                    : null
                                }
                            </td>
                        </tr>
                    )) : null}
                    </tbody>
                </table>

                {error.contacts ? <p className='color-error'>Error: {error.contacts.message}</p> : !isLoaded.contacts ? <p>Loading...</p>: null}
            </>
        );
    }
}

export default App;
