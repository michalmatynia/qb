const https = require('https')
const http = require('http')

exports.myObjectFilter_onArray = async (obj, arr) => {

    const filteredObject = Object.keys(obj)
        .filter(key => arr.includes(key) === false)
        .reduce((insert, key) => {
            insert[key] = obj[key];

            return insert;
        }, {});

    return filteredObject


}

exports.asyncFor_ArrIndex = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

exports.asyncFor_ObjKeys = async (obj, callback) => {

    for (const key of Object.keys(obj)) {

        await callback(obj[key]);

    }

}

exports.asyncFor_ObjEntries = async (obj, callback) => {

    for (const [key, value] of Object.entries(obj)) {

        await callback({ [key]: value });

    }

}


exports.ob_keyfilter = async (obj, predicate) => {
    let result = {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key) && predicate !== key) {

            Object.assign(result, { [key]: obj[key] })
        }
    }
    return result;
};

exports.ob_valuefilter = async (obj, predicate) => {

    // This function might be useful, but no use case yet

    let result = {};

    for (let key in obj) {

        if (obj.hasOwnProperty(key) && predicate !== obj[key]) {
            Object.assign(result, { [key]: obj[key] })
        }
    }
    return result;
};

exports.myObjectFilter = async (obj, fun) => {

    return Object.entries(obj).reduce(
        (prev, [key, value]) => ({
            ...prev,
            ...(fun(key, value) ? { [key]: value } : {})
        }),
        {}
    );
}

exports.myObjectFilterByKey = async (obj, predicate) => {

    return Object.entries(obj).reduce(
        (prev, [key, value]) => ({
            ...prev,
            ...(predicate !== key ? { [key]: value } : {})
        }),
        {}
    );
}

exports.myObjectReducer = async (obj, fun, initialValue) => {

    // const myFruits = reduce(fruits, (prev, _, fruit) => [...prev, fruit], []);
    /*
    [ { qty: 300, color: 'green', name: 'apple', price: 2 },
      { qty: 130, color: 'yellow', name: 'banana', price: 3 },
      { qty: 120, color: 'orange', name: 'orange', price: 1.5 },
      { qty: 70, color: 'yellow', name: 'melon', price: 5 } ]
    */

    return Object.entries(obj).reduce(
        (prev, [key, value]) => fun(prev, key, value),
        initialValue
    );
}

exports.myObjectMap = async (obj, fun) => {

    // const myFruits = map(fruits, (_, fruit) => fruit.color);

    /*  { apple: 'green',
       banana: 'yellow',
       orange: 'orange',
       melon: 'yellow' }
      */

    return Object.entries(obj).reduce(
        (prev, [key, value]) => ({
            ...prev,
            [key]: fun(key, value)
        }),
        {}
    );
}


