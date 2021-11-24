/* columntype has to be kept for more advanced headers */
const headerparams = {
            renderHeader: false,
            // title: 'test',
            columns: [
                {
                    keyname: '',
                    columntype: '',
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
                    config: {
                        label: '',
                    }
                },
                {
                    keyname: 'name',
                    columntype: 'text',
                    configparams: {
                    },
                    config: {
                        label: 'name',
                    },
                },

            
            ]
        }

export { headerparams }
