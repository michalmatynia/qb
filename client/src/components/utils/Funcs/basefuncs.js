// ------------- async inside forEach
export async function asyncFor_ArrIndex(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
/* 
await asyncFor_ObjKeys(arrayLanguageList.data, async (each) => {

    if (each.referenceID.languages[0].iso639_1 !== dataToSubmit.language) {
        newArrayLanguageList.push([each.referenceID.languages[0].iso639_1, each.referenceID.alpha2Code])
    }
}) 
*/
export async function asyncFor_ObjKeys(obj, callback) {

    for (const key of Object.keys(obj)) {

        await callback(obj[key]);

    }

}

export async function asyncFor_ObjEntries(obj, callback) {

    for (const [key, value] of Object.entries(obj)) {

        await callback({ [key]: value });

    }

}

// Reduces Object on the basis of key
// Usually I do it with destructuring     const { _id, _v, ...restcurrent } = insert
/*
obj = {0: 'cherry', 1: 'pear'}
let result = ob_keyfilter(obj, 1) 
result = {0: 'cherry'}
*/
export async function ob_keyfilter(obj, predicate) {
    let result = {};

    for (let key in obj) {

        if (obj.hasOwnProperty(key) && predicate !== key) {

            Object.assign(result, { [key]: obj[key] })
        }
    }
    return result;
};
// Leaves the allowed keys in the object
// const allowed = ['item1', 'item3'];
export async function ob_keyunfilter(raw, allowed) {

    let filtered = Object.keys(raw)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: raw[key]
            };
        }, {});

    return filtered;
};

// Reduces Object on the basis of value
/*
obj = {0: 'cherry', 1: 'pear'}
let result = ob_keyfilter(obj, 'cherry') 
result = {1: 'pear'}
*/
export async function ob_valuefilter(obj, predicate) {

    // This function might be useful, but no use case yet

    let result = {};

    for (let key in obj) {

        if (obj.hasOwnProperty(key) && predicate !== obj[key]) {
            Object.assign(result, { [key]: obj[key] })
        }
    }
    return result;
};
export async function ob_valuefilter_toArray(obj, predicate) {

    let result = [];

    for (let key in obj) {

        if (obj.hasOwnProperty(key) && predicate !== obj[key]) {
            result.push(obj[key])
        }
    }
    return result;
};
/*
 const fruits = {
    apple: {
      qty: 300,
      color: "green",
      name: "apple",
      price: 2
    },
    banana: {
      qty: 130,
      color: "yellow",
      name: "banana",
      price: 3
    },
    orange: {
      qty: 120,
      color: "orange",
      name: "orange",
      price: 1.5
    },
    melon: {
      qty: 70,
      color: "yellow",
      name: "melon",
      price: 5
    }
  };
   */


// filter items with price less than or equal 2:
// const myFruits = filter(fruits, (_, fruit) => fruit.price <= 2);
/*
{ apple: { qty: 300, color: 'green', name: 'apple', price: 2 },
  orange: { qty: 120, color: 'orange', name: 'orange', price: 1.5 } }
*/
export async function myObjectFilter(obj, fun) {

    return Object.entries(obj).reduce(
        (prev, [key, value]) => ({
            ...prev,
            ...(fun(key, value) ? { [key]: value } : {})
        }),
        {}
    );
}
//convert them into an array
// const myFruits = reduce(fruits, (prev, _, fruit) => [...prev, fruit], []);
/*
[ { qty: 300, color: 'green', name: 'apple', price: 2 },
  { qty: 130, color: 'yellow', name: 'banana', price: 3 },
  { qty: 120, color: 'orange', name: 'orange', price: 1.5 },
  { qty: 70, color: 'yellow', name: 'melon', price: 5 } ]
*/
export async function myObjectReducer(obj, fun, initialValue) {


    return Object.entries(obj).reduce(
        (prev, [key, value]) => fun(prev, key, value),
        initialValue
    );
}
// map fruits into their colors
// const myFruits = map(fruits, (_, fruit) => fruit.color);

