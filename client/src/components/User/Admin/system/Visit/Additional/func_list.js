import {
    Edit,
    Search,
    Close,
    Remove
} from '@material-ui/icons';

export default async function rawStateFunction_Visit_List({
    onRemoveItem,
}) {

    const state = {
        localStorage: {
            // model: 'visit',
            poliglot: false,
            tableparams: {
                renderHeader: true,
                columns: [
                    {
                        keyname: 'ip',
                        columntype: 'text',
                        config: {
                            valuetype: 'string',
                            indicator: 'ip',
                            label: 'Ip'
                        }
                    },
                    {
                        keyname: 'country',
                        columntype: 'text',
                        config: {
                            valuetype: 'string',
                            leftpath: 'data.country.names',
                            indicator: 'en',
                            label: 'Country',
                        }
                    },
                    {
                        keyname: 'city',
                        columntype: 'text',
                        config: {
                            valuetype: 'string',
                            leftpath: 'data.city.names',
                            indicator: 'en',
                            label: 'City',
                        }
                    },
                    {
                        keyname: 'createdat',
                        columntype: 'text',
                        config: {
                            valuetype: 'string',
                            indicator: 'createdAt',
                            label: 'Created At',
                        }
                    },
                    {
                        keyname: '',
                        columntype: 'iconbutton',
                        configparams: {
                        },
                        icon: Close,
                        actions: {
                            onClick: ({ event, value, viewparams, redux_localeuser, model }) => onRemoveItem({
                                event,
                                value,
                                viewparams,
                                redux_localeuser,
                                model,
                                state,

                            }),
                        },
                        inputprops: {
                            id: 'generic',
                            type: 'text',
                            name: 'generic_button',
                            color: 'inherit'
                        },
                        config: {
                            label: 'Remove',
                        },
                    },
                ]
            },
            qhelpers: {
            },
            linguistic: {
            },
        }
    }

    console.log(state);

    return state
}


