import React, {useCallback} from "react";

/* @material-ui */
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

import LoginPage from './LoginPage01'
// import LoginPage from './indextwo'
import { ShowMessages } from '../../../components/Message/Generic/static_msg'

import loginPageStyle from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(loginPageStyle);

export default function LoginWrapper({ list }) {
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
                    className={classes.pageHeader}
                    style={{
                        backgroundImage: `url(${imagePreviewUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "top center"
                    }}
                > <div className={classes.container}>
                        {props.children}</div>
                </div>
            } else if (isFileType === 'video') {
                return <div className={classes.pageHeader}
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
                    <div className={classes.container}>
                        {props.children}</div>
                </div>
            } else {
                return null
            }
        },[classes.container, classes.pageHeader, imagePreviewUrl, isFileType])
  

    return (<MemoizedWrapper>
        {isShowMessage ? <ShowMessages
            visible={isShowMessage}
            message={list.message_loginfailed}
            color='danger'
            place='bl'
        /> : null}
        <LoginPage
            toggleMessage={(cb_toggleMessage) => { setShowMessage(cb_toggleMessage) }}
            list={list} />
    </MemoizedWrapper>);
}
