import React, { useCallback } from "react";
// nodejs library that concatenates classes

// @material-ui icons
// import Favorite from "@material-ui/icons/Favorite";
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FCTaxonomyListOne from './FCTaxonomyListOne'
// core components


export default function FCTaxonomy({ arrayTaxo, cb_runCheckedTaxo, checkedTaxo }) {
    // const [isArrayTaxo, setArrayTaxo] = React.useState(arrayTaxo)
    const [isCheckedTaxo, setCheckedTaxo] = React.useState([])

    // React.useEffect(() => {

    //     if( !isCheckedTaxo) {
    //         setCheckedTaxo([])
    //     }

    // },[isCheckedTaxo])

    const handleToggle = useCallback(


       async ({ value, i }) => {
            const currentIndex = isCheckedTaxo.indexOf(value)
            const newChecked = [...isCheckedTaxo];
            if (currentIndex === -1) {
                newChecked.push(value);
            } else {
                newChecked.splice(currentIndex, 1);
            }
            setCheckedTaxo(newChecked)
            cb_runCheckedTaxo({ cb_NewChecked: newChecked });

        }, [cb_runCheckedTaxo, isCheckedTaxo])

    return (
         arrayTaxo.map((value, i) => {

            return <FCTaxonomyListOne
                value={value}
                i={i}
                key={value._id}
                togglefunction={({ value, i }) => {
                    handleToggle({ value, i })
                }
                }
                sumofchecked={isCheckedTaxo}
            />
        })
    )


}