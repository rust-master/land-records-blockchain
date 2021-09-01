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

import ButtonCore from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Rectangle,
} from "react-google-maps";

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
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.state = {
      allIDs: [],
      states: [],
      district: [],
      village: [],
      owners: [],
      marketValue: [],
      squareFoots: [],
      inches: [],
      ipfsHash: [],
      landType: [],
      createdBy: [],
      placeHolder: "Loading Records",
      openDialog: false,
      lat: "",
      lng: "",
      north: "",
      south: "",
      east: "",
      west: "",
      ownerName: "",
      tempOwnerAddress: "",
    };
  }

  async loadBlockchainData() {
    this.state.allIDs = [];
    this.state.states = [];
    this.state.owners = [];
    this.state.district = [];
    this.state.marketValue = [];
    this.state.squareFoots = [];
    this.state.inches = [];
    this.state.ids = [];
    this.state.ipfsHash = [];
    this.state.landType = [];
    this.state.village = [];

    const web3 = window.web3;

    const webeProvider = new Web3(
      Web3.givenProvider || "http://localhost:7545"
    );
    const accounts = await webeProvider.eth.getAccounts();
    this.setState({ account: accounts[0] });
    console.log("Account: " + this.state.account);

    const netId = await web3.eth.net.getId();
    const deployedNetwork = contract.networks[netId];

    console.log(deployedNetwork.address);

    const landCon = new web3.eth.Contract(
      contract.abi,
      deployedNetwork.address
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
      this.state.createdBy.push(remainignDetail[1]);
      this.state.landType.push(remainignDetail[5]);

      console.log("ipfsHash: " + remainignDetail[0]);
      console.log("Landtype: " + remainignDetail[1]);
      console.log("createdBy: " + remainignDetail[2]);

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
      this.state.marketValue.push(detail[4]);
      this.state.squareFoots.push(detail[5]);
      this.state.inches.push(detail[6]);

      console.log("Owner: " + detail[0]);
      console.log("State: " + detail[1]);
      console.log("District: " + detail[2]);
      console.log("village: " + detail[3]);
      console.log("marketValue: " + detail[4]);
      console.log("squareFoots: " + detail[5]);
      console.log("Inches: " + detail[6]);

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

  async viewDetails(index, tempAddress) {
    console.log("index: " + index);
    console.log("tempAddress: " + tempAddress);

    this.state.lat = "";
    this.state.lng = "";
    this.state.north = "";
    this.state.south = "";
    this.state.east = "";
    this.state.west = "";
    this.state.ownerName = "";
    this.state.tempOwnerAddress = "";

    const web3 = window.web3;

    const webeProvider = new Web3(
      Web3.givenProvider || "http://localhost:7545"
    );
    const accounts = await webeProvider.eth.getAccounts();
    this.setState({ account: accounts[0] });
    console.log("Account: " + this.state.account);

    const netId = await web3.eth.net.getId();
    const deployedNetwork = contract.networks[netId];

    console.log(deployedNetwork.address);

    const landCon = new web3.eth.Contract(
      contract.abi,
      deployedNetwork.address
    );

    const detailMap = await landCon.methods
      .remainingMoreDetail(index)
      .call({ from: this.state.account });

    this.setState({ lat: parseFloat(detailMap[0]) });
    this.setState({ lng: parseFloat(detailMap[1]) });
    this.setState({ north: parseFloat(detailMap[2]) });
    this.setState({ south: parseFloat(detailMap[3]) });
    this.setState({ east: parseFloat(detailMap[4]) });
    this.setState({ west: parseFloat(detailMap[5]) });
    this.setState({ ownerName: detailMap[6] });

    this.setState({ tempOwnerAddress: tempAddress });

    console.log("Lat: " + detailMap[0]);
    console.log("Lng: " + detailMap[1]);
    console.log("North: " + detailMap[2]);
    console.log("South: " + detailMap[3]);
    console.log("East: " + detailMap[4]);
    console.log("West: " + detailMap[5]);
    console.log("OwnerName: " + detailMap[6]);

    this.setState({ openDialog: tempAddress });
  }

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
    console.log("handleCloseDialog");
  };

  handleClickOpen = () => {
    this.setState({ openDialog: true });
  };

  render() {
    const { classes } = this.props;

    const dataAll = this.state.allIDs;
    const statesAll = this.state.states;
    const districtAll = this.state.district;
    const villageAll = this.state.village;
    const ownersAll = this.state.owners;
    const measureAll = this.state.squareFoots;
    const inchesAll = this.state.inches;
    const marketValueAll = this.state.marketValue;
    const ipfsAll = this.state.ipfsHash;
    const landTypeAll = this.state.landType;
    const createdByAll = this.state.createdBy;

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
                  <span style={{ float: "right" }}>
                    State: {statesAll[index]}
                  </span>
                </Typography>

                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  className={classes.Typo1}
                >
                  <span>District: {districtAll[index]}</span>{" "}
                  <span style={{ float: "right" }}>
                    Village/Town: {villageAll[index]}
                  </span>
                </Typography>

                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  className={classes.Typo1}
                >
                  <span>Square Foots: {measureAll[index]}</span>
                  {" | "}
                  <span>Inches: {inchesAll[index]}</span>
                  <span style={{ float: "right" }}>
                    Land Type: {landTypeAll[index]}
                  </span>
                </Typography>

                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  className={classes.Typo1}
                >
                  <span>Created By: {createdByAll[index]}</span>
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

                <span style={{ float: "right", marginBottom: "20px" }}>
                  <ButtonCore
                    variant="outlined"
                    color="primary"
                    onClick={this.viewDetails.bind(this, dataAll[index], ownersAll[index])}
                  >
                    View Detail
                  </ButtonCore>
                </span>
              </CardContent>
              {/* </CardActionArea> */}
            </Card>
          </div>
        </Slide>
      ));
    } else {
      ListTemplate = <div> {this.state.placeHolder} </div>;
    }

    const bounds = {
      north: this.state.north,
      south: this.state.south,
      east: this.state.east,
      west: this.state.west,
    };

    const MyMapComponent = compose(
      withProps({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
    )((props) => (
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
      >
        <Rectangle bounds={bounds} />
      </GoogleMap>
    ));

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

            <div>
              <Dialog
              style={{width: "800px"}}
                open={this.state.openDialog}
                onClose={this.handleCloseDialog}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Detail of Land</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                  <div>Owner Address: {this.state.tempOwnerAddress}</div>
                    <div>Name of Land Owner: {this.state.ownerName}</div>
                    <span>Latitude: {this.state.lat}</span>
                    <span style={{float: "right"}}>Longitude: {this.state.lng}</span>
                    <div>North: {this.state.north}</div>
                    <div>South: {this.state.south}</div>
                    <div>East: {this.state.east}</div>
                    <div>West: {this.state.west}</div>
                  </DialogContentText>
                  <div>
                    <MyMapComponent isMarkerShown={true} />
                  </div>
                </DialogContent>
                <DialogActions>
                  <ButtonCore onClick={this.handleCloseDialog} color="primary">
                    Cancel
                  </ButtonCore>
                  <Button
                    buttonSize="btn--medium"
                    onClick={this.addPolylineData}
                    buttonColor="blue"
                  >
                    Export PDF
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
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
