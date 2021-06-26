import React, { Component } from "react";
import "./FrontSection.css";
import { Button } from "../../Button";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import logo from "../SearchProperty/decreasing.png";
import Typography from "@material-ui/core/Typography";

import Web3 from "web3";
import contract from "../../../build/contracts/Land.json"



const styles = (theme) => ({
  main: {
    position: "relative",
  },
  root1: {
    backgroundColor: "#fff",
    maxWidth: 445,
    position: "relative",
    marginLeft: 100,
  },
  Typo: {
    color: "#1C2237",
    fontWeight: "bold",
    textAlign: "center",
  },
  TypoP: {
    color: "#1C2237",
    textAlign: "center",
  },
});

class SearchProperty extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

  constructor(props) {
    super(props);
    this.state = {
      valueLand : "",
      ownerLands : "",
      alllands : "",
      ownerAdd : "",
    }
  }

  async loadBlockchainData(){
    const web3 = window.web3
    const landCon = new web3.eth.Contract(contract.abi, "0x41E2B02C09E82816a8c2ee1b2cdf312510a237Ec")
    const detail = await landCon.methods.properties(1).call()
    console.log("Detail: "+ detail['currOwner'])
    this.setState({valueLand: detail['value']})
    this.setState({ownerLands: detail['currOwner']})

    const allLands = await landCon.methods.getAllDetails().call()
    
    const items = []
    const itemsOwner = []

    for (const [index, value] of allLands['0'].entries()) {
      items.push(<h3 key={index}>{value} Ether</h3>)
    }
    this.setState({alllands: items})

    for (const [index, value] of allLands['1'].entries()) {
      itemsOwner.push(<p key={index}>{value}</p>)
    }
    this.setState({ownerAdd: itemsOwner})
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {


    const { classes } = this.props;
    return (
      <>


     
        <div
          className={false ? "home__hero-section" : "home__hero-section darkBg"}
        >
          <div className="container">
            <div
              className="row home__hero-row"
              style={{
                display: "flex",
                flexDirection: "" === "start" ? "row-reverse" : "row",
              }}
            >
              <div className="col">
                <div className="home__hero-text-wrapper">
                  <div className="top-line">{"Search Land to Buy"}</div>
                  <h1 className={true ? "heading" : "heading dark"}>
                    {"Optimized Search"}
                  </h1>
                  <div className="input-areas">
                    <form>
                      <input
                        className="footer-input"
                        name="text"
                        type="city"
                        placeholder="City"
                      />

                      <input
                        className="footer-input"
                        name="text"
                        type="propertyNo"
                        placeholder="Property No"
                      />

                      <Button buttonSize="btn--wide" buttonColor="blue">
                        Search
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="home__hero-img-wrapper">
                  <img
                    src={"images/svg-7.svg"}
                    alt={"Credit Card"}
                    className="home__hero-img"
                  />
                </div>
              </div>
            </div>
            <div className={classes.main}>
              <Card className={classes.root1}>
                <CardActionArea>
                  {/* <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    width="140"
                    height="270"
                    image={logo}
                    title="Contemplative Reptile"
                  /> */}
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h3"
                      component="h2"
                      className={classes.Typo}
                    >
                      {this.state.alllands[0]}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      className={classes.TypoP}
                    >
                      {this.state.ownerAdd[1]}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </div>
        </div>

      </>
    );
  }
}

function FrontSection({
  lightBg,
  topLine,
  lightText,
  headline,
  buttonLabel,
  form,
  img,
  alt,
  imgStart,
}) {
  if (form) {
    return <SearchProperty />;
  }

  return (
    <>
      <div
        className={lightBg ? "home__hero-section" : "home__hero-section darkBg"}
      >
        <div className="container">
          <div
            className="row home__hero-row"
            style={{
              display: "flex",
              flexDirection: imgStart === "start" ? "row-reverse" : "row",
            }}
          >
            <div className="col">
              <div className="home__hero-text-wrapper">
                <div className="top-line">{topLine}</div>
                <h1 className={lightText ? "heading" : "heading dark"}>
                  {headline}
                </h1>

                <Link to="/sign-up">
                  <Button buttonSize="btn--wide" buttonColor="blue">
                    {buttonLabel}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="home__hero-img-wrapper">
                <img src={img} alt={alt} className="home__hero-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withStyles(styles)(SearchProperty);
