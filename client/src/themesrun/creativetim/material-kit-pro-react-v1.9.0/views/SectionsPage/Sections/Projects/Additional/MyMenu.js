import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
// core 
import GridContainer from "../../../../../components/Grid/GridContainer.js";
import GridItem from "../../../../../components/Grid/GridItem.js";
// import pillsStyle from "../../material-kit-pro-react/views/componentsSections/pillsStyle.js";
import Button from "../../../../../components/CustomButtons/Button.js";
import FuncRevealWrapper from '../../../../../../../../hoc/Funcs/Reveal/FuncRevealWrapper'
import {
  reveal_array_title,
  reveal_array_btn_launch
} from '../../../../../../../../components/utils/Form/Fixed_categories/reveal_arrays'
import buttonMenuStyle from "../../../../../../../michalm/assets/jss/views/Button/buttonMenuStyle.js";

// import pillsStyle from "../../../../../assets/jss/material-kit-pro-react/views/componentsSections/pillsStyle.js";
const useStyles = makeStyles(buttonMenuStyle);

export default function MyMenu({ item, isCategoryArray, cbActionOnClick, isFilter = null }) {

    const classes = useStyles();
    const [myvalue, setMyValue] = React.useState(isFilter);
    const [myButtons, setMyButtons] = React.useState();

    React.useEffect(() => {
              function loopCategories({ loop_array, cbActionOnClick }) {

            // isCategoryArray.splice(0, 0, {name: item.btn_launch});

            return loop_array.map((value, index) => {

                return <Button
                    simple={myvalue !== 'all' && myvalue._id === value._id ? false : true}
                    color='primary'
                    key={index}
                    onClick={() => {
                        setMyValue(value)
                        cbActionOnClick({ value })
                    }
                    }

                ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_title}>{value.name}</FuncRevealWrapper>
                </Button>
            })

        }

        if (isCategoryArray.length > 0) {

            setMyButtons(loopCategories({loop_array: isCategoryArray, cbActionOnClick}))
        }
    },[cbActionOnClick, isCategoryArray, item, myvalue])

    return (
        <div className={classes.section}
            style={{
                marginTop: "0",
                paddingTop: "0",
                paddingBottom: "0",
                marginBottom: "0"
            }}
        >
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} lg={12} >
                    <Button
                        simple={myvalue === 'all' ? false : true} // 
                        color='primary'
                        key={'all'}
                        onClick={() => {
                            setMyValue('all')
                            cbActionOnClick({ value: 'all' })
                        }
                        }

                    ><FuncRevealWrapper key={item._id} item={item} revealarray={reveal_array_btn_launch}>{item.btn_launch}</FuncRevealWrapper>
                    </Button>
                    {myButtons}
                </GridItem>
            </GridContainer>
        </div >
    );
}
