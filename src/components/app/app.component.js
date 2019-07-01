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
            columns: [
                {type: 'checkbox'},
                {type: 'ID', sort: true},
                {type: 'Contact', sort: true},
                {type: 'Phone', sort: true},
                {type: 'Deals'},
                {type: 'IP', sort: true},
                {type: ''},
            ],
            actions: ['Delete', 'Update'],
        };
        this.sortData = (column) => event => {
            event.preventDefault();
            console.log(column);
        };
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;

        agent.Contacts.getAllContacts().then(
            (contactsListResult) => {
                if (this._isMounted) {
                    this.setState({
                        isLoaded: {
                            ...this.state.isLoaded,
                            contacts: true,
                        },
                        contacts: contactsListResult.contacts,
                    });
                }
                if (this.state.contacts) {
                    this.state.contacts.forEach((contact, index) => {
                        agent.Contacts.getContactDeals(contact.id).then((contactDealsResult) => {
                            const contacts = this.state.contacts;
                            contacts[index].custom = {
                                deals: contactDealsResult.contactDeals,
                            };
                            if (this._isMounted) {
                                this.setState({
                                    isLoaded: {
                                        ...this.state.isLoaded,
                                        deals: true,
                                    },
                                    contacts,
                                });
                            }
                        },
                        (error) => {
                            if (this._isMounted) {
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
                        });
                    });
                }
            },
            (error) => {
                if (this._isMounted) {
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
                            {columns.map((column, index) => (
                                <th className={index === 0 ? 'padding-left-m' : index === (columns.length - 1) ? 'padding-right-m' : ''} key={index} onClick={column.sort ? this.sortData(column) : null}>
                                    {column.type === 'checkbox' ? <input type='checkbox' className='checkbox-default'/> : <span>{column.type}</span>}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{contacts && contacts.length ? contacts.map(contact => (
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
                            <td className='padding-right-m flex align-items-center justify-content-right'>
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

                {(!contacts || !contacts.length) && isLoaded.contacts? <p>No contact data</p> : null}
                {error.contacts ? <p className='color-error'>Error: {error.contacts.message}</p> : !isLoaded.contacts ? <p>Loading...</p>: null}
            </>
        );
    }
}

export default App;
