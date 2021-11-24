
const loopProducts = ({ redux_cartuser, currencySymbol }) => {

    let returnstring = ``

    for (let value of redux_cartuser) {

        returnstring += `<tr>
        <td>
        <p style="box-sizing: border-box; color: black; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: left; text-transform: uppercase;font-size:12px">
        ${value.quantity}x ${value.referenceID.name} = ${value.quantity * value.referenceID.price} ${currencySymbol}
        </p>
        </td>
        </tr>`
    }
    return returnstring

}

// MILKBARDESIGNERS

// async function contact_messagebody ({ from, body, subject }) {
//     return ` <!DOCTYPE html>
//     <html style="margin: 0; padding: 0;">
//     <head>
//     <title>One | Contact </title>
//     </head>
//     <body style="margin: 0; padding: 0;">
//             <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 1000px;">
//             <tr>
//             <td style="background-color: #999592; margin: 0 auto;">
//             <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Email Received.</h1></td>
//             </tr>
//                 <tr><td style="box-sizing: border-box; color: black; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: left; text-transform: uppercase;font-size:12px">
//                 <p>
//                 You have received an email from ${from}
//                 </p>
//                 <p>
//                 ${subject}
//                 </p>
//                 <p>
//                 ${body}
//                 </p>
//                 <p>
//                 www.milkbardesigners.com Mailing system
//                 </p>
//                 </td></tr>
//             </table>
//             </body></html>`
// }

// async function contact_confirmation_email({ redux_cartuser, totalSum, currencySymbol }) {
//     return ` <!DOCTYPE html>
//     <html style="margin: 0; padding: 0;">
//     <head>
//     <title>One | Contact </title>
//     </head>
//     <body style="margin: 0; padding: 0;">
//             <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 1000px;">
//             <tr>
//             <td style="background-color: #999592; margin: 0 auto;">
//             <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Email Sent</h1></td>
//             </tr>
//                 <tr><td style="box-sizing: border-box; color: black; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: left; text-transform: uppercase;font-size:12px">
//                 <p>
//                 Please allow some time to process your email.
//                 </p>
//                 <p>
//                 Milkbardesigners Team,
//                 </p>
//                 <p>
//                 www.milkbardesigners.com
//                 </p>
//                 </td></tr>
//             </table>
//             </body></html>`
// }

// async function confirmation_email({ redux_cartuser, totalSum, currencySymbol }) {
//     return ` <!DOCTYPE html>
//     <html style="margin: 0; padding: 0;">
//     <head>
//     <title>One | Purchase Completed</title>
//     </head>
//     <body style="margin: 0; padding: 0;">
//             <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 1000px;">
//             <tr>
//             <td style="background-color: #999592; margin: 0 auto;">
//             <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Order Summary</h1></td>
//             </tr>
//             <p >
//             You have placed order on the following products in our store:
//             </p>
//             ${loopProducts({ redux_cartuser, currencySymbol })}
//             <tr><td style="box-sizing: border-box; color: black; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: left; text-transform: uppercase;font-size:12px">
//             <p>
//                 <b>Total Sum: ${totalSum} ${currencySymbol}</b>
//                 </p>                </td></tr>
//                 <tr><td style="box-sizing: border-box; color: black; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: left; text-transform: uppercase;font-size:12px">
//                 <p>
//                 Thank you for shopping
//                 </p>
//                 <p>
//                 Milkbardesigners
//                 </p>
//                 <p>
//                 www.milkbardesigners.com
//                 </p>
//                 </td></tr>
//             </table>
//             </body></html>`
// }


// async function purchase_email({ redux_cartuser, totalSum, currencySymbol }) {

//     return ` <!DOCTYPE html>
//     <html style="margin: 0; padding: 0;">
//     <head>
//     <title>One | Purchase Completed</title>
//     </head>
//     <body style="margin: 0; padding: 0;">
//             <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 1000px;">
//             <tr>
//             <td style="background-color: #999592; margin: 0 auto;">
//             <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Order Summary</h1></td>
//             </tr>
//             ${loopProducts({ redux_cartuser, currencySymbol })}
//             <tr><td style="box-sizing: border-box; color: black; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: left; text-transform: uppercase;font-size:12px">
//             <p>
//                 <b>Total Sum: ${totalSum} ${currencySymbol}</b>
//                 </p>                </td></tr>
//                 <tr><td style="box-sizing: border-box; color: black; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: left; text-transform: uppercase;font-size:12px">
//                 <p >
//                 Please transfer the order amount to:
//                 </p>
//                 <p>89 1020 4812 0000 0102 0107 5605
//                 </p>
//                 <p>
//                 Thank you !
//                 </p>
//                 <p>
//                 Milkbardesigners
//                 </p>
//                 <p>
//                 www.milkbardesigners.com
//                 </p>
//                 </td></tr>
//             </table>
//             </body></html>`
// }
// QUBRICK

