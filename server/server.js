const express = require('express');

// File Upload
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

const SHA256 = require('crypto-js/sha256');
const moment = require('moment');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
const async = require('async');
const axios = require("axios")
const requestIp = require('request-ip');

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI9, { useUnifiedTopology: true, useNewUrlParser: true });

app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(express.json({ limit: '2000kb' })); //Used to parse JSON bodies
app.use(cookieParser());


// Production version
app.use(express.static('client/build'));

// Methods
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})
const { syncRates } = require('./serverparts/serv_apicalls.js');

const {
    findOneAndDelete_QueMod,
    UpdateMany_QueMod,
    findOneAndUpdate_QueMod_OprMod,
    findOne_QueMod,
    insertMany_ModMod,
    deleteMany_ModMod,
    create_OprMod,
    countDocuments,
    uploadFile_Cloudinary,
    removeFile_Cloudinary,
    findManyQueMod,
    aggregate_QueMod
} = require('./serverparts/mongo_calls');


// Models
const { User } = require('./models/system/user');
const { Payment } = require('./models/payment');

//----
// Models - CMS
// const { Product } = require('./models/cms/product');


// Models - SYSTEM
// const { Menu } = require('./models/system/menu');

// Middlewares
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

//UTILS
const { sendEmail } = require('./utils/mail')
const asyncMiddleware = require('./middleware/asyncmiddleware');


// const date = new Date();
// const po = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA256("32432423").toString().substring(0,8)}`

// console.log(po)

const multer = require('multer');
let storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png') {
            return cb(res.status(400).end('only jpg/png are allowed'), false);
        }
        cb(null, true)
    }

});

// SetInterval 1000000000
setInterval(async () => {
    await syncRates()
}, 10000000)

// If I want to upload Multiple, I need to pass an array here and make changes according to documentation of Multer
const upload = multer({ storage: storage }).single('file')

app.post('/api/user/uploadfile', auth, admin, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true })
    })
})

const fs = require('fs');
const path = require('path');
const { get } = require('http');

app.get('/api/user/admin_files', auth, admin, (req, res) => {
    const dir = path.resolve('.') + '/uploads/';

    fs.readdir(dir, (err, items) => {
        return res.status(200).send(items);
    })
})

app.get('api/user/download/:id', auth, admin, (req, res) => {
    const file = path.resolve('.') + `/uploads/${req.params.id}`;
    res.download(file)
})

//=======================
//      GENERIC API
//=======================

// Find Many doesn't use string arguments
app.post('/api/find_many_que_mod', asyncMiddleware(async (req, res) => {

    let doc1 = await findManyQueMod({ req })

    res.status(200).send(doc1)
}))
app.post('/api/findone_que_mod', asyncMiddleware(async (req, res) => {

    let doc1 = await findOne_QueMod({ req })

    res.status(200).send(doc1)

}))
app.post('/api/updateone_que_mod_opr_mod', auth, admin, asyncMiddleware(async (req, res) => {

    let doc1 = await findOneAndUpdate_QueMod_OprMod({ req })
    res.status(200).send(doc1)

}))
app.post('/api/updatemany_que_mod_opr_mod', auth, admin, asyncMiddleware(async (req, res) => {

    let doc1 = await UpdateMany_QueMod({ req })
    res.status(200).send(doc1)

}))
app.post('/api/removeone_que_mod', auth, asyncMiddleware(async (req, res) => {

    let doc1 = await findOneAndDelete_QueMod({ req })

    res.status(200).send(doc1)

}))
app.post('/api/sendmail', asyncMiddleware(async (req, res) => {

    let doc1 = await sendEmail({ req }).catch(console.error);

    res.status(200).send(doc1)

}))
/* app.post('/api/sendmail_auth', auth, asyncMiddleware(async (req, res) => {

    let doc1 = await sendEmail({ req }).catch(console.error);

    res.status(200).send(doc1)

})) */

