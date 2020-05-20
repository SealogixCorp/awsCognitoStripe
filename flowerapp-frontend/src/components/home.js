import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Image from "material-ui-image";
import axios from "axios";
import NavBar from "./Appbar";
import Footer from "./Footer";
import { monthlyDeal, arrangementDeals } from "../core/products";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.flowerarchitect.club">
        www.flowerarchitect.club
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none"
    }
  },
  appBar: {},
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2)
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6)
    }
  }
}));

export default () => {
  const classes = useStyles();
  const [product, setProduct] = useState({
    name: "Flower bouquet",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRS2A1ZNYahTtgaHpGKyOvc9kQzBlsVxK9_k5oEtP0c6I54ng0B&usqp=CAU",
    productBy: "Sealogix",
    descripton: "Some description",
    price: 10
  });

  async function makePayment(token, addresses) {
    const response = await axios.post(
      "https://myflowerarchitect.com/account/checkout",
      { token, product }
    );
    const { status } = response.data;
    if (status === "succeeded") {
      console.log("Success! Check email for details");
    } else {
      console.log("Something went wrong");
    }
  }
  const renderItem = deal => (
    <Grid
      item
      key={deal.title}
      xs={12}
      sm={deal.title === "Enterprise" ? 12 : 6}
      md={12}
      style={{ marginBottom: "1em" }}
    >
      <Card>
        <CardHeader
          title={deal.title}
          subheader={deal.subheader}
          titleTypographyProps={{ align: "center" }}
          subheaderTypographyProps={{ align: "center" }}
          action={deal.title === "Pro" ? <StarIcon /> : null}
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
            {deal.description.map(line => (
              <Typography
                component="li"
                variant="subtitle1"
                align="center"
                key={line}
              >
                {line}
              </Typography>
            ))}
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
            stripeKey="pk_test_P9SL6JXjtpSUTyNCUFTmWSpD"
          >
            <Button
              component="div"
              fullWidth
              variant={deal.buttonVariant}
              color="primary"
              onClick={() => {
                setProduct(product);
              }}
            >
              {deal.buttonText} {deal.price} $
            </Button>
          </StripeCheckout>
        </CardActions>
      </Card>
    </Grid>
  );
  return (
    <React.Fragment>
      <NavBar />
      <Container maxWidth="xl" style={{ paddingTop: "2em" }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            {monthlyDeal.map((deal, key) => {
              return renderItem(deal);
              // Enterprise card is full width at sm breakpoint
            })}
          </Grid>
          <Grid item xs={6}>
            <Typography
              component="h3"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Click to create Arrangements
              <Link
                href="http://arranger.s3-website.us-west-2.amazonaws.com/index.html"
                target="_blank"
                rel="noopener"
                color="inherit"
              >
                <Image src="data:image/jpeg;base64,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" />
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            {arrangementDeals.map((deal, key) => {
              return renderItem(deal);
              // Enterprise card is full width at sm breakpoint
            })}
          </Grid>
        </Grid>
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end"></Grid>
        </Container>
        {/* Footer */}
      <Footer>
<Copyright />
      </Footer>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
};
