import {
    Edit,
    Search,
    Close,
} from '@material-ui/icons';

export default async function rawStateFunction_Visit_List({
    onRemoveItem,
    onGotoLink
}) {


    const state = {
        localStorage: {
            model: 'user',
            poliglot: false,
            tableparams: {
                renderHeader: true,
                columns: [
                    {
                        keyname: 'images',
                        columntype: 'image',
                        configparams: {
                        },
                        config: {
                            label: 'Image',
                            leftpath: 'images',
                            indicator: '0',
                            rightpath: 'url',
                            valuetype: 'string',
                        },
                    },
                    {
                        keyname: 'position',
                        columntype: 'text',
                        config: {
                            valuetype: 'string',
                            indicator: 'position',
                            label: 'Position'
                        }
                    },
                    {
                        keyname: 'name',
                        columntype: 'text',
                        config: {
                            valuetype: 'string',
                            indicator: 'name',
                            label: 'Name',
                        }
                    },
                    {
                        keyname: 'lastname',
                        columntype: 'text',
                        config: {
                            valuetype: 'string',
                            indicator: 'lastname',
                            label: 'Last Name',
                        }
                    },
                    {
                        keyname: '',
                        columntype: 'adjust',
                        inputprops: {
                        },
                        config: {
                            label: 'Up/Down',
                        },
                    },
                    {
                        keyname: '',
                        columntype: 'iconbutton',
                        configparams: {
                        },
                        icon: Edit,
                        actions: {
                            onClick: ({ event, value, cell, sublistkey, reactrouter_history, redux_userdata, model }) => onGotoLink({
                                event,
                                value,
                                cell,
                                sublistkey,
                                reactrouter_history,
                                redux_userdata, 
                                model
                            }),
                        },
                        inputprops: {
                            id: 'generic',
                            type: 'text',
                            name: 'generic_button',
                            color: 'primary'
                        },
                        config: {
                            label: 'Edit',
                        },
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
                    }
                ]
            },
            qhelpers: {
            },
            linguistic: {
                translate: ['name', 'description']
            },
        }
    }

    return state
}


