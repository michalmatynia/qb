import { combineReducers } from 'redux';
import user from './system/user_reducer';

// API
// Nations
import nation from './APIdata/dataset_reducer';

// SYSTEM
import language from './system/language_reducer';
import messages from './system/messages_reducer';
import mysite from './system/mysite_reducer';
import taxonomy from './system/taxonomy_reducer';
import theme from './system/theme_reducer';
import login from './system/login_reducer';
import blockstyle from './system/blockstyle_reducer';

import mystore from './system/mystore_reducer';
import cart from './system/cart_reducer';

import visit from './system/visit_reducer';
import trnsdetailproduct from './system/trnsdetproduct_reducer';

// import transengine from '../reducers/system/transengine_reducer';
// import currengine from '../reducers/system/currengine_reducer';

// CMS
import contact from './CMS/contact_reducer';
import newsletter from './CMS/newsletter_reducer';
import slide from './CMS/slide_reducer';
import product from './CMS/product_reducer';
import brick from './CMS/brick_reducer';
import productgroup from './CMS/productgroup_reducer';
import view from './CMS/view_reducer';
import page from './CMS/page_reducer';

const rootReducer = combineReducers({
    user,
    nation,
    slide,
    product,
    productgroup,
    brick,
    page,
    view,
    language,
    messages,
    mysite,
    taxonomy,
    theme,
    contact,
    newsletter,
    mystore,
    cart,
    login,
    blockstyle,
    visit,
    trnsdetailproduct
    // transengine,
    // currengine,
    
});

export default rootReducer;