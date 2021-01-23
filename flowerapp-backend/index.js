require("dotenv").config();
const cors = require("cors");
const express = require("express");
const request = require('request');
const axios  = require('axios');
const bodyParser = require('body-parser');
const stripe = require("stripe")(process.env.STRIPE_KEY);
const uuid = require("uuid/v4");

const app = express();

const Recaptcha = require('recaptcha-verify');
const recaptcha = new Recaptcha({
    secret: '6Lez_6IZAAAAAEL1gr1pZQlDjRTQ-ZOZDURNyY8B',
    verbose: true
});
//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//routes

app.get("/req",(req,res)=>{
let body = {
tit:"Test group by Rashid1",
des:"Test group by rashid from server code1",
web:"www.google.com1",
cat:"cat of the group23"
};
JSON.strig
axios.post("https://api.myflowerarchitect.com/group/create", {
tit:"Test group bys",
des:"Test group by rashid from server",
web:"www.google.com1",
cat:"cat of the group23"
}, {
headers: {
  'Authorization': `Bearer eyJraWQiOiJcL2dUdnFVXC9WXC9ncE5FeUVtVzhBc1NteWtEbTZDeFpjRlZ3NWZpTkF3V3RVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxMjYyOGIzYy03MTgxLTQ0ZGMtOWQ2Ni1jYmY0NGM0ZGI3ODQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfZjVqS00wdHdIIiwiY29nbml0bzp1c2VybmFtZSI6ImRlY2VudDEwY3MiLCJsb2NhbGUiOiJlbiIsImF1ZCI6IjRiYTBwMG5yNGduaTQxdWJxdDM2aTA1Z2RlIiwiZXZlbnRfaWQiOiJhMzYwZmEzMC05MGRmLTQ4YjUtODA1YS03YzQyZGJjNjE3OGMiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU5NjkxMzA3MywibmFtZSI6IlJhc2hpZCBBaG1hZCIsImV4cCI6MTU5NjkxNjY3MywiaWF0IjoxNTk2OTEzMDczLCJlbWFpbCI6ImRlY2VudDEwY3NAZ21haWwuY29tIn0.ETVavLxERRlKCtk6g6Kryh7EWmDT2EEjle3wjFSDIq7bWOI4_wSA4F2zUg10puo0WHD3qqXH72pOWt5_k6ZinFyo_R7KjnyOZHL2TUzhv0scbAY4yzgMb_6Ivij3Zuqi9Gch3XuU3JYHyWaJNopgawMpVZMirHz__2Hp6KA53CGmRHeSmKlv6YyR1vA8YNmURb2yuE-2QxpUeZJVoUkjXha2eXrhh6U674V7Rxp5vToO48B94Y4G38NY72jQd6Sn4Ygq33T7FzCgxwJr3V4WSR3X05oKXlSsd0FLqJOnDuea0QicjG-JuAPAsfuirAdP3MMRBXAeBwZPdEbArpfA2Q`,
  "Accept": "application/json",
 "Content-Type": "application/json",
 'Access-Control-Allow-Origin': '*'
}
}).then((response) => {
  console.log(response.data);
  res.json(response.data.data)

}).catch((err) => {
  res.json(err.message);
})
})
app.get("/group",(req,res)=>{
console.log("ddd")
axios.get("https://api.myflowerarchitect.com/group/mygroups", {
headers: {
  'Authorization': `Bearer eyJraWQiOiJcL2dUdnFVXC9WXC9ncE5FeUVtVzhBc1NteWtEbTZDeFpjRlZ3NWZpTkF3V3RVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxMjYyOGIzYy03MTgxLTQ0ZGMtOWQ2Ni1jYmY0NGM0ZGI3ODQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfZjVqS00wdHdIIiwiY29nbml0bzp1c2VybmFtZSI6ImRlY2VudDEwY3MiLCJsb2NhbGUiOiJlbiIsImN1c3RvbTp1c2VySWQiOiJVVVVVVVUxMjM0NTY3ODkxMjM0NTY5MjkiLCJhdWQiOiI0YmEwcDBucjRnbmk0MXVicXQzNmkwNWdkZSIsImV2ZW50X2lkIjoiYTM2MGZhMzAtOTBkZi00OGI1LTgwNWEtN2M0MmRiYzYxNzhjIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1OTY5MTMwNzMsIm5hbWUiOiJSYXNoaWQgQWhtYWQiLCJleHAiOjE1OTc0MjU5NjcsImN1c3RvbTpyb2xlIjoiZnJlZSIsImlhdCI6MTU5NzQyMjM2NywiZW1haWwiOiJkZWNlbnQxMGNzQGdtYWlsLmNvbSJ9.N2UBMkDP2aPzPSUEuRYncyDIs8F9mNh-RlUU13hdgr2WDEfWy3z_PZ-n38UV5--V3YDnil-Yz0zDfAKBmV4K1m0dV36P_eyw_J3d0ps4EtX2Svx7pnuAwAeNLPZZAnKEcoChWShU8HAhklI5ke2c0GDc2Ie2l0I0T2upDwCJVm-6geMyTMQM5wwl38QigNX_Y6bi8grqoOMYrXto_bfbZlbBtnjJqJJYo1qyVVL85KYrDcCLTjp9rEdTipx6bOBehSXSLargadMAtTIRBTm7njF6XQuxCMu8eho0GlgBXqGiEB_2gB7wyB9heXOCRQTs4reJ2VxQlOApMscEMcYt`,
  "Accept": "application/json",
 "Content-Type": "application/json",
 'Access-Control-Allow-Origin': '*'
}
}).then((response) => {
  console.log(response);
  res.json(response.data)

}).catch((err) => {
  res.json(err.message);
})
})
app.get("/", (req, res) => {
  res.send("Ok");
});

