import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// core components
import Button from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/CustomButtons/Button.js";

import defaultImage from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/img/image_placeholder.jpg";
import defaultAvatar from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/img/placeholder.jpg";

export default function ImageUpload(props) {

    let newFormCell = { ...props.formcell }

    const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
        props.avatar ? defaultAvatar : defaultImage
    );

    React.useEffect(() => {
        if (props.formcell.value.length === 0) {
            setImagePreviewUrl(props.avatar ? defaultAvatar : defaultImage)
        } else {


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


    let fileInput = React.createRef();
    const handleImageChange = ({event})=> {

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
    // eslint-disable-next-line
    const handleSubmit = ({event}) => {
        event.preventDefault();
        // file is the file/image uploaded
        // in this function you can save the image (file) on form submit
        // you have to call it yourself
    };
    const handleClick = ({event}) => {
        fileInput.current.click();
    };
    const handleRemove = ({event}) => {
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

    let { avatar, addButtonProps, changeButtonProps, removeButtonProps } = props;
    return (
        <div className="fileinput text-center">
            <input {...props.formcell.inputprops} onChange={(event ) => handleImageChange({ event })} ref={fileInput} />
            <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
                <img src={imagePreviewUrl} alt="..." />
            </div>
            <div>
                {
                // console.log(newFormCell.value[0]),
                    newFormCell.value[0] === undefined ? (
                        <Button {...addButtonProps} onClick={(event) => handleClick({event})}>
                            {avatar ? "Add Photo" : "Select image"}
                        </Button>
                    ) : (
                        <span>
                            <Button {...changeButtonProps} onClick={(event) => handleClick({event})}>
                                change
                                </Button>
                            {avatar ? <br /> : null}
                            <Button {...removeButtonProps} onClick={(event) => handleRemove({event})}>
                                <i className="fas fa-times" /> Remove
                                </Button>
                        </span>
                    )}
            </div>
        </div>
    );
}

ImageUpload.propTypes = {
    avatar: PropTypes.bool,
    addButtonProps: PropTypes.object,
    changeButtonProps: PropTypes.object,
    removeButtonProps: PropTypes.object
};
