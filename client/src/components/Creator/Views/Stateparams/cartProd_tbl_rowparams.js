import {

    Delete
} from '@material-ui/icons';

const rowparams_cart = {
    // renderHeader: false,
    // title: 'test',
    columns: [
        {
            keyname: '',
            columntype: 'remove',
            icon: Delete,
            inputprops: {
                id: 'remove'
            },
            config: {
                label: '',
            },
        },
        {
            keyname: 'images',
            columntype: 'image',
            configparams: {
            },
            config: {
                label: '',
                leftpath: 'referenceID.images',
                indicator: '0',
                rightpath: 'url',
                valuetype: 'string',
            },
        },
        {
            keyname: 'quantity',
            columntype: 'quantity',
            config: {
                label: 'Quantity',
                leftpath: 'quantity',
                valuetype: 'string',

            }
        },
        {
            keyname: 'name',
            columntype: 'span',
            config: {
                label: 'Name',
                leftpath: 'referenceID',
                valuetype: 'object',

            }
        }

    ]
}

export { rowparams_cart }