app.post('/api/insertmany_mod_mod', auth, admin, asyncMiddleware(async (req, res) => {

    let doc1 = await insertMany_ModMod({ req })
    res.status(200).send(doc1)
}))
app.post('/api/deletemany_mod_mod', auth, admin, asyncMiddleware(async (req, res) => {

    let doc1 = await deleteMany_ModMod({ req })
    res.status(200).send(doc1)
}))
app.post('/api/create_opr_mod', asyncMiddleware(async (req, res) => {

    let doc1 = await create_OprMod({ req })
    res.status(200).send(doc1)
}))
app.post('/api/countdocuments', asyncMiddleware(async (req, res) => {

    let doc1 = await countDocuments({ req })
    res.send((doc1).toString())
}))
app.post('/api/uploadfile_cloudinary', auth, admin, formidable(), asyncMiddleware(async (req, res) => {

    // To albo eval()
    let isTrueSet = (req.query.uploaddefaultsize === 'true');

    let inParams
    if (Object.values(req.fields).length !== 0 && !isTrueSet) {

        /* Jak wymazuje czesc, nie moze byc heigh i width undefined, trzeba wymazac calosc */
        inParams = {
            public_id: `${Date.now()}`,
            resource_type: 'auto',
            folder: req.fields.folder,
            height: req.query.uploadsizeheight ? req.query.uploadsizeheight : req.fields.height,
            width: req.query.uploadsizewidth ? req.query.uploadsizewidth : req.fields.width,
            crop: req.fields.crop
            // ,transform: '200px'
        }

    } else {

        inParams = {
            public_id: `${Date.now()}`,
            resource_type: 'auto',
            folder: req.query.folder,
            // height: 1600,
            // width: 2400,

            // for product long website upload Qubrick
            // height: 2000,
            // width: 1600,
            // crop: "fill"
            // ,transform: '200px'
        }
    }

    let doc1 = await uploadFile_Cloudinary({ req, inParams })

    if (doc1.public_id) {
        res.status(200).send(doc1)
    } else {
        res.status(400).send('Cloudinary did not accept file');
    }

}))

app.post('/api/removefile_cloudinary', auth, admin, asyncMiddleware(async (req, res) => {

    let doc1 = await removeFile_Cloudinary({ req })

    if (doc1.result !== 'ok') {
        return res.json({ success: false, doc1 })
    } else {
        res.send({ public_id: req.body.reqoperator })
    }

}))
app.get('/api/getGooglecreds', auth, admin, asyncMiddleware(async (req, res) => {

    return res.json(process.env.GOOGLE_APPLICATION_CREDENTIALS)

}))
app.get('/api/getGeolocation', asyncMiddleware(async (req, res) => {
    const clientIp = requestIp.getClientIp(req); 
    // const clientIp = '44.64.109.27';

    try {

        let user = process.env.MAXMIND_USER
        let password = process.env.MAXMIND_PASSWORD

        let base64encodedData = Buffer.from(user + ':' + password).toString('base64');

        let response = await axios({
            baseURL: 'https://geolite.info/geoip/v2.1/city/' + clientIp,
            withCredentials: true,
            method: "GET",
            headers: { 'Authorization': 'Basic ' + base64encodedData },
        })

        // ### Arin is disabled, cause it takes up page loading time, maybe do it later and don't link it with page load.
        /*         let arin = await axios({
                    baseURL: 'https://rdap-bootstrap.arin.net/bootstrap/ip/' + clientIp,
                    method: "GET",
                }) */

        res.status(200).json({
            data: response.data,
            ip: clientIp,
            /* arin: arin.data,  */
            Success: true
        });

    } catch (error) {
        res.status(200).json({ data: error, ip: clientIp, Success: false });
    }

}))
app.post('/api/aggregate', asyncMiddleware(async (req, res) => {

    let doc1 = await aggregate_QueMod({ req })

    res.status(200).send(doc1)

}))
app.post('/api/user/logout', auth, asyncMiddleware(async (req, res) => {

    let inQuery = { _id: { "$eq": req.user._id } }
    let inOperator = { '$set': { token: '' } }
    let inParams = { new: true }
    Object.assign(req.body, { reqquery: inQuery, reqoperator: inOperator, reqparams: inParams })

    let doc1 = await findOneAndUpdate_QueMod_OprMod({ req })
    res.status(200).send(doc1)

}))
app.get('/api/user/auth', auth, asyncMiddleware(async (req, res) => {

    res.status(200).json({
        // isAdmin: req.user.role <= 1 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        images: req.user.images,
        history: req.user.history
    })

}))
// app.get('/api/user/auth', auth, (req, res) => {

//     res.status(200).json({
//         isAdmin: req.user.role === 0 ? false : true,
//         isAuth: true,
//         email: req.user.email,
//         name: req.user.name,
//         lastname: req.user.lastname,
//         role: req.user.role,
//         cart: req.user.cart,
//         history: req.user.history
//     })

