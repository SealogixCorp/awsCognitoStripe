import React, { useMemo } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {createSubscription} from "../core/utils";
const useOptions = () => {

  const options = useMemo(
    () => ({
      style: {
        base: {

          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    []
  );

  return options;
};

const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(elements);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
//    const plan = await stripe.plans.create({
//   amount: 500,
//   currency: 'usd',
//   interval: 'month',
//   product: 'prod_Ina5RAXqSWGyNR',
// });
// console.log(plan);
// return;
    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });
 
    // const { error } = await stripe.redirectToCheckout({
    //   lineItems: [{
    //     price: 'prod_BUX1XYGuszW54G', // Replace with the ID of your price
    //     quantity: 1,
    //   }],
    //   mode: 'payment',
    //   successUrl: 'http://myflowerarchitect.com',
    //   cancelUrl: 'https://example.com/cancel',
    // });
    // console.log(error);

    console.log("[PaymentMethod]", payload);


   let res =  await createSubscription({
          customerId: "cus_HJ9sy0qqnWnj0R",
          paymentMethodId: payload.paymentMethod.id,
          priceId: "flw_basic_yearly",
        });
        console.log(res);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card details
        <CardElement
          options={options}
          onReady={() => {
            console.log("CardElement [ready]");
          }}
          onChange={event => {
            console.log("CardElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardElement [blur]");
          }}
          onFocus={() => {
            console.log("CardElement [focus]");
          }}
        />
      </label>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CardForm;