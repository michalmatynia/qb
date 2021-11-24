import axios from 'axios';
import {
    REGISTER_USER,
    ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,
    REMOVE_CART_ITEM_USER,
    ON_SUCCESS_BUY_USER,
    UPDATE_DATA_USER,
    CLEAR_UPDATE_USER_DATA,
    SET_COOKIE_USER,
} from '../actions/types';

import {  getOutputType } from '../../redux/actions/generic/generic_types';

import { USER_SERVER } from '../../components/utils/misc';
import { PRODUCT_SERVER } from '../../components/utils/misc';

export async function act_logoutUser({ dataToSubmit = null, actionType = null }) {
    
    const outputType = await getOutputType({ model: dataToSubmit.model, actionType })


    const request = await axios.post(`${USER_SERVER}/logout`, dataToSubmit)

    return {
        type: outputType,
        payload: request.data
    }
}
export async function loginUser({dataToSubmit = null, actionType = null }) {
    const outputType = await getOutputType({ model: dataToSubmit.model, actionType })

    const request = await axios.post(`${USER_SERVER}/login`, dataToSubmit)

    return {
        type: outputType,
        payload: request.data
    }

}
// export function auth() {
//     const request = axios.get(`${USER_SERVER}/auth`)
//         .then(response => response.data);

//     return {
//         type: AUTH_USER,
//         payload: request.data
//     }
// }
export async function authasync({dataToSubmit = null, actionType = null }) {

    const outputType = await getOutputType({ model: dataToSubmit.model, actionType })

    const request = await axios.get(`${USER_SERVER}/auth`)

    return {
        type: outputType,
        payload: request.data
    }
}
// ====== TO DO BELOW

export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}


// GUEST USER ACTIONS
// Nie dziala na Heroku
export function setCookie() {

    const request = axios.get('https://ip-api.com/json/')

        .then((response) => {
                        return response.data

        })
        .catch((error) => {
            console.log(error)
        });
    return {
        type: SET_COOKIE_USER,
        payload: request
    }

}


// ==============OLD Functions
export function addToCart(_id) {

    const request = axios.post(`${USER_SERVER}/addToCart?productId=${_id}`)
        .then(response => response.data)
    return {
        type: ADD_TO_CART_USER,
        payload: request

    }
}

export function getCartItems(cartItems, userCart) {

    const request = axios.get(`/${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`)
        .then(response => {
            userCart.forEach(item => {
                response.data.forEach((k, i) => {
                    if (item.id === k._id) {
                        response.data[i].quantity = item.quantity;
                    }
                })
            })

            return response.data


        })

    return {
        type: GET_CART_ITEMS_USER,
        payload: request
    }
}

export function removeCartItem(id) {

    const request = axios.get(`${USER_SERVER}/removeFromCart?_id=${id}`)
        .then(response => {


            response.data.cart.forEach(item => {



                response.data.cartDetail.forEach((k, i) => {

                    if (item.id === k._id) {
                        response.data.cartDetail[i].quantity = item.quantity;
                    }
                })
            })
            return response.data;
        })

    return {
        type: REMOVE_CART_ITEM_USER,
        payload: request
    }

}

export function onSuccessBuy(data) {

    const request = axios.post(`${USER_SERVER}/successBuy`, data)
        .then(response => response.data);

    return {
        type: ON_SUCCESS_BUY_USER,
        payload: request
    }
}

export function updateUserData(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/update_profile`, dataToSubmit)
        .then(response => {
            return response.data
        });

    return {
        type: UPDATE_DATA_USER,
        payload: request
    }
}

export function clearUpdateUser() {
    return {
        type: CLEAR_UPDATE_USER_DATA,
        payload: ''
    }
}
