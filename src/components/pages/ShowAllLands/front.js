import React, { Component } from "react";
import "./FrontSection.css";
import { Button } from "../../Button";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import logo from "../SearchProperty/home.png";

import Web3 from "web3";
import contract from "../../../build/contracts/Land.json";

import xtype from "xtypejs";

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
  TypoSt: {
    color: "#F00946",
    fontWeight: "bold",
    textAlign: "center",
  },
  TypoP: {
    color: "#266AFB",
    textAlign: "center",
  },
});

class ShowAllLands extends Component {
  componentWillMount() {
    this.loadBlockchainData();
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      allIDs: [],
      states: [],
      district: [],
      village: [],
      surveyNo: [],
      owners: [],
      marketValue: [],
      measure: [],
      ipfsHash: [],
      landType: [],
      placeHolder: "Loading Records",
    };
  }

  async loadBlockchainData() {
    this.state.allIDs = [];
    this.state.states = [];
    this.state.owners = [];
    this.state.district = [];
    this.state.marketValue = [];
    this.state.measure = [];
    this.state.ids = [];
    this.state.ipfsHash = [];
    this.state.landType = [];

    this.state.village = [];
    this.state.surveyNo = [];

    const web3 = window.web3;

    const webeProvider = new Web3(
      Web3.givenProvider || "http://localhost:7545"
    );
    const accounts = await webeProvider.eth.getAccounts();
    this.setState({ account: accounts[0] });
    console.log("Account: " + this.state.account);

    const landCon = new web3.eth.Contract(
      contract.abi,
      "0xF72Be9337B25e92FED161dA1cbfe05777719ec7A"
    );

    const allLandsIDs = await landCon.methods
      .getAllLands()
      .call({ from: this.state.account });

    this.state.allIDs = allLandsIDs;
    console.log("IDs", allLandsIDs);

    this.state.allIDs.map(async (value, index) => {
      const remainignDetail = await landCon.methods
        .remainingDetail(this.state.allIDs[index])
        .call({ from: this.state.account });

      this.state.ipfsHash.push(remainignDetail[0]);
      this.state.landType.push(remainignDetail[1]);

      console.log("ipfsHash: " + remainignDetail[0]);
      console.log("landType: " + remainignDetail[1]);

      console.log("---------------------------------");
    });

    this.state.allIDs.map(async (value, index) => {
      const detail = await landCon.methods
        .showAllLands(this.state.allIDs[index])
        .call({ from: this.state.account });


      this.state.owners.push(detail[0]);
      this.state.states.push(detail[1]);
      this.state.district.push(detail[2]);
      this.state.village.push(detail[3]);
      this.state.surveyNo.push(detail[4]);
      this.state.marketValue.push(detail[5]);
      this.state.measure.push(detail[6]);
   

      console.log("Owner: " + detail[0]);
      console.log("State: " + detail[1]);
      console.log("District: " + detail[2]);
      console.log("village: " + detail[3]);
      console.log("surveyNo: " + detail[4]);
      console.log("marketValue: " + detail[5]);
      console.log("Mesaurment: " + detail[6]);

      console.log("---------------------------------");
    });

    if (this.state.states.length <= 0) {
      this.setState({ placeHolder: "Record Not Found" });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { classes } = this.props;

    const dataAll = this.state.allLandsIDs;
    const statesAll = this.state.states;
    const districtAll = this.state.district;
    const villageAll = this.state.village;
    const surveyNoAll = this.state.surveyNo;
    const ownersAll = this.state.owners;
    const measureAll = this.state.measure;
    const marketValueAll = this.state.marketValue;
    const ipfsAll = this.state.ipfsHash;
    const landTupeAll = this.state.landType;

    let ListTemplate;

    console.log("Length", statesAll.length);

    if (statesAll.length) {
      ListTemplate = dataAll.map((value, index) => (
        <Slide
          direction="left"
          in={true}
          timeout={1000}
          mountOnEnter
          unmountOnExit
        >
          <div
            className={classes.main}
            style={{ marginBottom: "40px", marginLeft: "2.5%" }}
          >
            <Card className={classes.root1}>
              {/* <CardActionArea> */}
              <CardMedia
                component="img"
                alt="Image Loading....."
                width="1030"
                height="550"
                image={`https://ipfs.io/ipfs/${ipfsAll[index]}`}
                title={`${ipfsAll[index]}`}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  className={classes.Typo1}
                >
                  <h5 style={{ textAlign: "center" }}>
                    Current Owner: {ownersAll[index]}
                  </h5>
                </Typography>

                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  className={classes.Typo1}
                >
                  <span style={{ color: "#EF8E19" }}>
                    Property ID: {dataAll[index]}
                  </span>{" "}
                  <span style={{ float: "right", color: "#EF8E19" }}>
                    Survery No: {surveyNoAll[index]}
                  </span>
                </Typography>

                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  className={classes.Typo1}
                >
                  <span>State: {statesAll[index]}</span>{" "}
                  <span style={{ float: "right" }}>
                    District: {districtAll[index]}
                  </span>
                </Typography>

                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  className={classes.Typo1}
                >
                  <span>Village/Town: {villageAll[index]}</span>{" "}
                  <span style={{ float: "right" }}>
                    Measurements: {measureAll[index]}
                  </span>
                </Typography>

                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  className={classes.Typo1}
                >
                  <span>Land Type: {landTupeAll[index]}</span>
                </Typography>

                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  className={classes.Typo1}
                >
                  <h2 style={{ color: "#00AEE6", textAlign: "center" }}>
                    Market Value: {marketValueAll[index]}
                  </h2>
                </Typography>
              </CardContent>
              {/* </CardActionArea> */}
            </Card>
          </div>
        </Slide>
      ));
    } else {
      ListTemplate = <div> {this.state.placeHolder} </div>;
    }

    return (
      <div>
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
              <div className="home__hero-text-wrapper">
                <div className="top-line">
                  {"Registered Lands by Goverment"}
                </div>
                <h1 className={true ? "heading" : "heading dark"}>
                  {"All Registered Lands"}
                </h1>
              </div>
            </div>

            {ListTemplate}
          </div>
        </div>
      </div>
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
    return <ShowAllLands />;
  }

  return (
    <div>
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
    </div>
  );
}

export default withStyles(styles)(ShowAllLands);
