import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// core components
import Button from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/components/CustomButtons/Button.js";

import defaultImage from "../../../../../templates/creativetim/material-dashboard-pro-react-v1.9.0/assets/img/image_placeholder.jpg";

export default function MultiUpload(props) {
    let { avatar, addButtonProps,  removeButtonProps } = props;

    /*     This is a raw file Array */

    const [isBlobFile, setBlobFile] = React.useState([])

    let fileInput = React.createRef();

    React.useEffect(() => {

        async function processCollection({ newValues }) {

            for (let [keyfile, file] of Object.entries(newValues)) {

                if ('secure_url' in file) {
                    /* Cloudinary */
                    setBlobFile(prevState => {
                        return [...prevState, prevState[keyfile] = { secure_url: file.secure_url, file }]
                    })
                } else {
                    /* Blob */
                    let reader = new FileReader();
                    reader.onloadend = () => {

                        setBlobFile(prevState => {
                            return [...prevState, prevState[keyfile] = { blob: reader.result, file }]
                        })
                    };
                    reader.readAsDataURL(file);
                }


            }
        }

        let newValues = { ...props.formcell.value }
        if (newValues.length === 0) {

            setBlobFile([])

        } else {
            setBlobFile([])
            processCollection({ newValues })
        }

    }, [props.formcell.value])

    function handleFileChange({ event, files }) {

        setBlobFile([])
   

        let newFormCell = { ...props.formcell }
        if (newFormCell.value.length === 0) {
            newFormCell.value = [...event.target.files]

        } else {

            newFormCell.value = [...newFormCell.value, ...event.target.files]

        }


        props.change({ cell: { [props.id]: newFormCell } });

    }

    const handleClick = ({ event }) => {
        fileInput.current.click();
    };
    const handleRemove = ({ event, key, eachfile }) => {
        let newFormCell = { ...props.formcell }

        if ('secure_url' in eachfile) {
            // is Cloudinary

            newFormCell.value = newFormCell.value.filter(item => {
                return item.public_id !== eachfile.public_id;
            })
            props.removefile({ cell: { [props.id]: newFormCell }, fileid: eachfile.public_id });
            props.change({ cell: { [props.id]: newFormCell } });

        } else {
            // is Blob
            setBlobFile([])

            newFormCell.value = newFormCell.value.reduce((accum, currentvalue, CurrentIndex) => {

                return currentvalue === eachfile ? accum : [...accum, currentvalue]

            }, [])

            props.change({ cell: { [props.id]: newFormCell } });
        }


    };
    function generateImageContainers() {


        if (isBlobFile.length === 0) {
            return <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
                <img src={defaultImage} alt="..." />
            </div>
        } else if (isBlobFile.length > 0) {
            let output = []

            for (let [blobfilekey, eachblobfile] of Object.entries(isBlobFile)) {
  
                if ('secure_url' in eachblobfile) {
                    /* from Cloudinary*/

                    if (eachblobfile.file.resource_type.includes('video')) {
                        output.push(<div key={blobfilekey} className={"thumbnail" + (avatar ? " img-circle" : "")}>
                            <video controls autoPlay loop muted playsInline style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "cover", /* over-ride "object-fit: contain" only for webkit as it doesn't honour the ratio */
                            }}>
                                <source src={eachblobfile.secure_url} type="video/mp4" />
                            </video><span><Button {...removeButtonProps} onClick={(event) => handleRemove({ event, blobfilekey, eachfile: eachblobfile.file })}>
                                <i className="fas fa-times" /> Remove
                            </Button></span></div>)
                    } else if (eachblobfile.file.resource_type.includes('image')) {
                        output.push(<div key={blobfilekey} className={"thumbnail" + (avatar ? " img-circle" : "")}>
                            <img src={eachblobfile.secure_url} alt="..." />
                            <span><Button {...removeButtonProps} onClick={(event) => handleRemove({ event, blobfilekey, eachfile: eachblobfile.file })}>
                                <i className="fas fa-times" /> Remove
                            </Button></span>
                        </div>)
                    }

                } else {
                    /* from Blob */
                    if (eachblobfile.file.type.includes('video')) {
                        output.push(<div key={blobfilekey} className={"thumbnail" + (avatar ? " img-circle" : "")}>
                            <video controls autoPlay loop muted playsInline style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "cover", /* over-ride "object-fit: contain" only for webkit as it doesn't honour the ratio */
                            }}>
                                <source src={eachblobfile.blob} type="video/mp4" />
                            </video><span><Button {...removeButtonProps} onClick={(event) => handleRemove({ event, blobfilekey, eachfile: eachblobfile.file })}>
                                <i className="fas fa-times" /> Remove
                            </Button></span></div>)
                    } else if (eachblobfile.file.type.includes('image')) {

                        output.push(<div key={blobfilekey} className={"thumbnail" + (avatar ? " img-circle" : "")}>
                            <img src={eachblobfile.blob} alt="..." />
                            <span><Button {...removeButtonProps} onClick={(event) => handleRemove({ event, blobfilekey, eachfile: eachblobfile.file })}>
                                <i className="fas fa-times" /> Remove
                            </Button></span>
                        </div>)
                    }
                }
            }

            return output.map(item => item)

        }

    }

    return (
        <div>
            <div>
                {<Button {...addButtonProps} onClick={(event) => handleClick({ event })}>
                    {avatar ? "Add File" : "Select Files"}
                </Button>}
            </div>
            <div className="fileinput text-center">
                <input
                    {...props.formcell.inputprops}
                    multiple
                    onChange={(event) => handleFileChange({ event })}
                    ref={fileInput}
                // onChange={handleFileChange} 
                />
                {generateImageContainers()}

            </div>

        </div >
    );
}

MultiUpload.propTypes = {
    avatar: PropTypes.bool,
    addButtonProps: PropTypes.object,
    changeButtonProps: PropTypes.object,
    removeButtonProps: PropTypes.object
};
