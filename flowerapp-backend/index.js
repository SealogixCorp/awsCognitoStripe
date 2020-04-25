require("dotenv").config();
const cors = require("cors");
const express = require("express");


const stripe = require("stripe")(process.env.STRIPE_KEY);
const uuid = require("uuid/v4");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
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

//listen

app.listen(8080, () => console.log("LISTENING AT PORT 8080"));
