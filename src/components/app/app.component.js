import React from 'react';

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
                tags: true,
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
                    // console.log(contact.links);
                    // console.log(contact.geoAddresses);
                    agent.Contacts.getContactData(contact.id).then((result) => console.log(result.contactDatum));
                    // agent.Address.getContactAddress(contact.id).then((result) => console.log(result));
                    /* agent.Tags.getContactTag(contact.id).then((contactTagResult) => {
                        console.log(contactTagResult.tag.tag);
                        /* this.setState({
                            ...this.state.contacts,
                        });
                    }); */

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
                            {columns.map((item, index) => (<th className={index === 0 ? 'padding-left-m' : index === (columns.length - 1) ? 'padding-right-m' : ''} key={item}>{item}</th>))}
                        </tr>
                    </thead>
                    <tbody>{contacts.length ? contacts.map(item => (
                        <tr key={item.id}>
                            <td className='padding-x-m'>
                                <input type='checkbox' className='checkbox-default'/>
                            </td>
                            <td className='flex align-items-center' title={`ID: ${item.id}`}>
                                {(item.firstName && item.lastName) ?
                                    <div className='contact-initials margin-right-m color-background-lavender-500 flex justify-content-center align-items-center'>{getInitial(item.firstName)}{getInitial(item.lastName)}</div>
                                    : null
                                }
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