// app.post("/payment", (req, res) => {
//   const { product, token } = req.body;
//   console.log("PRODUCT ", product);
//   console.log("PRICE ", product.price);
//   const idempontencyKey = uuid();
//
//   return stripe.customers
//     .create({
//       email: token.email,
//       source: token.id
//     })
//     .then(customer => {
//       stripe.charges.create(
//         {
//           amount: product.price * 100,
//           currency: "usd",
//           customer: customer.id,
//           receipt_email: token.email,
//           description: `purchase of ${product.name}`,
//           shipping: {
//             name: token.card.name,
//             address: {
//               country: token.card.address_country
//             }
//           }
//         },
//         { idempontencyKey }
//       );
//     })
//     .then(result => res.status(200).json(result))
//     .catch(err => console.log(err));
// });
app.post('/verify',  (req, res) => {


  recaptcha.checkResponse(req.body.captcha, function(error, response){
       if(error){
           // an internal error?
          res.json({ succuess: false,response });
           return;
       }
       if(response.success){
             res.json({ succuess: true,response });
           // save session.. create user.. save form data.. render page, return json.. etc.
       }else{
            res.json({ succuess: false ,response });
           // show warning, render page, return a json, etc.
       }
     })
//   if (!req.body.captcha) return res.json({ success: false, msg: 'Please select captcha' });
//
//   // Verify URL
//   const query = JSON.stringify({
//     secret: secretKey,
//     response: req.body.captcha,
//     remoteip: req.connection.remoteAddress
//   });
//   const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;
//
//   // Make a request to verifyURL
// console.log(query);
//     request({url:verifyURL,method:"POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }}, function(err, response, body) {
//       body = JSON.parse(body);
//       console.log(body);
//             // Success will be true or false depending upon captcha validation.
//                 if(body.success !== undefined && !body.success) {
//                     res.send({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
//                 }else{
//                     res.send({"responseCode" : 0,"responseDesc" : "Sucess"});
//                 }
//
//
//
//
//
//   });
})
app.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotencyKey = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotencyKey
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});
app.post('/create-subscription', async (req, res) => {
  let customer;
  
  try {
    // check the customerId if not exsist create customer
    if(!req.body.customerId)
{
  customer  = await stripe.customers.create({
      email: req.body.email,
    });
}
// Attach the payment method to the customer
   await stripe.paymentMethods.attach(req.body.paymentMethodId, {
      customer: req.body.customerId || customer.id,
    });
  } catch (error) {
    return res.status('402').send({ error: { message: error.message } });
  }

  // Change the default invoice settings on the customer to the new payment method
  await stripe.customers.update(
    req.body.customerId || customer.id,
    {
      invoice_settings: {
        default_payment_method: req.body.paymentMethodId,
      },
    }
  );

  // Create the subscription
let subscription;
  if(req.body.paymentType === "recurring"){
  subscription = await stripe.subscriptions.create({
    customer: req.body.customerId || customer.id,
    items: [{ price: req.body.priceId }],
    expand: ['latest_invoice.payment_intent'],
  });
  }
  else{
      // One time payment
  subscription = await stripe.paymentIntents.create({
    customer: req.body.customerId || customer.id,
    currency: 'usd',
    amount: parseInt(req.body.price * 100),
    payment_method: req.body.paymentMethodId,

  });
  // Confirm the payment
  await stripe.paymentIntents.confirm(
  subscription.id,

);
  }
// Return success to the client
  res.send(subscription);
});

//listen

app.listen(8080, () => console.log("LISTENING AT PORT 8080"));