async function contact_messagebody ({ from, body, subject }) {
    return ` <!DOCTYPE html>
    <html style="margin: 0; padding: 0;">
    <head>
    <title>One | Contact </title>
    </head>
    <body style="margin: 0; padding: 0;">
            <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 1000px;">
            <tr>
            <td style="background-color: #999592; margin: 0 auto;">
            <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Email Received.</h1></td>
            </tr>
                <tr><td style="box-sizing: border-box; color: black; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: left; text-transform: uppercase;font-size:12px">
                <p>
                Yoy have received an email from ${from}
                </p>
                <p>
                ${subject}
                </p>
                <p>
                ${body}
                </p>
                <p>
                www.qubrick.io Mailing system
                </p>
                </td></tr>
            </table>
            </body></html>`
} 
async function contact_confirmation_email({ redux_cartuser, totalSum, currencySymbol }) {
    return ` <!DOCTYPE html>
    <html style="margin: 0; padding: 0;">
    <head>
    <title>One | Contact </title>
    </head>
    <body style="margin: 0; padding: 0;">
            <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 1000px;">
            <tr>
            <td style="background-color: #999592; margin: 0 auto;">
            <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Email Sent</h1></td>
            </tr>
                <tr><td style="box-sizing: border-box; color: black; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: left; text-transform: uppercase;font-size:12px">
                <p>
                Please allow some time to process your email.
                </p>
                <p>
                Qubrick Team,
                </p>
                <p>
                www.qubrick.io
                </p>
                </td></tr>
            </table>
            </body></html>`
}

 async function confirmation_email({ redux_cartuser, totalSum, currencySymbol }) {
    return ` <!DOCTYPE html>
    <html style="margin: 0; padding: 0;">
    <head>
    <title>One | Purchase Completed</title>
    </head>
    <body style="margin: 0; padding: 0;">
            <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 1000px;">
            <tr>
            <td style="background-color: #999592; margin: 0 auto;">
            <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Order Summary</h1></td>
            </tr>
            <p >
            You have purchased the following products in our store:
            </p>
            ${loopProducts({ redux_cartuser, currencySymbol })}
            <tr><td style="box-sizing: border-box; color: black; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: left; text-transform: uppercase;font-size:12px">
            <p>
                <b>Total Sum: ${totalSum} ${currencySymbol}</b>
                </p>                </td></tr>
                <tr><td style="box-sizing: border-box; color: black; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: left; text-transform: uppercase;font-size:12px">
                <p>
                Thank you for shopping
                </p>
                <p>
                Qubrick Team
                </p>
                </td></tr>
            </table>
            </body></html>`
} 

 async function purchase_email({ redux_cartuser, totalSum, currencySymbol }) {

    return ` <!DOCTYPE html>
    <html style="margin: 0; padding: 0;">
    <head>
    <title>One | Purchase Completed</title>
    </head>
    <body style="margin: 0; padding: 0;">
            <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 1000px;">
            <tr>
            <td style="background-color: #999592; margin: 0 auto;">
            <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Order Summary</h1></td>
            </tr>
            ${loopProducts({ redux_cartuser, currencySymbol })}
            <tr><td style="box-sizing: border-box; color: black; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: left; text-transform: uppercase;font-size:12px">
            <p>
                <b>Total Sum: ${totalSum} ${currencySymbol}</b>
                </p>                </td></tr>
                <tr><td style="box-sizing: border-box; color: black; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: left; text-transform: uppercase;font-size:12px">
                <p >
                Please transfer the order amount to:
                </p>
                <p>89 1020 4812 0000 0102 0107 5605
                </p>
                <p>
                Thank you !
                </p>
                <p>
                Qubrick Team
                </p>
                <p>
                www.qubrick.io
                </p>
                </td></tr>
            </table>
            </body></html>`
} 


