import React,{useState} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Image from 'material-ui-image'
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.flowerarchitect.club">
        www.flowerarchitect.club
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {

  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));



export default () => {
  const classes = useStyles();
  const [product, setProduct] = useState({
    name:"Flower bouquet",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRS2A1ZNYahTtgaHpGKyOvc9kQzBlsVxK9_k5oEtP0c6I54ng0B&usqp=CAU",
    productBy:"Sealogix",
    descripton: "Some description",
    price:10
  })
  const monthlyDeal = [
    {
      title: 'Basic Monthly',
      price: '5.95',
      description: ['1000+ Flower Library', '25 Arrangements stored', '5 Baskets stored', 'Full Sample Basket set'],
      buttonText: 'BUY',
      buttonVariant: 'contained',
    },
    {
      title: 'Designer Monthly',
      subheader: 'Most popular',
      price: '9.95',
      description: ['1000+ Flower Library', '25 Arrangements stored', '5 Baskets stored', 'Full Sample Basket set'],
      buttonText: 'BUY',
      buttonVariant: 'contained',
    },
    {
      title: 'Enterprise Monthly',
      price: '49.95',
      description: ['1000+ Flower Library', '25 Arrangements stored', '5 Baskets stored', 'Full Sample Basket set'],
      buttonText: 'BUY',
      buttonVariant: 'contained',
    },
  ];
  const arrangementDeals = [
    {
      title: 'Enlargement',
      price: '9.95',
      description: ['1000+ Flower Library', '25 Arrangements stored', '5 Baskets stored', 'Full Sample Basket set'],
      buttonText: 'BUY',
      buttonVariant: 'contained',
    },
    {
      title: 'Arrangement Storage Additional',
      subheader: 'Most popular',
      price: '4.95',
      description: ['1000+ Flower Library', '25 Arrangements stored', '5 Baskets stored', 'Full Sample Basket set'],
      buttonText: 'BUY',
      buttonVariant: 'contained',
    },
    {
      title: 'Basket Storage Additional',
      price: '4.95',
      description: ['1000+ Flower Library', '25 Arrangements stored', '5 Baskets stored', 'Full Sample Basket set'],
      buttonText: 'BUY',
      buttonVariant: 'contained',
    },
    {
      title: 'Email Additional',
      price: '4.95',
      description: ['1000+ Flower Library', '25 Arrangements stored', '5 Baskets stored', 'Full Sample Basket set'],
      buttonText: 'BUY',
      buttonVariant: 'contained',
    },
  ];
  const footers = [
    {
      title: 'Company',
      description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
      title: 'Features',
      description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
    },
    {
      title: 'Resources',
      description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
      title: 'Legal',
      description: ['Privacy policy', 'Terms of use'],
    },
  ];
  async function makePayment(token, addresses) {

   console.log(token, product);
   const response = await axios.post(
     "https://myflowerarchitect.com/account/checkout",
     { token, product }
   );
   console.log(response);
   const { status } = response.data;
   console.log("Response:", response.data);
   if (status === "succeeded") {
    console.log("Success! Check email for details");
   } else {
     console.log("Something went wrong");
   }
 };
 const renderItem = (deal)=>(
   <Grid item key={deal.title} xs={12} sm={deal.title === 'Enterprise' ? 12 : 6} md={12} style={{marginBottom:"1em"}} >
     <Card>
       <CardHeader
         title={deal.title}
         subheader={deal.subheader}
         titleTypographyProps={{ align: 'center' }}
         subheaderTypographyProps={{ align: 'center' }}
         action={deal.title === 'Pro' ? <StarIcon /> : null}
         className={classes.cardHeader}
       />
       <CardContent>
         <div className={classes.cardPricing}>
           <Typography component="h2" variant="h3" color="textPrimary">
             ${deal.price}
           </Typography>
           <Typography variant="h6" color="textSecondary">
             /mo
           </Typography>
         </div>
         <ul>
           {deal.description.map((line) =>
             <Typography component="li" variant="subtitle1" align="center" key={line}>
               {line}
             </Typography>
           )}
         </ul>
       </CardContent>
       <CardActions>
       <StripeCheckout
        ComponentClass="div"
          shippingAddress
          billingAddress
          name={deal.name}
          description={deal.descripton} // the pop-in header subtitle
          image={product.image}
          token={makePayment}
          amount={deal.price * 100} // cents
          currency="USD"
          stripeKey="pk_test_P9SL6JXjtpSUTyNCUFTmWSpD" >
          <Button component="div" fullWidth variant={deal.buttonVariant} color="primary" onClick={()=>{
            setProduct(product);
          }} >

           {deal.buttonText} {deal.price} $
       </Button>
          </StripeCheckout>
       </CardActions>
     </Card>
   </Grid>
 )
  return (
    <React.Fragment>
    <Container maxWidth="xl" style={{paddingTop:"2em"}} >
    <Grid container spacing={3}>
       <Grid item xs={3} >
       {monthlyDeal.map((deal,key) =>{
         return renderItem(deal)
         // Enterprise card is full width at sm breakpoint

       })}
       </Grid>
       <Grid item xs={6}>
       <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
         Click to create Arrangements
         <Link href="http://arranger.s3-website.us-west-2.amazonaws.com/index.html" target="_blank" rel="noopener" color="inherit">
         <Image
        src="/bou.jpg"
      />
     </Link>
       </Typography>
       </Grid>
       <Grid item xs={3}>
       {arrangementDeals.map((deal,key) =>{
         return renderItem(deal)
         // Enterprise card is full width at sm breakpoint

       })}
       </Grid>
     </Grid>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
        </Grid>
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) =>
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          )}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}
