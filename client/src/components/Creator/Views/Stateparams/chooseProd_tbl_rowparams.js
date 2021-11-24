const rowparams = {
    // renderHeader: false,
    // title: 'test',
    columns: [
        {
            keyname: '',
            columntype: 'toggle',
            inputprops: {
                id: 'checkbox'
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
                leftpath: 'images',
                indicator: '0',
                rightpath: 'url',
                valuetype: 'string',
            },
        },
        {
            keyname: 'name',
            columntype: 'span',
            config: {
                label: 'Name',
                // leftpath: 'name',
                valuetype: 'string',

            }
        },
        {
            keyname: 'type',
            columntype: 'function_loop',
            config: {
                label: 'Type',
                leftpath: 'type',
                valuetype: 'string',

            }
        },
    ]
}

export { rowparams }
