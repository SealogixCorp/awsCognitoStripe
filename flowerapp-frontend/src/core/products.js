export const monthlyDeal = [
  {
    title: "FlowerArchitect Basic Membership",
    price: "9.99",
    id: 1,
    type: "basic",
    paymentType: "recurring",
    priceId: "flw_basic_monthly",
    flowerArchitectId: "basicM",
    stripeId: "prod_Ikj1ZhNaTCiRsl",
    description: [
      "- Flower Library - full access to flower image database over 1800 flowers and thousands of embellishments (vases, containers, birds, butterflies, jewels, feathers, fruit, etc)",
      "- Samples - basic arrangement & basket samples library (Vase, wristlet, bridal and few more types)",
      "- 10 Storage Tokens -  each storage token allows for storage of one basket, arrangement, or scene as long as you membership is current",
      "- 1 Enlargement Token - sends to Zenfolio photographers website and enlarge to 300dpi and download (Also store to buy prints, oils, t-shirts, etc) (one time use)",
      "- Share -  share Your arrangement with your friends or send to Pinterest",
    ],
    buttonText: "BUY",
    buttonVariant: "contained",
  },
  {
    title: "Enhanced",
    subheader: "Most popular",
    id: 2,
    type: "club",
    paymentType: "recurring",
    price: "14.99",
    flowerArchitectId: "clubM",
    stripeId: "prod_BTQElBYI4sMMjv",
    priceId: "flw_designer_monthly",
    description: [
      "- Flower Library - full access to flower image database over 1800 flowers and thousands of embellishments (vases, containers, birds, butterflies, jewels, feathers, fruit, etc)",
      "- Samples - basic arrangement & basket samples library (Vase, wristlet, bridal and few more types)",
      "- 4 Storage Tokens for high Resolution Venue Background Images for your scenes",
      "- 50 Storage Tokens. each storage token allows for storage of one basket,  arrangement or scene  as long as you membership is current",
      "- Scenes - ability to Create Scenes with your background image and your arrangements placed in scene. (You in your wedding dress with flowers) upload 1  background image (venue )  as long as you membership is current",
      "- 2 Enlargement Tokens - sends to Zenfolio photographers website and enlarge to 300dpi and download (Also store to buy prints, oils, t-shirts, etc) (one time use)",
      "- Shape Aid Templates - 22 Templates To layout on the canvas to assist in the layout of your flower arrangements",
      "- Share -  share Your arrangement with your friends or send to Pinterest",
    ],
    buttonText: "BUY",
    buttonVariant: "contained",
  },
  {
    title: "Designer (Recommended for Brides)",
    id: 3,
    type: "designer",
    paymentType: "recurring",
    price: "19.99",
    flowerArchitectId: "designerM",
    stripeId: "prod_IneJf4dTkTwvgr",
    priceId: "price_1IC31HLp679ATwPBonbiGMPi",
    description: [
      "- Flower Library - full access to flower image database over 1800 flowers and thousands of embellishments (vases, containers, birds, butterflies, jewels, feathers, fruit, etc)",
      "- Samples - full samples library of arrangements and baskets grouped by (vase arrangement, bridal bouquet, wristlet, tropical, wildflower, etc.)",
      "- 200 Storage Tokens. each storage token allows for storage of one basket,  arrangement or scene  as long as you membership is current",
      "- Scenes - ability to Create Scenes with your background image and your arrangements placed in scene. upload and store 10  background images (venues )  as long as you membership is current",
      "- 10 Enlargement Tokens - sends to Zenfolio photographers website and enlarge to 300dpi and download (Also store to buy prints, oils, t-shirts, etc)",
      "- 5 Quotations - Ability to send emails with quotation request pdf show your arrangement, associated flower list and your instructions (card, vase, size, etc) (one time use)",
      "- Color Wheel  - search for flower that match color wheel",
      "- Groups - Ability to create groups and invite friends and share you arrangements, baskets, and scenes",
      "- Collages - Access to pre-defined color coordinated flower Collages with associated baskets",
      "- Flower Data Library - Data library for each flower category (200+) (seasonal availability, relative cost, vase life, shape, texture, etc.)",
      "- Menu Driven search of flower database by example from menu drop-downs",
      "- Share -  share Your arrangement with your friends or send to Pinterest",
    ],
    buttonText: "BUY",
    buttonVariant: "contained",
  }
];
export const arrangementDeals = [
  {
    title: "Storage Tokens",
    price: "9.99",
    id: 5,
    paymentType: "oneTime",
    flowerArchitectId: "storage25",
    StripeId: "prod_Io4QctJ3AOjz0v",
    priceId: "price_1ICSHZLp679ATwPBZWnla2U3",
    description: [
      "- extra Tokens for more storage to add to your membership (each token can be used to store a basket, arrangement, or scene 25 for $9.99 dollars ",
    ],
    buttonText: "BUY",
    buttonVariant: "contained",
  },
  {
    title: "Enlargement Tokens",
    subheader: "Most popular",
    price: "4.99",
    id: 6,
    paymentType: "oneTime",
    flowerArchitectId: "enlargement10",
    StripeId: "prod_Io4VpoDXBiq0Po",
    priceId: "price_1ICSM5Lp679ATwPB7qlVxvOi",
    description: [
      "- 10 for $4.99 dollars sends to Zenfolio photographers website and enlarge to 300dpi and download (Also store to buy prints, oils, t-shirts, etc) (one time use)",
    ],
    buttonText: "BUY",
    buttonVariant: "contained",
  },
  {
    title: "Venue Tokens",
    id: 7,
    paymentType: "oneTime",
    flowerArchitectId: "venue10",
    StripeId: "prod_Io4bdCRbmTxRX3",
    priceId: "price_1ICSSMLp679ATwPBJXoLqgiq",
    price: "4.99",
    description: [
      " - store extra venue images with your membership 10 for a 4.99 dollars ",
    ],
    buttonText: "BUY",
    buttonVariant: "contained",
  },
  {
    title: "Quotation Tokens",
    flowerArchitectId: "email50",
    StripeId: "prod_Io4eDe51MHFcCd",
    priceId: "price_1ICSUlLp679ATwPBMy1HLcUp",
    price: "4.99",
    id: 8,
    paymentType: "oneTime",
    description: ["- send extra Quotation emails for 50 for 4.99 dollars"],
    buttonText: "BUY",
    buttonVariant: "contained",
  },
];

