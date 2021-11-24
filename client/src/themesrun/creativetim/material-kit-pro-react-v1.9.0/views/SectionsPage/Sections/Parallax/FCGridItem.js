import React from "react";
// @material-ui/core components

// component Functions
export default function FCGridItem({ value, description, name, btn_launch}) {

    let render = () => {
        return <div>
            {name}
            {description}
            <br />
                {btn_launch}
        </div>
    }

    return render()
}



