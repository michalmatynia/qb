import React, { useCallback } from "react";
// nodejs library that concatenates classes

// @material-ui icons
// import Favorite from "@material-ui/icons/Favorite";
// import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FCTaxonomyListOne from './FCTaxonomyListOne'
// core components


export default function FCTaxonomy({ arrayTaxo, cb_runCheckedTaxo, checkedTaxo }) {


    const [isArrayTaxo, setArrayTaxo] = React.useState(arrayTaxo)
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {

        if(arrayTaxo && isLoading) {
            setArrayTaxo(arrayTaxo)
            setIsLoading(false)
        }
    
    },[arrayTaxo, isLoading])
  const handleToggle = useCallback(
   async ({ value, i }) => {
      const currentIndex = checkedTaxo.indexOf(value)
      const newChecked = [...checkedTaxo];
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      cb_runCheckedTaxo({cb_NewChecked: newChecked});
      setIsLoading(false)

    }, [cb_runCheckedTaxo, checkedTaxo])

    return (
        !isLoading && isArrayTaxo ? isArrayTaxo.map((value, i) => {
            return <FCTaxonomyListOne
                value={value}
                i={i}
                key={value._id}
                togglefunction={({value, i}) => {
                    setIsLoading(true)
                    handleToggle({ value, i })}
                }
                sumofchecked={checkedTaxo}
            />
        }) : null
    )


}