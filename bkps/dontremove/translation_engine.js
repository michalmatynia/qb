// MYMEMORY
// {
//     "_id" : ObjectId("5fe3bf3a7505898999183458"),
//     "name" : "MyMemory",
//     "position" : 1,
//     "visible" : true,
//     "type" : "translator",
//     "req" : {
//         "method" : "GET",
//         "baseURL" : "https://api.mymemory.translated.net/get"
//     },
//     "settings" : {
//         "dailylimit" : 20,
//         "lastcalled" : ISODate("2021-01-01T16:56:41.521Z"),
//         "limitexpiration" : ISODate("2021-01-02T14:06:43.207Z"),
//         "callcounter" : 7
//     },
//     "updatedAt" : ISODate("2021-01-01T16:56:41.714Z")
// }

// GOOGLE TRANSLATOR

// {
//     "_id" : ObjectId("5fef5b8d75058989998e9944"),
//     "name" : "GoogleTranslator",
//     "position" : 2,
//     "visible" : true,
//     "type" : "translator",
//     "req" : {
//         "method" : "POST",
//         "baseURL" : "https://translation.googleapis.com/language/translate/v2"
//     },
//     "settings" : {
//         "dailylimit" : 20,
//         "lastcalled" : null,
//         "limitexpiration" : null,
//         "callcounter" : null
//     },
//     "updatedAt" : ISODate("2021-01-01T16:56:41.714Z")
// }

// ================== CURRENCY ENGINE 1
// {
//     "_id" : ObjectId("5ff1bb5c7505898999dffc5c"),
//     "name" : "Currency Exchange P",
//     "position" : 3,
//     "visible" : true,
//     "type" : "currencyconverter",
//     "req" : {
//         "method" : "POST",
//         "baseURL" : "https://currency-exchange.p.rapidapi.com/exchange",
//         "headers" : {
//             "Content-Type" : "application/javascript",
//             "x-rapidapi-key" : "b26f030271msh58eddf6a7de004cp189ac1jsn7ba5881a1e3a",
//             "x-rapidapi-host" : "currency-exchange.p.rapidapi.com"
//         },
//         "data" : {
//             "source" : "",
//             "target" : "",
//             "q" : ""
//         }
//     },
//     "settings" : {
//         "dailylimit" : 20,
//         "lastcalled" : null,
//         "limitexpiration" : null,
//         "callcounter" : null
//     }
// }