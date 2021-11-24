import React, { useCallback } from "react";
// nodejs library that concatenates classes
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import ContactUsPage from './ContactUsPage01'
import { ShowMessages } from '../../../components/Message/Generic/static_msg'

import contactsStyle from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/sectionsSections/contactsStyle.js";

const useStyles = makeStyles(contactsStyle);

export default function ContactUsWrapper({ list, toggleMessage }) {
    const classes = useStyles();

    const [imagePreviewUrl, setImagePreviewUrl] = React.useState();
    const [isFileType, setIsFileType] = React.useState();
    const [isShowMessage, setShowMessage] = React.useState(false);

    React.useEffect(() => {

        async function processImage() {
            if (list.images[0].secure_url !== undefined) {

                // is Cloudinary
                setImagePreviewUrl(list.images[0].secure_url);
            } else {

                // is Blob
                let reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviewUrl(reader.result);
                };
                reader.readAsDataURL(list.images[0]);
            }
        }

        if (list.images.length > 0) {
            processImage()
        } else {
            setImagePreviewUrl(null);
        }

    }, [list.images])

    React.useEffect(() => {
        let parsedfiletype

        if (list.images.length > 0 && imagePreviewUrl) {

            if ('secure_url' in list.images[0]) {
                if (list.images[0].resource_type.includes('video')) { parsedfiletype = 'video' }
                else if (list.images[0].resource_type.includes('image')) { parsedfiletype = 'image' }
            } else {
                if (list.images[0].type.includes('video')) { parsedfiletype = 'video' }
                else if (list.images[0].type.includes('image')) { parsedfiletype = 'image' }
            }
        } else {
            parsedfiletype = 'image'
        }

        setIsFileType(parsedfiletype)
    }, [imagePreviewUrl, list.images])



    const MemoizedWrapper = useCallback(
        (props) => {


            if (isFileType === 'image') {

                return <div
                    className={classes.contacts + " " + classes.section}
                    style={{ backgroundImage: `url(${imagePreviewUrl})` }}
                > <div className={classes.container}>
                        {props.children}</div>
                </div>
            } else if (isFileType === 'video') {
                return <div
                className={classes.section}

                ><video autoPlay loop muted
                    style={{
                        position: 'absolute',
                        width: "100%",
                        height: "100%",
                        flex: "100%",
                        display: "flex",
                        objectFit: "cover", /* over-ride "object-fit: contain" only for webkit as it doesn't honour the ratio */
                    }} >
                        <source src={imagePreviewUrl ? imagePreviewUrl : null} type="video/mp4" />
                    </video>
                    <div className={classes.container} style={{ paddingTop: '80px'  }}>
                        {props.children}</div>
                </div>
            } else {
                return null
            }
        },
        [classes.contacts, classes.container, classes.section, imagePreviewUrl, isFileType],
    );




    return <MemoizedWrapper>
        {isShowMessage ? <ShowMessages
            visible={isShowMessage}
            message={list.messagesent_msg}
            color='success'
            place='bl'
        /> : null}
        <ContactUsPage
            toggleMessage={(cb_toggleMessage) => { setShowMessage(cb_toggleMessage) }}
            list={list} />
    </MemoizedWrapper>

}
