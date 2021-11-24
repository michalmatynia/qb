const contact_state = {
    form_fname: {
        element: 'input',
        value: '',
        formcontrolprops: {
            fullWidth: true,
        },
        inputprops: {
            type: 'text',
            name: 'firstname_input',
            autoComplete: 'On',
        },
        configparams: {
            showlabel: true,
            showhelpertext: false,
            showfield: true,
        },
        fillfields: {
            value: {
                toconfig: {
                    setpath: 'value',
                    valuetype: 'string',
                    resetvalue: '',
                },
            },

        },
        config: {
            label: 'First Name',
            helpertext: '',

        },
        validation: {
            parse: false,
            message: ''
        },
        valid: true,
        touched: false,
    },
    form_lname: {
        element: 'input',
        value: '',
        formcontrolprops: {
            fullWidth: true,
        },
        inputprops: {
            type: 'text',
            name: 'lastname_input',
            autoComplete: 'On',
        },
        configparams: {
            showlabel: true,
            showhelpertext: false,
            showfield: true,
        },
        fillfields: {
            value: {
                toconfig: {
                    setpath: 'value',
                    valuetype: 'string',
                    resetvalue: '',
                },
            },

        },
        config: {
            label: 'Last Name',
            helpertext: '',

        },
        validation: {
            parse: false,
            message: ''
        },
        valid: true,
        touched: false,
    },
    form_email: {
        element: 'input',
        value: '',
        formcontrolprops: {
            fullWidth: true,
        },
        inputprops: {
            type: 'email',
            name: 'email_input',
            autoComplete: 'On',
        },
        configparams: {
            showlabel: true,
            showhelpertext: false,
            showfield: true,
        },
        fillfields: {
            value: {
                toconfig: {
                    setpath: 'value',
                    valuetype: 'string',
                    resetvalue: '',
                },
            },

        },
        config: {
            label: 'Email',
            helpertext: '',

        },
        validation: {
            parse: true,
            type: ['verifyemail', 'contactemail'],
            message: ''
        },
        valid: false,
        touched: false,
    },
    form_yourmessage: {
        element: 'input',
        value: '',
        formcontrolprops: {
            fullWidth: true,
        },
        inputprops: {
            type: 'text',
            name: 'lastname_input',
            autoComplete: 'On',
            multiline: true,
            rows: 5,
        },
        configparams: {
            showlabel: true,
            showhelpertext: false,
            showfield: true,
        },
        fillfields: {
            value: {
                toconfig: {
                    setpath: 'value',
                    valuetype: 'string',
                    resetvalue: '',
                },
            },

        },
        config: {
            label: 'Message',
            helpertext: '',

        },
        validation: {
            parse: true,
            type: ['required'],
            message: ''
        },
        valid: false,
        touched: false,
    },
}

export { contact_state }
