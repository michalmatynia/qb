import {
    SAME_STATE,
    LIST_BRICK,
    SUBLIST_BRICK,
    DETAIL_BRICK,
    LIST_VIEW,
    DETAIL_VIEW,
    LIST_PAGE,
    DETAIL_PAGE,
    CURRENT_LIST_PAGE,
    CURRENT_DETAIL_PAGE,
    LIST_PRODUCTGROUP,
    DETAIL_PRODUCTGROUP,
    DETAIL_LANGUAGE,
    LIST_LANGUAGE,
    MENU_LANGUAGE,
    DETAIL_MENU,
    LIST_MENU,
    DETAIL_MESSAGE,
    LIST_MESSAGES,
    CURRENT_MYSITE,
    DETAIL_MYSITE,
    LIST_MYSITE,
    DETAIL_TAXONOMY,
    LIST_TAXONOMY,
    DETAIL_NATION,
    LIST_NATION,
    DETAIL_SLIDE,
    LIST_SLIDE,
    DETAIL_PRODUCT,
    LIST_PRODUCT,
    LOCALE_USER,
    AUTH_USER,
    DETAIL_THEME,
    LIST_THEME,
    DETAIL_USER,
    CART_USER,
    CURRENCY_USER,
    LIST_USER,
    GEO_USER,
    DETAIL_CART,
    LIST_CART,
    DETAIL_NEWSLETTER,
    LIST_NEWSLETTER,
    DETAIL_MYSTORE,
    CURRENT_MYSTORE,
    LIST_MYSTORE,
    DETAIL_CONTACT,
    LIST_CONTACT,
    DETAIL_LOGIN,
    LIST_LOGIN,
    DETAIL_BLOCKSTYLE,
    LIST_BLOCKSTYLE,
    DETAIL_VISIT,
    LIST_VISIT,
    DETAIL_TRNSDETAILPRODUCT,
    LIST_TRNSDETAILPRODUCT
} from '../types';
// getOutput Type dotyczy bez mystateowych requestow
// To nowy typ Funkcji, starej nie trzeba uzupelniac
export async function getOutputType({ model = null, actionType = null }) {

    let getOutputType

    switch (true) {
        case actionType === 'samestate':
            getOutputType = SAME_STATE
            break
        case model === 'nation' && actionType === 'detail':
            getOutputType = DETAIL_NATION
            break
        case model === 'nation' && actionType === 'list':
            getOutputType = LIST_NATION
            break
        case model === 'language' && actionType === 'detail':
            getOutputType = DETAIL_LANGUAGE
            break
        case model === 'language' && actionType === 'list':
            getOutputType = LIST_LANGUAGE
            break
        case model === 'language' && actionType === 'menu':
            getOutputType = MENU_LANGUAGE
            break
        case model === 'message' && actionType === 'detail':
            getOutputType = DETAIL_MESSAGE
            break
        case model === 'message' && actionType === 'list':
            getOutputType = LIST_MESSAGES
            break
        case model === 'brick' && actionType === 'detail':
            getOutputType = DETAIL_BRICK
            break
        case model === 'brick' && actionType === 'list':
            getOutputType = LIST_BRICK
            break
        case model === 'brick' && actionType === 'sublist':
            getOutputType = SUBLIST_BRICK
            break
        case model === 'view' && actionType === 'detail':
            getOutputType = DETAIL_VIEW
            break
        case model === 'view' && actionType === 'list':
            getOutputType = LIST_VIEW
            break
        case model === 'productgroup' && actionType === 'detail':
            getOutputType = DETAIL_PRODUCTGROUP
            break
        case model === 'productgroup' && actionType === 'list':
            getOutputType = LIST_PRODUCTGROUP
            break
        case model === 'page' && actionType === 'detail':
            getOutputType = DETAIL_PAGE
            break
        case model === 'page' && actionType === 'list':
            getOutputType = LIST_PAGE
            break
        case model === 'page' && actionType === 'current_list':
            getOutputType = CURRENT_LIST_PAGE
            break
        case model === 'page' && actionType === 'current_detail':
            getOutputType = CURRENT_DETAIL_PAGE
            break
        case model === 'menu' && actionType === 'detail':
            getOutputType = DETAIL_MENU
            break
        case model === 'menu' && actionType === 'list':
            getOutputType = LIST_MENU
            break
        case model === 'mysite' && actionType === 'current':
            getOutputType = CURRENT_MYSITE
            break
        case model === 'mysite' && actionType === 'detail':
            getOutputType = DETAIL_MYSITE
            break
        case model === 'mysite' && actionType === 'list':
            getOutputType = LIST_MYSITE
            break
        case model === 'taxonomy' && actionType === 'detail':
            getOutputType = DETAIL_TAXONOMY
            break
        case model === 'taxonomy' && actionType === 'list':
            getOutputType = LIST_TAXONOMY
            break
        case model === 'product' && actionType === 'detail':
            getOutputType = DETAIL_PRODUCT
            break
        case model === 'product' && actionType === 'list':
            getOutputType = LIST_PRODUCT
            break
        case model === 'slide' && actionType === 'detail':
            getOutputType = DETAIL_SLIDE
            break
        case model === 'slide' && actionType === 'list':
            getOutputType = LIST_SLIDE
            break
        case model === 'language' && actionType === 'locale':
            getOutputType = LOCALE_USER
            break
        case model === 'theme' && actionType === 'detail':
            getOutputType = DETAIL_THEME
            break
        case model === 'theme' && actionType === 'list':
            getOutputType = LIST_THEME
            break
        case model === 'user' && actionType === 'auth':
            getOutputType = AUTH_USER
            break
        case model === 'user' && actionType === 'list':
            getOutputType = LIST_USER
            break
        case model === 'user' && actionType === 'currency':
            getOutputType = CURRENCY_USER
            break
        case model === 'user' && actionType === 'detail':
            getOutputType = DETAIL_USER
            break
        case model === 'user' && actionType === 'cart':
            getOutputType = CART_USER
            break
        case model === 'user' && actionType === 'geodata':
            getOutputType = GEO_USER
            break
        case model === 'cart' && actionType === 'list':
            getOutputType = LIST_CART
            break
        case model === 'cart' && actionType === 'detail':
            getOutputType = DETAIL_CART
            break
        case model === 'mystore' && actionType === 'list':
            getOutputType = LIST_MYSTORE
            break
        case model === 'mystore' && actionType === 'detail':
            getOutputType = DETAIL_MYSTORE
            break
        case model === 'mystore' && actionType === 'current':
            getOutputType = CURRENT_MYSTORE
            break
        case model === 'contact' && actionType === 'list':
            getOutputType = LIST_CONTACT
            break
        case model === 'contact' && actionType === 'detail':
            getOutputType = DETAIL_CONTACT
            break
        case model === 'newsletter' && actionType === 'list':
            getOutputType = LIST_NEWSLETTER
            break
        case model === 'newsletter' && actionType === 'detail':
            getOutputType = DETAIL_NEWSLETTER
            break
        case model === 'login' && actionType === 'list':
            getOutputType = LIST_LOGIN
            break
        case model === 'login' && actionType === 'detail':
            getOutputType = DETAIL_LOGIN
            break
        case model === 'blockstyle' && actionType === 'list':
            getOutputType = LIST_BLOCKSTYLE
            break
        case model === 'blockstyle' && actionType === 'detail':
            getOutputType = DETAIL_BLOCKSTYLE
            break
        case model === 'visit' && actionType === 'list':
            getOutputType = LIST_VISIT
            break
        case model === 'visit' && actionType === 'detail':
            getOutputType = DETAIL_VISIT
            break
        case model === 'trnsdetailproduct' && actionType === 'list':
            getOutputType = LIST_TRNSDETAILPRODUCT
            break
        case model === 'trnsdetailproduct' && actionType === 'detail':
            getOutputType = DETAIL_TRNSDETAILPRODUCT
            break
        default: getOutputType = null;

    }

    return getOutputType
}
