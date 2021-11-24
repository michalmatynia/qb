import React from 'react';
import {
    useSelector,
} from 'react-redux'

/* STATE */
import { header_state } from "./Additional/state"

import { HeaderLinks } from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Header/HeaderLinks.js";
import Header from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Header/Header.js";


  function HeaderHolder() {

    let redux_currentmysite = useSelector(state => state.mysite.CurrentMysite)

    return (
        <div>

            <Header
                absolute
                links={<HeaderLinks dropdownHoverColor="info" mystate={header_state} />}
                fixed
                // color="dark"

                color="transparent"
                // style={{ backgroundColor: 'darkgrey'}}
                changeColorOnScroll={{
                    height: 400,
                    color: "dark",
                }}
                images={redux_currentmysite ? redux_currentmysite.images : null}
            />


        </div>
    );
}
export default HeaderHolder