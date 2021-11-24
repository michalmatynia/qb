import React from "react";
// @material-ui/core components

// @material-ui/core components
import VideoUpload from "../../../../themesrun/creativetim/material-dashboard-pro-react-v1.9.0/components/CustomUpload/VideoUpload.js";
// material ui icons

// style for this view
// function that returns true if value is email, false otherwise


export default function FormVideoUpload({ formcell, change, formcellkey, removefile }) {


    const renderTemplate = () => {

        let formTemplate = null;
        switch (formcell.category) {
            case ('ct_regularvideo'):
                formTemplate = (
                    <VideoUpload
                    addButtonProps={{
                      color: "rose",
                      round: true,
                    }}
                    changeButtonProps={{
                      color: "rose",
                      round: true
                    }}
                    removeButtonProps={{
                      color: "danger",
                      round: true
                    }}
                    change={change}
                    id={formcellkey}
                    formcell={formcell}
                    removefile={removefile}
                  />
                )
                break;

            default:
                formTemplate = null;
        }

        return formTemplate;

    }

    return (
        <div>
            {renderTemplate()}
        </div>
    )
}