/*  { apple: 'green',
   banana: 'yellow',
   orange: 'orange',
   melon: 'yellow' }
  */

export async function myObjectMap(obj, fun) {

    return Object.entries(obj).reduce(
        (prev, [key, value]) => ({
            ...prev,
            [key]: fun(key, value)
        }),
        {}
    );
}
// Provide array like ['_id', '__v'] to filter
export async function myObjectFilter_onArray(obj, arr) {

    const filteredObject = Object.keys(obj)
        .filter(key => arr.includes(key) === false)
        .reduce((insert, key) => {
            insert[key] = obj[key];

            return insert;
        }, {});

    return filteredObject


}

// For checking if a string is empty, null or undefined I use:
// STRING FUNCTIONS
export async function isEmpty(str) {
    return (!str || 0 === str.length);
}
// For checking if a string is blank, null or undefined I use:

export async function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

// FUNCTIONS FOR RESOLVING AND SETTING OBJECT PATHS
// 1. RESOLVE OBJECT PATH
export async function resolvePath_async({ object = null, path = null, defaultValue = null }) {
    return path.split('.')
        .reduce((o, p) => o ? o[p] : defaultValue, object)
}
export function resolvePath({ object = null, path = null, defaultValue = null }) {
    return path.split('.')
        .reduce((o, p) => o ? o[p] : defaultValue, object)
}
//EXAMPLE
// resolvePath(window,'document.body') => <body>
// resolvePath(window,'document.body.xyz') => undefined
// resolvePath(window,'document.body.xyz', null) => null
// resolvePath(window,'document.body.xyz', 1) => 1

// 2. SET PATH
export async function setPath_async({ object = null, path = null, value = null }) {
    return path.split('.')
        .reduce((o, p, i) => o[p] = path.split('.').length === ++i ? value : o[p] || {}, object)
}
export function setPath({ object = null, path = null, value = null }) {
    return path.split('.')
        .reduce((o, p, i) => o[p] = path.split('.').length === ++i ? value : o[p] || {}, object)
}
// EXAMPLE
// let myVar = {}
// setPath(myVar, 'a.b.c', 42) => 42
// console.log(myVar) => {a: {b: {c: 42}}}

// const myVar = {a:{b:[{c:1}]}}
// resolvePath(myVar,'a.b[0].c') => 1
// resolvePath(myVar,'a["b"][\'0\'].c') => 1

export function stringToBoolean(string) {
    switch (string.toLowerCase().trim()) {
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(string);
    }
}

// EXAMPLES
// find all paths to property name "x" that has a string
// const path = findPropPaths(formdata[key],(key, path, obj) => key === "x" && typeof obj[key] === "string");

export function findPropPaths(obj, predicate) {  // The function 
    const discoveredObjects = []; // For checking for cyclic object
    const path = [];    // The current path being searched
    const results = []; // The array of paths that satify the predicate === true
    if (!obj && (typeof obj !== "object" || Array.isArray(obj))) {
        throw new TypeError("First argument of finPropPath is not the correct type Object");
    }
    if (typeof predicate !== "function") {
        throw new TypeError("Predicate is not a function");
    }
    (function find(obj) {
        for (const key of Object.keys(obj)) {  // use only enumrable own properties.
            if (predicate(key, path, obj) === true) {     // Found a path
                path.push(key);                // push the key
                results.push(path.join("."));  // Add the found path to results
                path.pop();                    // remove the key.
            }
            const o = obj[key];                 // The next object to be searched
            if (o && typeof o === "object" && !Array.isArray(o)) {   // check for null then type object
                if (!discoveredObjects.find(obj => obj === o)) {  // check for cyclic link
                    path.push(key);
                    discoveredObjects.push(o);
                    find(o);
                    path.pop();
                }
            }
        }
    }(obj));
    return results;
}