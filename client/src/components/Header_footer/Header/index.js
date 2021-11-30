import React from 'react';
import {
    useSelector,
} from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';

/* STATE */
import { HeaderLinks } from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Header/HeaderLinks.js";
import Header from "../../../themesrun/creativetim/material-kit-pro-react-v1.9.0/components/Header/Header.js";

function HeaderHolder() {

    let redux_currentmysite = useSelector(state => state.mysite.CurrentMysite)

    const [isImages, setImages] = React.useState();

    const [isloading, setIsLoading] = React.useState(true);


    React.useEffect(() => {

        if (redux_currentmysite && !isImages) {
            if (redux_currentmysite.images.length > 0) {
                setImages(redux_currentmysite.images)

            } else {
                setImages([])

            }
            setImages(redux_currentmysite.images)
            setIsLoading(false)

        }
    }, [isImages, redux_currentmysite])


    if (isloading) {
        return (
            <div
                style={{
                    //   backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundColor: '#595959',
                    backgroundPosition: " center",
                    paddingTop: '25%',
                    position: 'fixed',
                    left: '0px',
                    top: '0px',
                    width: '100%',
                    height: '100%',
                    // zIndex: '9999',
                    textAlign: 'center',
                }}
            >
                <CircularProgress style={{ color: '#cccccc' }} thickness={7} />
            </div>
        )
    } else if (!isloading && isImages) {
        return (
            <div>
                <Header
                    absolute
                    links={<HeaderLinks dropdownHoverColor="info"  />}
                    fixed
                    // color="dark"

                    color="customcolor"
                    changeColorOnScroll={{
                        height: 400,
                        // color: "customcolorscrollon",
                        color: "dark",

                    }}
                    images={isImages}
                />
            </div>

        )
    }
}

export default HeaderHolder
