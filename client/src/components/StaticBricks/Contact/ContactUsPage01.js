import React from "react";
// nodejs library that concatenates classes
// import classNames from "classnames";
// import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
    useSelector,
    // useDispatch 
} from 'react-redux'

// @material-ui/icons
import PinDrop from "@material-ui/icons/PinDrop";
import Phone from "@material-ui/icons/Phone";
// import BusinessCenter from "@material-ui/icons/BusinessCenter";
// core components
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
// import Check from "@material-ui/icons/Check";

import GridContainer from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import InfoArea from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/InfoArea/InfoArea.js";
import CardBody from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import CardFooter from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardFooter.js";
import Card from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardHeader from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardHeader.js";
// import CustomInput from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomInput/CustomInput.js";
import Button from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";
import { validateForm } from "../../utils/Form/Funcs/validateForm"
import FormCustomInput from '../../Form/Custom/Input/FormCustomInput';
// import { ShowMessages } from '../../Message/Generic/static_msg'
import { contact_state } from "./Additional/state"
// import { storeFuncs_loadList } from '../../../functions/HookFuncs/store_funcs';
import { generateData, isFormValid_v2 } from '../../../components/utils/Form/formActions';
import { contact_confirmation_email, contact_messagebody } from '../../utils/Email/templates'
import {
    plg_sendMail,
} from '../../utils/Plugs/cms_plugs';

import contactsStyle from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/contactsStyle.js";

const useStyles = makeStyles(contactsStyle);

