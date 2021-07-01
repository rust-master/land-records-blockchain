import React, { Component } from "react";
import "./FrontSection.css";
import { Button } from "../../Button";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Slide from '@material-ui/core/Slide';
import Typography from "@material-ui/core/Typography";

import contract from "../../../build/contracts/Land.json"


const styles = (theme) => ({
  main: {
    position: "relative",
  },
  root1: {
    backgroundColor: "#fff",
    maxWidth: 930,
    marginTop: 10,
    position: "relative",
    marginLeft: 100,
  },
  Typo1: {
    color: "#266AFB",
    fontWeight: "bold",
    textAlign: "left",
  },
  Typo: {
    color: "#266AFB",
    fontWeight: "bold",
    textAlign: "center",
  },
  TypoP: {
    color: "#266AFB",
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
      itemsIds: [],
      itemsOwner: [],
      itemsValues: [],
      itemsCity: [],
      itemsMeasure: []
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const landCon = new web3.eth.Contract(contract.abi, "0x28252844a10ABE60B6C74A5AD1C66FCECfEc01f6")
    // const detail = await landCon.methods.properties(2001).call()
    // console.log("Detail: " + detail['currOwner'])


    const allLands = await landCon.methods.getAllDetails().call()


    for (const [index, value] of allLands['0'].entries()) {
      this.state.itemsIds.push(<h5 key={index}><font color="#266AFB">Land No: {value}</font></h5>)
    }

    for (const [index, value] of allLands['1'].entries()) {
      this.state.itemsValues.push(<h5 key={index}><font color="#266AFB">Value: {value} Ether</font></h5>)
    }

    for (const [index, value] of allLands['2'].entries()) {
      this.state.itemsOwner.push(<h5 key={index}><font color="#266AFB">Current Owner: {value}</font></h5>)
    }


    for (const [index, value] of allLands['3'].entries()) {
      this.state.itemsCity.push(<h5 key={index}><font color="#266AFB">City: {value}</font></h5>)
    }

    for (const [index, value] of allLands['4'].entries()) {
      this.state.itemsMeasure.push(<h5 key={index}><font color="#266AFB">Measurements: {value}</font></h5>)
    }

  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {

    const ids = this.state.itemsIds;
    const address = this.state.itemsOwner;
    const price = this.state.itemsValues;
    const city = this.state.itemsCity;
    const measure = this.state.itemsMeasure;

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
            {price.map((value, index) => {
              return (
                <Slide direction="left" in={true} timeout={1000} mountOnEnter unmountOnExit>
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
                            variant="h6"
                            component="h5"
                            className={classes.Typo1}

                          >
                            {ids[index]}
                          </Typography>

                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h5"
                            className={classes.Typo1}
                          >{address[index]}
                          </Typography>

                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h5"
                            className={classes.Typo1}
                            key={index}
                          >
                            {value}
                          </Typography>

                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h5"
                            className={classes.Typo1}

                          >
                            {city[index]}
                          </Typography>

                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h5"
                            className={classes.Typo1}

                          >
                          {measure[index]}
                          </Typography>
                      
                        </CardContent>
                      </CardActionArea>
                      {/* <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    width="140"
                    height="270"
                    image={logo}
                    title="Contemplative Reptile"
                  /> */}
                    </Card>
                  </div>
                </Slide>
              )
            })}
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
