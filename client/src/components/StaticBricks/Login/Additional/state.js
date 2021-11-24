import Lock from "@material-ui/icons/Lock";
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from "@material-ui/core/InputAdornment";

const login_state = {
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
            placeholder: 'Enter Email',
            startAdornment: (
                <InputAdornment position="start">
                    <EmailIcon style={{
                        // color: "red"
                    }} />
                </InputAdornment>
            )
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
            label: '',
            helpertext: '',

        },
        validation: {
            parse: true,
            type: ['verifyemail'],
            message: ''
        },
        valid: false,
        touched: false,
    },
    form_password: {
        element: 'input',
        value: '',
        formcontrolprops: {
            fullWidth: true,
        },
        inputprops: {
            type: 'password',
            name: 'password_input',
            autoComplete: 'On',
            placeholder: 'Enter Password',
            startAdornment: (
                <InputAdornment position="start">
                    <Lock style={{
                        // color: "red"
                    }} />
                </InputAdornment>
            )
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
            label: '',
            helpertext: '',

        },
        validation: {
            parse: false,
            // type: ['required'],
            message: ''
        },
        valid: true,
        touched: false,
    },
}

export { login_state }