export default function ContactUsPage({ list, toggleMessage }) {

    let redux_currentmysite = useSelector(state => state.mysite.CurrentMysite)

    const [fcstate, setFcState] = React.useState(contact_state);
    // const [isShowMessage, setShowMessage] = React.useState(false);
    // const [checked, setChecked] = React.useState([]);
    const [isFormValid, setIsFormValid] = React.useState(false);

    React.useEffect(() => {

        if (isFormValid_v2({ formdata: fcstate })) {
            setIsFormValid(true)

        } else {
            setIsFormValid(false)

        }

    }, [fcstate])

    React.useEffect(() => {

        async function assignLabels() {
            let fieldlabels = ['form_fname', 'form_lname', 'form_email', 'form_yourmessage']

            for (let eachone of fieldlabels) {

                setFcState(prevState => ({
                    ...prevState,
                    [eachone]: {
                        ...prevState[eachone],
                        config: { ...prevState[eachone].config, label: list[eachone] },
                    }
                }));
            }
        }

        assignLabels()

    }, [list])

    /* I'm not a robot button */
    /* implement later */

    /*     const handleToggle = (value) => {
            const currentIndex = checked.indexOf(value);
            const newChecked = [...checked];
            if (currentIndex === -1) {
                newChecked.push(value);
            } else {
                newChecked.splice(currentIndex, 1);
            }
            setChecked(newChecked);
        }; */

    async function updateFormValues({ event, cellkey }) {

        // VERSION 2
        let validated = { isValid: false }
        if (fcstate[cellkey].validation.parse) {
            validated = validateForm({ redux_currentmysite, formcell: fcstate[cellkey], event })

            if (!validated.isValid) {
                setFcState(prevState => ({
                    ...prevState,
                    [cellkey]: {
                        ...prevState[cellkey],
                        validation: { ...prevState[cellkey].validation, message: validated.vtext[0] },
                        value: event.target.value,
                        valid: false
                    }
                }));

            } else {
                setFcState(prevState => ({
                    ...prevState,
                    [cellkey]: {
                        ...prevState[cellkey],
                        validation: { ...prevState[cellkey].validation, message: '' },
                        value: event.target.value,
                        valid: true
                    }
                }));
            }

        } else {
            setFcState(prevState => ({
                ...prevState,
                [cellkey]: {
                    ...prevState[cellkey],
                    value: event.target.value,
                }
            }));
        }

    }

    async function submitContactForm({ event = null, data = null, fcstate = null }) {

        let dataToSubmit = generateData({ formdata: fcstate });

        if (isFormValid) {

            let to = redux_currentmysite.email

            /* From Email must be hosted on a server */

            let from = redux_currentmysite.email

            let subject = `Message from ` + dataToSubmit.form_fname + ` ` + dataToSubmit.form_lname + ` ` + dataToSubmit.form_email

            let html

            html = await contact_messagebody({ from, body: dataToSubmit.form_yourmessage, subject })

            let response = await plg_sendMail({ to, html, from, subject })

            to = dataToSubmit.form_email
            from = redux_currentmysite.email
            subject = `Message from ` + dataToSubmit.form_fname + ` ` + dataToSubmit.form_lname + ` ` + dataToSubmit.form_email
            html = await contact_confirmation_email({ from, body: dataToSubmit.form_yourmessage, subject })

            await plg_sendMail({ to, html, from, subject })
            /* Reset Field */

            if (response.payload) {

                for (let cellkey of Object.keys(fcstate)) {

                    setFcState(prevState => ({
                        ...prevState,
                        [cellkey]: {
                            ...prevState[cellkey],
                            value: '',
                        }
                    }));
                }
            }

            /* Show message functionality */

                    toggleMessage(true)
                    setTimeout(() => {
                        toggleMessage(false)

                    }, 1000)
        }


    }

    const classes = useStyles();
    return (
        <GridContainer>

            <GridItem xs={12} sm={5} md={5}>
                <h2 className={classes.title}
                    style={{ color: '#FFF' }}
                >{list.title}</h2>
                <h5 className={classes.description}>
                    {list.description}
                </h5>
                <InfoArea
                    style={{ color: '#FFF' }}
                    className={classes.infoArea}
                    title={list.tag_findus}
                    description={
                        <span>{redux_currentmysite.address_street}
                            <br /> {redux_currentmysite.address_zip} {redux_currentmysite.address_city},
                            <br /> {redux_currentmysite.address_country}
                        </span>
                    }
                    icon={PinDrop}
                />
                <InfoArea
                    className={classes.infoArea}
                    title={list.tag_callus}
                    description={
                        <span>
                            {redux_currentmysite.address_fname} {redux_currentmysite.address_lname}
                            <br /> {redux_currentmysite.address_telephone}
                            <br /> {redux_currentmysite.email}

                            {/* <br /> Mon - Fri, 8:00-22:00 */}
                        </span>
                    }
                    icon={Phone}
                />
            </GridItem>
            <GridItem xs={12} sm={5} md={5} className={classes.mlAuto}>
                <Card className={classes.card1}>
                    <CardHeader
                        contact
                        color="primary"
                        className={classes.textCenter}
                    >
                        <h4 className={classes.cardTitle}>{list.name}</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={6} md={6}>
                                <FormCustomInput
                                    formcell={fcstate.form_fname}
                                    change={({ event }) => updateFormValues({ event, cellkey: 'form_fname' })}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6}>
                                <FormCustomInput
                                    formcell={fcstate.form_lname}
                                    change={({ event }) => updateFormValues({ event, cellkey: 'form_lname' })}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <FormCustomInput
                                    formcell={fcstate.form_email}
                                    change={({ event }) => updateFormValues({ event, cellkey: 'form_email' })}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <FormCustomInput
                                    formcell={fcstate.form_yourmessage}
                                    change={({ event }) => updateFormValues({ event, cellkey: 'form_yourmessage' })}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                    <CardFooter className={classes.justifyContentBetween}>
                        {/* <FormControlLabel
                            control={
                                <Checkbox
                                    tabIndex={-1}
                                    onClick={() => handleToggle(1)}
                                    checkedIcon={
                                        <Check className={classes.checkedIcon} />
                                    }
                                    icon={<Check className={classes.uncheckedIcon} />}
                                    classes={{
                                        checked: classes.checked,
                                        root: classes.checkRoot,
                                    }}
                                />
                            }
                            classes={{ label: classes.label }}
                            label={list.form_notrobot}
                        /> */}
                        <Button color="primary" className={classes.pullRight}
                            onClick={() => submitContactForm({ fcstate })}
                        >
                            {list.btn_execute}
                        </Button>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
