import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// core components
import Button from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/CustomButtons/Button.js";

import defaultImage from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/img/image_placeholder.jpg";
import defaultAvatar from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/img/placeholder.jpg";

export default function VideoUpload(props) {
    let fileInput = React.createRef();
    let { avatar, addButtonProps, changeButtonProps, removeButtonProps } = props;
    let newFormCell = { ...props.formcell }

    const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
        props.avatar ? defaultAvatar : defaultImage
    );
    const [isFile, setIsFile] = React.useState()

    React.useEffect(() => {
        if (props.formcell.value.length === 0) {
            setImagePreviewUrl(props.avatar ? defaultAvatar : defaultImage)
        } else {

            setIsFile(props.formcell.value[0])
            if (props.formcell.value[0].secure_url !== undefined) {
                // is Cloudinary

                setImagePreviewUrl(props.formcell.value[0].secure_url);

            } else {
                // is Blob
                let reader = new FileReader();
                reader.onloadend = () => {

                    setImagePreviewUrl(reader.result);
                };
                reader.readAsDataURL(props.formcell.value[0]);
            }
        }

    }, [props.avatar, props.formcell.value])


    const handleVideoChange = ({ event }) => {

        event.preventDefault();
        let reader = new FileReader();
        reader.onloadend = () => {

            newFormCell.value = [] // Reset the array
            newFormCell.value.push(event.target.files[0])

            props.change({ event, cell: { [props.id]: newFormCell } });

        };

        let file = null

        if (event.target.files[0]) {
            file = event.target.files[0]
        } else if (props.formcell.value[0]) {

            file = props.formcell.value[0]
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    /*     const handleSubmit = ({ event }) => {
            event.preventDefault();
            // file is the file/image uploaded
            // in this function you can save the image (file) on form submit
            // you have to call it yourself
        }; */
    const handleClick = ({ event }) => {
        fileInput.current.click();
    };
    const handleRemove = ({ event }) => {
        //=================
        event.preventDefault();

        setImagePreviewUrl(props.avatar ? defaultAvatar : defaultImage);
        if (props.formcell.value[0].secure_url !== undefined) {

            // is Cloudinary
            newFormCell.value = props.formcell.value.filter(item => {
                return item.public_id !== props.formcell.value[0].public_id;
            })
            props.removefile({ cell: { [props.id]: newFormCell }, fileid: props.formcell.value[0].public_id });

        } else {
            // is Blob
            const lastItem = fileInput.current.value.substring(fileInput.current.value.lastIndexOf('\\') + 1)

            newFormCell.value = props.formcell.value.filter(item => {
                return lastItem !== props.formcell.value[0].name;
            })

        }

        props.change({ event, cell: { [props.id]: newFormCell } });


    };

    function showFilePreview({ imagePreviewUrl }) {


        if (imagePreviewUrl === defaultImage) {
            return <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
                <img src={imagePreviewUrl} alt="..." />
            </div>
        } else if (isFile) {


            if ('secure_url' in isFile) {
               /* from Cloudinary*/

                if (isFile.resource_type.includes('video')) {
                    return <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
                    <video controls autoPlay loop muted playsInline style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover", /* over-ride "object-fit: contain" only for webkit as it doesn't honour the ratio */
                    }}>
                        <source src={imagePreviewUrl} type="video/mp4" />
                    </video></div>
                } else if (isFile.resource_type.includes('image') && imagePreviewUrl && imagePreviewUrl !== defaultImage) {
                    return <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
                        <img src={imagePreviewUrl} alt="..." />
                    </div>
                }

            } else {
                /* from Blob */
                if (isFile.type.includes('video') && imagePreviewUrl && imagePreviewUrl !== defaultImage) {
                    return <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
                        <video controls autoPlay loop muted playsInline style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover", /* over-ride "object-fit: contain" only for webkit as it doesn't honour the ratio */
                        }}>
                            <source src={imagePreviewUrl} type="video/mp4" />
                        </video></div>
                } else if (isFile.type.includes('image') && imagePreviewUrl && imagePreviewUrl !== defaultImage) {
                    return <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
                        <img src={imagePreviewUrl} alt="..." />
                    </div>
                }
            }

        } else {
            return null
        }

    }

    return (
        <div className="fileinput text-center">

            <input {...props.formcell.inputprops} onChange={(event) => handleVideoChange({ event })} ref={fileInput} />
            {showFilePreview({ imagePreviewUrl })}

            <div>
                {
                    newFormCell.value[0] === undefined ? (
                        <Button {...addButtonProps} onClick={(event) => handleClick({ event })}>
                            {avatar ? "Add File" : "Select File"}
                        </Button>
                    ) : (
                        <span>
                            <Button {...changeButtonProps} onClick={(event) => handleClick({ event })}>
                                change
                            </Button>
                            {avatar ? <br /> : null}
                            <Button {...removeButtonProps} onClick={(event) => handleRemove({ event })}>
                                <i className="fas fa-times" /> Remove
                            </Button>
                        </span>
                    )}
            </div>
        </div>
    );
}

VideoUpload.propTypes = {
    avatar: PropTypes.bool,
    addButtonProps: PropTypes.object,
    changeButtonProps: PropTypes.object,
    removeButtonProps: PropTypes.object
};
