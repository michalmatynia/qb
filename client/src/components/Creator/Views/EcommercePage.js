import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import { useSelector, useDispatch } from 'react-redux'

import {
  // ShowMessages,
  //  messageLoading 
} from '../../../components/Store/StoreFuncs/storemsg_funcs'

import ProductGroups from "./ProductGroups.js";
import NavigationWithIcons from "./NavigationWithIcons";
import SubchoiceMenu from "./SubchoiceMenu";
import ChooseProducts from "./ChooseProducts";

import {
  plg_findMany,
  plg_clearProps
} from '../../../components/utils/Plugs/cms_plugs';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui icons

import styles from "../../../templates/creativetim/material-kit-pro-react-v1.9.0/assets/jss/material-kit-pro-react/views/ecommerceStyle.js";
const useStyles = makeStyles(styles);

export default function EcommercePage({ list }) {


  /*   const [showAddToCart, setShowAddToCart] = React.useState(false); */
  let parallaximage = list.images.length > 0 ? list.images[0].secure_url : null
  const classes = useStyles();
  const dispatch = useDispatch()
  let localeuser = useSelector(state => state.user.localeUser)
  let currencyuser = useSelector(state => state.user.currencyUser)
  // let cart_user = useSelector(state => state.user.cartUser)
  let current_mysite = useSelector(state => state.mysite.CurrentMysite)
  let product_list = useSelector(state => state.product.list)
  let productgroup_list = useSelector(state => state.productgroup.list)

  // const [
  //   isLoading, 
  //   setIsLoading
  // ] = React.useState(true);
  const [isSumOfQuantity, setIsSumOfQuantity] = React.useState(0);
  const [isLimitOfQuantity, setIsLimitOfQuantity] = React.useState(0);
  const [isLimitOfQuantityName, setIsLimitOfQuantityName] = React.useState(0);



  // const [isProductArray, setIsProductArray] = React.useState([]);
  const [viewingList, setViewingList] = React.useState([]);


  const [isCreatorLimiter, setIsCreatorLimiter] = React.useState(null);
  const [isCategoryArray, setCategoryArray] = React.useState([]);
  const [isCreatorCart, setIsCreatorCart] = React.useState([]);
  const [isTaxonomyLimit, setIsTaxonomyLimit] = React.useState(null);
  const [isPriceRound, setIsPriceRound] = React.useState(null);
  React.useEffect(() => {

    if (product_list && isCreatorLimiter) {

      let filteredProducts = product_list.filter((prod) => {
        if (prod.category.length > 0 && prod.category[0]._id === isCreatorLimiter._id) {
          return prod

        } else {
          return null
        }
      })
      let priceArray = filteredProducts.map((item) => item.price)

      const price_round = Math.max(...priceArray)

      setIsPriceRound(price_round)
    }

  }, [isCreatorLimiter, product_list])

  React.useEffect(() => {

    async function findFirstTaxonomy() {

      // extract taxonomies from product array
      let category_taxo_array = []
      for (let eachproduct of product_list) {

        if (eachproduct.category.length > 0) {

          for (let catvalue of eachproduct.category) {

            let dupe = category_taxo_array.find(eachcato => eachcato._id === catvalue._id)

            if (!dupe) {
              category_taxo_array.push(catvalue)
            }

          }
        }
      }
      category_taxo_array.sort(function (a, b) {
        return a.position - b.position;
      });
      setCategoryArray(category_taxo_array)

      setIsCreatorLimiter(category_taxo_array[0])

    }

    if (product_list && product_list.length > 0) {
      findFirstTaxonomy()
    }

  }, [product_list])


  React.useEffect(() => {
    async function limitProductsByCategory() {

      // let newProductArray = product_list.reduce((accum, currentValue, CurrentIndex) => {
      //   // console.log(currentValue);

      //   return currentValue.category.includes(isCreatorLimiter) ? [...accum, currentValue] : accum

      // }, [])
      // =================


      let newProductArray = []
      for (let eachproduct of product_list) {

        if (eachproduct.category.length > 0) {

          for (let catvalue of eachproduct.category) {

            if (catvalue.lgbinder === isCreatorLimiter.lgbinder) {
              newProductArray.push(eachproduct)
              break
            }
          }

        }
      }

      let extractCartIds = isCreatorCart.map((each) => each.referenceID._id)

      let newViewingList = newProductArray.reduce((accum, currentValue, CurrentIndex) => {

        if (!extractCartIds.includes(currentValue._id)) {
          accum = [...accum, currentValue]
        }

        return accum

      }, [])

      setViewingList(newViewingList)
      //  console.log(newProductArray);
    }

    if (isCreatorLimiter && isCreatorCart && product_list.length > 0) {

      limitProductsByCategory()
    }
  }, [isCreatorCart, isCreatorLimiter, product_list])

  React.useEffect(() => {

    async function loadProducts() {

      let inQuery = {}

      if (current_mysite.default_language.referenceID.alpha2Code !== localeuser.referenceID.alpha2Code
      ) {


        // Object.assign(inQuery, {
        //   country: { "$eq": current_mysite.default_language.referenceID.alpha2Code },
        //   language: { "$eq": current_mysite.default_language.referenceID.languages[0].iso639_1 },
        //   visible: true,
        // });

        // let root_content = await plg_findMany({ model: 'taxonomy', dispatch, actionType: 'samestate', inQuery })

        // console.log(root_content);

        // let priceArray = root_products.payload.map(a => a.price)
        // const price_min = Math.min(...priceArray)
        // const price_max = Math.max(...priceArray)

        // let converted_price_min = price_min / currencyuser.deflgrates[current_mysite.default_language.referenceID.currencies[0].code] * Object.entries(currencyuser.rates)[0][1]
        // let converted_price_max = price_max / currencyuser.deflgrates[current_mysite.default_language.referenceID.currencies[0].code] * Object.entries(currencyuser.rates)[0][1]
        // setPriceRange([Math.floor(converted_price_min), Math.round(converted_price_max)])

        // let result = await actionFuncs_recalculatePrice_v2({ root_products, dispatch, current_mysite, currencyuser, localeuser })

        // ======= SET TAXONOMY ========
        // let category_taxo_array = []
        // for (let eachproduct of result.recalculated_list) {

        //   if (eachproduct.category.length > 0) {

        //     for (let catvalue of eachproduct.category) {

        //       let dupe = category_taxo_array.find(eachcato => eachcato._id === catvalue._id)

        //       if (!dupe) {
        //         category_taxo_array.push(catvalue)
        //       }

        //     }
        //   }
        // }

        // let type_taxo_array = []
        // for (let eachproduct of result.recalculated_list) {

        //   if (eachproduct.type.length > 0) {

        //     for (let typevalue of eachproduct.type) {

        //       let dupe = type_taxo_array.find(eachcato => eachcato._id === typevalue._id)

        //       if (!dupe) {
        //         type_taxo_array.push(typevalue)
        //       }
        //     }
        //   }
        // }

        // setCategoryTaxo(category_taxo_array)
        // setTypeTaxo(type_taxo_array)

        // // ==========
        // setViewingList(result.recalculated_list)
        // await dispatch(act_injectProp({ dataToSubmit: result.recalculated_list, model: 'product', actionType: 'list' }))


      } else {

        // let incart_product_ids = []

        // if (cart_user && Object.values(cart_user).length > 0) {
        //   incart_product_ids = cart_user.map((item) => item.referenceID._id)
        // }

        // console.log(incart_product_ids);

        Object.assign(inQuery, {
          country: { "$eq": localeuser.referenceID.alpha2Code },
          language: { "$eq": localeuser.referenceID.languages[0].iso639_1 },
          // _id: { "$nin": incart_product_ids },
          visible: true,
        });

        await plg_findMany({ model: 'product', dispatch, actionType: 'list', inQuery, populate: [{ path: 'category' }, { path: 'type' }] })
        await plg_findMany({
          model: 'productgroup', dispatch, actionType: 'list', inQuery,
          populate: [{ path: 'category' }, {
            path: 'checked', populate: {
              path: 'referenceID',
              model: 'Taxonomy'
            }
          }]
        })

      }

    }

    // RUN FUNCTION
    if (localeuser.referenceID.currencies[0].code === Object.keys(currencyuser.rates)[0]
    ) {

      // setIsLoading(true)
      loadProducts()
      // setIsLoading(false)
    }
    return function cleanup() {
      plg_clearProps({ dispatch, model: 'product', actionType: 'list' })
      plg_clearProps({ dispatch, model: 'productgroup', actionType: 'list' })
    };

  }, [dispatch, currencyuser, localeuser, current_mysite])


  // React.useEffect(() => {
  //   window.scrollTo(0, 0);
  //   document.body.scrollTop = 0;
  // });
  async function onRemoveItem({ value }) {

    let newIsCreatorCart = isCreatorCart.filter((item) => item.referenceID._id !== value.referenceID._id)

    if (isCreatorLimiter._id === value.referenceID.category[0]._id) {
      setIsSumOfQuantity(prevState => prevState - value.quantity);

      setIsCreatorCart(newIsCreatorCart)
    }


    setIsCreatorCart(newIsCreatorCart)
  }
  async function addMeal() {

    //   setFcState(prevState => ({
    //     ...prevState,
    //     [cellkey]: {
    //         ...prevState[cellkey],
    //         validation: { ...prevState[cellkey].validation, message: validated.vtext[0] },
    //         value: event.target.value,
    //         valid: false
    //     }
    // }));

    let newTaxonomyLimit = [...isTaxonomyLimit]

    for (let [key, eachtaxo] of Object.entries(isTaxonomyLimit)) {
      if (eachtaxo.referenceID._id === isCreatorLimiter._id) {
        setIsLimitOfQuantity(eachtaxo.quantity + 1)

        newTaxonomyLimit[key].quantity = eachtaxo.quantity + 1

      }
    }
    setIsTaxonomyLimit(newTaxonomyLimit)

  }

  async function onChangeQuantity({ direction, itemkey }) {
    let newCreatorCart = [...isCreatorCart]

    let clicked_product_category_ids = isCreatorCart[itemkey].referenceID.category.map((item) => item._id)

    let specific_limitofquantity = 0

    for (let eachtaxo of isTaxonomyLimit) {

      if (clicked_product_category_ids.includes(eachtaxo.referenceID._id)) {
        specific_limitofquantity = eachtaxo.quantity
      }
    }

    let specific_sumofquantity = 0
    for (let eachproduct of isCreatorCart) {

      if (eachproduct.referenceID.category.length > 0) {

        for (let catvalue of eachproduct.referenceID.category) {

          /* to jest dyskusyjne, moze mobglobybyc .includes */

          if (clicked_product_category_ids[0] === catvalue._id) {
            specific_sumofquantity = specific_sumofquantity + eachproduct.quantity
          }

        }
      }
    }

    if (
      (
        isCreatorCart[itemkey].quantity < specific_limitofquantity || direction < 0)
      && specific_sumofquantity + direction <= specific_limitofquantity
    ) {


      if (direction < 0) {

        if (isCreatorCart[itemkey].quantity + direction === 0) {

          newCreatorCart[itemkey].quantity = 0
          setIsCreatorCart(newCreatorCart);

          if (isCreatorLimiter._id === isCreatorCart[itemkey].referenceID.category[0]._id) {
            setIsSumOfQuantity(prevState => (prevState + direction));

          }

        } else if (isCreatorCart[itemkey].quantity + direction > 0) {

          newCreatorCart[itemkey].quantity = isCreatorCart[itemkey].quantity + direction
          setIsCreatorCart(newCreatorCart);
          if (isCreatorLimiter._id === isCreatorCart[itemkey].referenceID.category[0]._id) {
            setIsSumOfQuantity(prevState => (prevState + direction));

          }

        }

      } else {

        newCreatorCart[itemkey].quantity = newCreatorCart[itemkey].quantity + direction
        setIsCreatorCart(newCreatorCart);

        if (specific_sumofquantity + direction >= 0) {

          if (isCreatorLimiter._id === isCreatorCart[itemkey].referenceID.category[0]._id) {
            setIsSumOfQuantity(prevState => (prevState + direction));

          }
        }
      }

    } else {
      console.log('Cant add more');
    }

  }

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = target => {
    /*     var targetScroll = document.getElementById(target);
        scrollTo(document.documentElement, targetScroll.offsetTop, 900); */

    scrollTo(document.documentElement, 800, 900);
  };
  const scrollTo = (element, to, duration) => {
    var start = element.scrollTop,
      // change = to - start,
      change = to - start + document.getElementById("main-panel").offsetTop,

      currentTime = 0,
      increment = 20;

    var animateScroll = function () {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };

  async function onAddTaxos({ eachone, target }) {


    let limit_of_quantity = 0
    for (let eachtaxo of eachone.checked) {

      if (eachtaxo.referenceID._id === isCreatorLimiter._id) {
        limit_of_quantity = eachtaxo.quantity
        setIsLimitOfQuantityName(eachtaxo.referenceID.name)

      }
    }
    setIsCreatorCart([])
    setIsTaxonomyLimit(eachone.checked)
    setIsLimitOfQuantity(limit_of_quantity)

    smoothScroll(target)
  }
  async function grabTransfer({ value = null }) {

    let sum_of_quantity = 0
    for (let eachproduct of isCreatorCart) {

      if (eachproduct.referenceID.category.length > 0) {

        for (let catvalue of eachproduct.referenceID.category) {


          if (catvalue._id === isCreatorLimiter._id) {
            sum_of_quantity = sum_of_quantity + eachproduct.quantity
          }

        }
      }
    }


    if (sum_of_quantity >= isLimitOfQuantity) {

      console.log('Cant add more');

    } else {

      setIsSumOfQuantity(sum_of_quantity + 1)

      filterProducts({ value })
    }

  }

  async function switchCategory({ item = null }) {
    if (item) {
      let sum_of_quantity = 0
      for (let eachproduct of isCreatorCart) {

        if (eachproduct.referenceID.category.length > 0) {

          for (let catvalue of eachproduct.referenceID.category) {

            if (catvalue._id === item._id) {
              sum_of_quantity = sum_of_quantity + eachproduct.quantity
            }

          }
        }
      }

      /* Set the limit of buffet */
      let limit_of_quantity = 0
      for (let eachtaxo of isTaxonomyLimit) {

        if (eachtaxo.referenceID._id === item._id) {
          limit_of_quantity = eachtaxo.quantity
          setIsLimitOfQuantityName(eachtaxo.referenceID.name)

        }
      }

      setIsSumOfQuantity(sum_of_quantity)
      setIsLimitOfQuantity(limit_of_quantity)

      setIsCreatorLimiter(item)

    }

  }
  async function filterProducts({ value = null }) {
    // isCreatorCart

    if (value) {

      /*  onToggle */
      let indexToChange = isCreatorCart.findIndex((item) => { return item.referenceID.lgbinder === value.lgbinder })
      if (indexToChange !== -1) {
        setIsCreatorCart(prevState => ({
          ...prevState,
          [indexToChange]: {
            model: 'product',
            position: isCreatorCart[indexToChange].position,
            referenceID: value,
            quantity: isCreatorCart[indexToChange].quantity + 1
          }
        }));

      } else {

        let newCreatorCart = [...isCreatorCart, {
          model: 'product',
          position: isCreatorCart.length + 1,
          referenceID: value,
          quantity: 1
        }]

        setIsCreatorCart(newCreatorCart)
      }
    }

  }
  return (
    <div
      style={{
        backgroundColor: 'lightgrey'
      }}
      id='main-panel'
    >
      {/* {showAddToCart ? <ShowMessages
        visible={showAddToCart}
        mystore={list}
      /> : null} */}
      <div
        style={{
          backgroundImage: "url(" + parallaximage + ")",
          backgroundPosition: "center", /* Center the image */
          backgroundRepeat: "no-repeat",/* Do not repeat the image */
          backgroundSize: "cover", /* Resize the background image to cover the entire container */
          /* Set up proportionate scaling */
          width: "100 %",
          height: "auto",
        }}
      >
        <NavigationWithIcons />

        {productgroup_list ? <ProductGroups
          mystore={list}
          productgroup={productgroup_list}
          isCategoryArray={isCategoryArray}
          addTaxos={({ eachone, target }) => { onAddTaxos({ eachone, target }) }}
        /> : null}</div>
      <div

        className={classNames(classes.main, classes.mainRaised)}>
        {isTaxonomyLimit ? <div id='creator'>
          <SubchoiceMenu
            isCategoryArray={isCategoryArray}
            cbActionOnClick={({ item }) => {
              switchCategory({ item })
            }}
          />
          <ChooseProducts
            isProductArray={viewingList}
            isCreatorCart={isCreatorCart}
            toggleItem={({ event, value }) => { grabTransfer({ value }) }}
            removeItem={({ event, value, list, itemkey, }) => { onRemoveItem({ value, itemkey }) }}
            changeQuantity={({ event, value, direction, itemkey }) => { onChangeQuantity({ direction, itemkey }) }}
            isSumOfQuantity={isSumOfQuantity}
            isLimitOfQuantity={isLimitOfQuantity}
            isLimitOfQuantityName={isLimitOfQuantityName}
            addMeal={() => addMeal()}
            isPriceRound={isPriceRound}
          /></div> : null}
      </div>
    </div>
  );
}
