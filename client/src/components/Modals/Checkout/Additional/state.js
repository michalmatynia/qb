import Home from "@material-ui/icons/Home";
import Phone from "@material-ui/icons/Phone";
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from "@material-ui/core/InputAdornment";

const checkout_state = {
    email: {
        element: 'input',
        value: '',
        formcontrolprops: {
            fullWidth: true,
        },
        inputprops: {
            type: 'email',
            name: 'email_input',
            autoComplete: 'On',
            placeholder: '',

            startAdornment: (
                <InputAdornment position="start">
                    <EmailIcon style={{
                        // color: "red"
                    }} />
                </InputAdornment>
            )
        },
        configparams: {
            showlabel: false,
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
            helpertext: 'Enter Email',
        },
        validation: {
            parse: true,
            type: ['verifyemail'],
            message: ''
        },
        valid: false,
        touched: false,
    },
    address: {
        element: 'input',
        value: '',
        formcontrolprops: {
            fullWidth: true,
        },
        inputprops: {
            type: 'text',
            name: 'address_input',
            autoComplete: 'On',
            placeholder: '',

            startAdornment: (
                <InputAdornment position="start">
                    <Home style={{
                        // color: "red"
                    }} />
                </InputAdornment>
            )
        },
        configparams: {
            showlabel: false,
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
            label: 'Address',
            helpertext: 'Enter Address',
        },
        validation: {
            parse: true,
            type: ['required'],
            message: ''
        },
        valid: false,
        touched: false,
    },
    phone: {
        element: 'input',
        value: '',
        formcontrolprops: {
            fullWidth: true,
        },
        inputprops: {
            type: 'text',
            name: 'phone_input',
            autoComplete: 'On',
            placeholder: '',

            startAdornment: (
                <InputAdornment position="start">
                    <Phone style={{
                        // color: "red"
                    }} />
                </InputAdornment>
            )
        },
        configparams: {
            showlabel: false,
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
            label: 'Phone',
            helpertext: 'Enter Phone Number',
        },
        validation: {
            parse: true,
            type: ['verifyphone'],
            message: ''
        },
        valid: false,
        touched: false,
    },
}

export { checkout_state }