// })
app.post('/api/user/login', (req, res) => {

    User.findOne({ 'email': req.body.form_email }, (err, user) => {

        if (!user) { return res.json({ loginSuccess: false, message: "Auth failed, email not found" }); } else {

            user.comparePassword(req.body.form_password, (err, isMatch) => {

                if (!isMatch) {
                    return res.json({ loginSuccess: false, message: 'Invalid Credentials' });
                } else {
                    /// Generate a token
                    user.generateToken((err, user) => {
                        if (err) return res.status(400).send(err);
                        res.cookie('w_auth', user.token).status(200).json({
                            loginSuccess: true,
                            user
                        })
                    })
                } // end compare Pw
            })
        } // if(!user)
    })
})

// ======================
//          USERS
//=======================

app.post('/api/user/reset_user', (req, res) => {

    User.findOne(
        { 'email': req.body.email },
        (err, user) => {
            if (!user) { return res.json({ success: false, message: "Email not found" }); } else {
                user.generateResetToken((err, user) => {
                    if (err) return res.json({ success: false, message: 'Unable to generate a token' });
                    sendEmail(user.email, user.name, null, "reset_password", user)
                    return res.json({ success: true })
                })
            }
        }
    )
})

app.post('/api/user/reset_password', (req, res) => {

    var today = moment().startOf('day').valueOf();

    User.findOne({
        resetToken: req.body.resetToken,
        resetTokenExp: {
            $gte: today
        }
    }, (err, user) => {
        if (!user) return res.json({ success: false, message: 'Sorry, token invalid, generate a new one' })

        user.password = req.body.password;
        user.resetToken = '';
        user.resetTokenExp = '';

        user.save((err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true
            })
        })
    })
})


app.post('/api/user/register', (req, res) => {


    const candidate_user = new User(req.body);

    // Check if duplicate present 

    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (user) { return res.json({ success: false, message: "Email is already registered" }); } else {

            // Save the User
            candidate_user.save((err, doc) => {
                if (err) return res.json({ success: false, message: err.message });
                sendEmail(doc.email, doc.name, null, "welcome");
                return res.status(200).json({
                    success: true,
                    // userdata: doc
                })

            })

        } // if(!user)
    })

})

app.post('/api/users/uploadimage', auth, admin, formidable(), (req, res) => {
    cloudinary.uploader.upload(req.files.file.path, (result) => {
        res.status(200).send({
            public_id: result.public_id,
            secure_url: result.secure_url
        })
    }, {
        public_id: `${Date.now()}`,
        resource_type: 'auto'
        // ,transform: '200px'
    })
})
app.post('/api/user/successBuy', auth, (req, res) => {

    let history = [];
    let transactionData = {};

    const date = new Date();
    const po = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA256(req.user._id).toString().substring(0, 8)}`


    // user history
    req.body.cartDetail.forEach((item) => {
        history.push({

            porder: po,
            dateOfPurchase: Date.now(),
            name: item.name,
            brand: item.brand.name,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    })

    // PAYMENTS DASH
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email
    }
    transactionData.data = {
        ...req.body.paymentData,
        porder: po
    };
    transactionData.product = history;

    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: history }, $set: { cart: [] } },
        { new: true },
        (err, user) => {
            if (err) return res.json({ success: false, err });

            const payment = new Payment(transactionData);
            payment.save((err, doc) => {
                if (err) return res.json({ success: false, err });
                let products = [];
                doc.product.forEach(item => {
                    products.push({ id: item.id, quantity: item.quantity })
                })

                async.eachSeries(products, (item, callback) => {
                    Product.updateOne(
                        { _id: item.id },
                        {
                            $inc: {
                                "sold": item.quantity
                            }
                        },
                        { new: false },
                        callback
                    )
                }, (err) => {
                    if (err) return res.json({ success: false, err })
                    sendEmail(user.email, user.name, null, "purchase", transactionData)
                    res.status(200).json({
                        success: true,
                        cart: user.cart,
                        cartDetail: []
                    })
                })
            });
        }
    )
});

app.post('/api/user/update_profile', auth, (req, res) => {

    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            "$set": req.body
        },
        { new: true },
        (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            })
        }
    );
})

/* development OR production */

if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}

let port
if (process.env.NODE_ENV === 'production') {

    /* this is done for varying ports in Fastcomet, not sure if it works with Heroku */
    port = process.env.PORT;
} else {
    port = process.env.PORT || 3002;
}
// const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server running at ${port}`)
})