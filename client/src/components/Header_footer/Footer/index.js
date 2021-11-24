import React from "react";
// react components used to create a google map
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
// } from "react-google-maps";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui/icons
import PinDrop from "@material-ui/icons/PinDrop";
import Phone from "@material-ui/icons/Phone";
import Check from "@material-ui/icons/Check";
// core components
import GridContainer from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridContainer.js";
import GridItem from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/Grid/GridItem.js";
import InfoArea from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/InfoArea/InfoArea.js";
import Card from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/Card/Card.js";
import CardHeader from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardHeader.js";
import CardBody from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardBody.js";
import CardFooter from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/Card/CardFooter.js";
import CustomInput from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/CustomInput/CustomInput.js";
import Button from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/components/CustomButtons/Button.js";

import contactsStyle from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/contactsStyle.js";

import city from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/assets/img/examples/city.jpg";

const useStyles = makeStyles(contactsStyle);

// export function Footer({ item, i }) {
// }
// const Footer = ({mysite}) => {}

export function Footer({ mysite }) {

    const [checked, setChecked] = React.useState([]);
    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const classes = useStyles();

    if (mysite !== undefined) {
        // <div className="cd-section" >
        return <div
            className={classes.contacts + " " + classes.section}
            style={{ backgroundImage: `url(${city})` }}
        >
            <div className={classes.container}>
                <GridContainer>
                    <GridItem xs={12} sm={5} md={5}>
                        <h2 className={classes.title}>In Kontakt kommen</h2>
                        <h5 className={classes.description}>
                            Benötigen Sie weitere Informationen? Überprüfen Sie, was andere Personen über unser Produkt sagen. Sie sind sehr zufrieden mit ihrem Kauf.
                        </h5>
                        <InfoArea
                            className={classes.infoArea}
                            title="Finden Sie uns im Büro"
                            description={
                                <span>
                                    Germany
                                    {/* {mysite.addressPrefs.address} */}
                                </span>
                            }
                            icon={PinDrop}
                        />
                        <InfoArea
                            className={classes.infoArea}
                            title="Ruf uns an"
                            description={
                                <span>
                                    Rene Noske
                                    <br /> +41 777 777 434
                                    <br /> 9:00-17:00
                                </span>
                            }
                            icon={Phone}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={5} md={5} className={classes.mlAuto}>
                        <Card className={classes.card1}>
                            <form>
                                <CardHeader
                                    contact
                                    color="primary"
                                    className={classes.textCenter}
                                >
                                    <h4 className={classes.cardTitle}>Kontaktiere uns</h4>
                                </CardHeader>
                                <CardBody>
                                    <GridContainer>
                                        <GridItem xs={12} sm={6} md={6}>
                                            <CustomInput
                                                labelText="Vorname"
                                                id="first"
                                                formControlProps={{
                                                    fullWidth: true,
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={6}>
                                            <CustomInput
                                                labelText="Nachname"
                                                id="last"
                                                formControlProps={{
                                                    fullWidth: true,
                                                }}
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <CustomInput
                                        labelText="E-Mail-Addresse"
                                        id="email-address"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                    />
                                    <CustomInput
                                        labelText="Ihre Nachricht"
                                        id="message"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            multiline: true,
                                            rows: 5,
                                        }}
                                    />
                                </CardBody>
                                <CardFooter className={classes.justifyContentBetween}>
                                    <FormControlLabel
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
                                        label="I'm not a robot"
                                    />
                                    <Button color="primary" className={classes.pullRight}>
                                        {// Send to
                                            // mysite.addressPrefs.email
                                        }
                                        Senden
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </div>

        /* </div> */

    } else { return null }

};

export default Footer;