// SURTARANG

// async function contact_messagebody ({ from, body, subject }) {
//     return ` <!DOCTYPE html>
//     <html style="margin: 0; padding: 0;">
//     <head>
//     <title>One | Contact </title>
//     </head>
//     <body style="margin: 0; padding: 0;">
//             <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 1000px;">
//             <tr>
//             <td style="background-color: #999592; margin: 0 auto;">
//             <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Email Received.</h1></td>
//             </tr>
//                 <tr><td style="box-sizing: border-box; color: black; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: left; text-transform: uppercase;font-size:12px">
//                 <p>
//                 Yoy have received an email from ${from}
//                 </p>
//                 <p>
//                 ${subject}
//                 </p>
//                 <p>
//                 ${body}
//                 </p>
//                 <p>
//                 www.surtarang.space Mailing system
//                 </p>
//                 </td></tr>
//             </table>
//             </body></html>`
// } 
// async function contact_confirmation_email({ redux_cartuser, totalSum, currencySymbol }) {
//     return ` <!DOCTYPE html>
//     <html style="margin: 0; padding: 0;">
//     <head>
//     <title>One | Contact </title>
//     </head>
//     <body style="margin: 0; padding: 0;">
//             <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 1000px;">
//             <tr>
//             <td style="background-color: #999592; margin: 0 auto;">
//             <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Email Sent</h1></td>
//             </tr>
//                 <tr><td style="box-sizing: border-box; color: black; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: left; text-transform: uppercase;font-size:12px">
//                 <p>
//                 Please allow some time to process your email.
//                 </p>
//                 <p>
//                 Surtarang Band,
//                 </p>
//                 <p>
//                 www.surtarang.space
//                 </p>
//                 </td></tr>
//             </table>
//             </body></html>`
// }

//  async function confirmation_email({ redux_cartuser, totalSum, currencySymbol }) {
//     return ` <!DOCTYPE html>
//     <html style="margin: 0; padding: 0;">
//     <head>
//     <title>One | Purchase Completed</title>
//     </head>
//     <body style="margin: 0; padding: 0;">
//             <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 1000px;">
//             <tr>
//             <td style="background-color: #999592; margin: 0 auto;">
//             <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Order Summary</h1></td>
//             </tr>
//             <p >
//             You have purchased the following products in our store:
//             </p>
//             ${loopProducts({ redux_cartuser, currencySymbol })}
//             <tr><td style="box-sizing: border-box; color: black; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: left; text-transform: uppercase;font-size:12px">
//             <p>
//                 <b>Total Sum: ${totalSum} ${currencySymbol}</b>
//                 </p>                </td></tr>
//                 <tr><td style="box-sizing: border-box; color: black; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: left; text-transform: uppercase;font-size:12px">
//                 <p>
//                 Thank you for shopping
//                 </p>
//                 <p>
//                 Surtarang Band
//                 </p>
//                 </td></tr>
//             </table>
//             </body></html>`
// } 

//  async function purchase_email({ redux_cartuser, totalSum, currencySymbol }) {

//     return ` <!DOCTYPE html>
//     <html style="margin: 0; padding: 0;">
//     <head>
//     <title>One | Purchase Completed</title>
//     </head>
//     <body style="margin: 0; padding: 0;">
//             <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 1000px;">
//             <tr>
//             <td style="background-color: #999592; margin: 0 auto;">
//             <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Order Summary</h1></td>
//             </tr>
//             ${loopProducts({ redux_cartuser, currencySymbol })}
//             <tr><td style="box-sizing: border-box; color: black; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: left; text-transform: uppercase;font-size:12px">
//             <p>
//                 <b>Total Sum: ${totalSum} ${currencySymbol}</b>
//                 </p>                </td></tr>
//                 <tr><td style="box-sizing: border-box; color: black; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: left; text-transform: uppercase;font-size:12px">
//                 <p >
//                 Please transfer the order amount to:
//                 </p>
//                 <p>89 1020 4812 0000 0102 0107 5605
//                 </p>
//                 <p>
//                 Thank you !
//                 </p>
//                 <p>
//                 Surtarang Band
//                 </p>
//                 <p>
//                 www.surtarang.space
//                 </p>
//                 </td></tr>
//             </table>
//             </body></html>`
// } 
export { purchase_email, confirmation_email, contact_confirmation_email, contact_messagebody }