export const subscriptionsList = [
 {
    title: "FlowerArchitect Basic Membership",
    tag:'Get Started',
    price: "9.99",
    icon: <div className="flex justify-center items-center "><div className="p-4 rounded-full bg-white my-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg></div></div>,
    id: 1,
    type: "Month",
    paymentType: "recurring",
    priceId: "flw_basic_monthly",
    flowerArchitectId: "basicM",
    stripeId: "prod_Ikj1ZhNaTCiRsl",
    link:'https://buy.stripe.com/cN28zGgKE4uK5Rm144',
    className:"blue-card",
    description: [
      "Create Beautiful Flower Arrangements",
      "Flower Library Database over 1800 Flowers",
      "Basic Samples of Arrangements & baskets",
      "10 Storage Tokens (Arrangements & Baskets)",
      "1 Enlargement Token Monthly",
      "Share with your friends",
      "See Details Below.."
    ],
    buttonText: "Buy Basic Monthly Now!",
    buttonVariant: "contained",
  },

   {
    title: "FlowerArchitect Enhanced Membership",
    tag:'Do More',
      className:"green-card",
      icon: <div className="flex justify-center items-center "><div className="p-4 rounded-full bg-white my-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg></div></div>,
    price: "14.99",
    id: 1,
    type: "Month",
    paymentType: "recurring",
    priceId: "flw_basic_monthly",
    flowerArchitectId: "basicM",
    stripeId: "prod_Ikj1ZhNaTCiRsl",
    link:'https://buy.stripe.com/28obLS6601iyenSbIM',
    description: [
      "Full Samples of Arrangements & baskets",
      "50 Storage Tokens",
      "2 Enlargement Tokens Monthly",
      "Flower Collages Color Coordinated",
      "4 Scene Background Storage Tokens",
      "Create Virtual Scenes (Images, Garlands)",
      "See Details Below.."
    ],
    buttonText: "Buy Enhanced Monthly Now!",
    buttonVariant: "contained",
  },
   {
    title: "FlowerArchitect Designer Membership",
    tag:'Get Everything',
    className:"yellow-card",
    icon: <div className="flex justify-center items-center "><div className="p-4 rounded-full bg-white my-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
   <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
</svg></div></div>,
    price: "19.99",
    id: 1,
    type: "Month",
    paymentType: "recurring",
    priceId: "flw_basic_monthly",
    flowerArchitectId: "basicM",
    stripeId: "prod_Ikj1ZhNaTCiRsl",
    link:'https://buy.stripe.com/7sIaHOcuo7GW3JedQV',
    description: [
      "200 Storage Tokens including Scenes & Images",
      "10 Scene Background Storage Tokens",
      "Flower Data Library for each flower category (200+)",
      "4 Enlargement Tokens Monthly",
      "Groups - invite friends to share & create together",
      "5 Email Quotations per Month",
      "Color Wheel To Search for Flowers",
      "See Details Below.."
    ],
    buttonText: "Buy Designer Monthly Now!",
    buttonVariant: "contained",
  },
  ,
   {
    title: "Basic Yearly.... Membership",
    tag:'Save - 1 Month Free!',
    className:"blue-card",
    icon: <div className="flex justify-center items-center "><div className="p-4 rounded-full bg-white my-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg></div></div>,
    price: "109.99",
    id: 1,
    type: "Yearly",
    paymentType: "recurring",
    priceId: "flw_basic_monthly",
    flowerArchitectId: "basicM",
    stripeId: "prod_Ikj1ZhNaTCiRsl",
    link:'https://buy.stripe.com/fZe5nu8e85yO7Zu7st',
    description: [
     "Same As Basic Monthly Above"
    ],
    buttonText: "Buy Basic Yearly Membership Now!",
    buttonVariant: "contained",
  },
  ,
   {
    title: "Enhanced Yearly Membership",
    tag:'Save - 1 Month Free!',
      className:"green-card",
    icon: <div className="flex justify-center items-center "><div className="p-4 rounded-full bg-white my-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg></div></div>,
    price: "164.99",
    id: 1,
    type: "Yearly",
    paymentType: "recurring",
    priceId: "flw_basic_monthly",
    flowerArchitectId: "basicM",
    stripeId: "prod_Ikj1ZhNaTCiRsl",
    link:'https://buy.stripe.com/3cs8zGfGA8L01B6eUX',
    description: [
     "Same As Enhanced Monthly Above  "
    ],
    buttonText: "Buy Enhanced Yearly Membership Now!",
    buttonVariant: "contained",
  },
   ,
   {
    title: "Designer Yearly Membership",
    tag:'Save - 1 Month Free!',
      className:"yellow-card",
    icon: <div className="flex justify-center items-center "><div className="p-4 rounded-full bg-white my-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
   <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
</svg></div></div>,
    price: "219.99",
    id: 1,
    type: "Yearly",
    paymentType: "recurring",
    priceId: "flw_basic_monthly",
    flowerArchitectId: "basicM",
    stripeId: "prod_Ikj1ZhNaTCiRsl",
    link:'https://buy.stripe.com/00g3fmgKEgdsgw028a',
    description: [
     "Same As Designer Monthly Above"
    ],
    buttonText: "Buy Designer Yearly Membership Now!",
    buttonVariant: "contained",
  },
  ///

 ,
   {
    title: "FlowerArchitect Additional Storage Tokens",
    tag:'Store 25 More Arrangements',
      className:"blue-card",
      icon: <div className="flex justify-center items-center "><div className="p-4 rounded-full bg-white my-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg></div></div>,
    price: "9.99",
    id: 1,
    type: "Each",
    paymentType: "recurring",
    priceId: "flw_basic_monthly",
    flowerArchitectId: "basicM",
    stripeId: "prod_Ikj1ZhNaTCiRsl",
    link:'https://buy.stripe.com/6oE2bi51W7GW0x23ci',
    description: [
     "25 Additional Storage Tokens on top of your membership storage token allotment.",
     "Each Token Stores a basket, arrangement, image, garland or scene for as long as your membership is active.",
     "See Details Below.."
    ],
    buttonText: "Buy 25 Storage Tokens Now!",
    buttonVariant: "contained",
  },
   ,
   {
    title: "FlowerArchitect Enlargement Tokens",
    tag:'10 More Zenfolio Print Quality',
      className:"green-card",
      icon: <div className="flex justify-center items-center "><div className="p-4 rounded-full bg-white my-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg></div></div>,
    price: "4.99",
    id: 1,
    type: "Each",
    paymentType: "recurring",
    priceId: "flw_basic_monthly",
    flowerArchitectId: "basicM",
    stripeId: "prod_Ikj1ZhNaTCiRsl",
    link:'https://buy.stripe.com/3cs03a3XS9P42FafZ5',
    description: [
     "10 one time use Enlargement Tokens on top of your membership storage token allotment.",
     "Send Your Arrangements or Scenes to Zenfolio photographers website and enlarge to 300dpi",
     "Then You Can Download, Buy Prints, Oils or Print On t-shirts, cups etc.",
     "See Details Below.."
    ],
    buttonText: "Buy 10 Enlargements Now!",
    buttonVariant: "contained",
  },
   {
    title: "FlowerArchitect Scene Background (Venue) Tokens",
    tag:'Store 10 Scene Backgrounds',
      className:"yellow-card",
      icon: <div className="flex justify-center items-center "><div className="p-4 rounded-full bg-white my-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg></div></div>,
    price: "4.99",
    id: 1,
    type: "Each",
    paymentType: "recurring",
    priceId: "flw_basic_monthly",
    flowerArchitectId: "basicM",
    stripeId: "prod_Ikj1ZhNaTCiRsl",
    link:'https://buy.stripe.com/eVa03acuo1iy7ZufZ6',
    description: [
     "10 Additional Venue Storage Tokens on top of your membership storage token allotment.",
     "Each Token Stores a Venue (Scene Background Image) for as long as your membership is active.",

     "See Details Below.."
    ],
    buttonText: "Buy 10 Venue Tokens Now!",
    buttonVariant: "contained",
  },
   {
    title: "Flower Architect Email Quotation Tokens",
    tag:'50 Quotations Tokens',
      className:"red-card",
      icon: <div className="flex justify-center items-center "><div className="p-4 rounded-full bg-white my-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg></div></div>,
    price: "4.99",
    id: 1,
    type: "Each",
    paymentType: "recurring",
    priceId: "flw_basic_monthly",
    flowerArchitectId: "basicM",
    stripeId: "prod_Ikj1ZhNaTCiRsl",
    link:'https://buy.stripe.com/4gw2bidys0eubbG7sB',
    description: [
     "50 one time use Email Quotation Tokens on top of your membership storage token allotment.",
     "Send Request For Quotations with PDF including an Image of Your Arrangement, list of flower types, card details, etc",
"Also Includes Delivery Address and Special Details in Quote Request",
     "See Details Below.."
    ],
    buttonText: "Buy 50 Quotation Tokens Now!",
    buttonVariant: "contained",
  }
]
