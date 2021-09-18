import React, { Component } from "react";
import { Button } from "./Button";
import "./Property.css";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Web3 from "web3";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import contract from "../build/contracts/Land.json";

import ButtonCore from "@material-ui/core/Button";
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = (theme) => ({
  main: {
    position: "relative",
  },
  root1: {
    backgroundColor: "#fff",
    maxWidth: 840,
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

class Property extends Component {
  componentWillMount() {
    this.loadBlockchainData();
  }

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.state = {
      allAssets: [],
      ids: [],
      states: [],
      district: [],
      village: [],
      survyNo: [],
      marketValue: [],
      squareFoots: [],
      inches: [],
      ipfsHash: [],
      createdByGovt: [],
      currentOwner: [],
      khaataNumber: [],
      khaatoniNumber: [],
      landType: [],
      status: [],
      account: "",
      open: false,
      openi: false,
      openDialog: false,
      lat: "",
      lng: "",
      north: "",
      south: "",
      east: "",
      west: "",
      currentOwnerName: "",
      tempOwnerAddress: "",
    };
  }

  async myFunction(id, status) {
    if (status == false) {
      console.log("ID : " + id);
      console.log("Account: " + this.state.account);

      const web3 = window.web3;

      const netId = await web3.eth.net.getId();
      const deployedNetwork = contract.networks[netId];

      console.log(deployedNetwork.address);

      const landCon = new web3.eth.Contract(
        contract.abi,
        deployedNetwork.address
      );

      await landCon.methods
        .markAvailable(id)
        .send({ from: this.state.account });

      this.setState({ open: true });

      this.loadBlockchainData();
    } else {
      console.log("Status : " + status);
      console.log("ID : " + id);
      console.log("Account: " + this.state.account);

      const web3 = window.web3;

      const netId = await web3.eth.net.getId();
      const deployedNetwork = contract.networks[netId];

      console.log(deployedNetwork.address);

      const landCon = new web3.eth.Contract(
        contract.abi,
        deployedNetwork.address
      );

      await landCon.methods.unMarkLand(id).send({ from: this.state.account });

      this.setState({ open: true });

      this.loadBlockchainData();
      this.setState({ openi: true });
    }
  }

  async loadBlockchainData() {
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

    const assets = await landCon.methods
      .viewAssets()
      .call({ from: this.state.account });

    this.state.allAssets = assets;
    for (let i = 0; i <= assets.length; i++) {
      this.state.ids.push(assets[i]);
    }

    this.state.allAssets.map(async (value, index) => {
      const detail = await landCon.methods
        .landInfoOwner(this.state.ids[index])
        .call({ from: this.state.account });

      const remainignDetail = await landCon.methods
        .remainingDetail(this.state.ids[index])
        .call({ from: this.state.account });

      this.state.states.push(detail[0]);
      this.state.district.push(detail[1]);
      this.state.village.push(detail[2]);
      this.state.status.push(detail[3]);
      this.state.marketValue.push(detail[4]);
      this.state.squareFoots.push(detail[5]);
      this.state.inches.push(detail[6]);

      this.state.createdByGovt.push(remainignDetail[0]);
      this.state.currentOwner.push(remainignDetail[1]);
      this.state.khaataNumber.push(remainignDetail[3]);
      this.state.khaatoniNumber.push(remainignDetail[4]);
      this.state.landType.push(remainignDetail[5]);

      console.log("State: " + detail[0]);
      console.log("Destrict: " + detail[1]);
      console.log("Village: " + detail[2]);
      console.log("Status: " + detail[3]);
      console.log("Market Value: " + detail[4]);
      console.log("Square Feet: " + detail[5]);
      console.log("Inches: " + detail[6]);

      console.log("ipfsHash: " + remainignDetail[0]);
      console.log("createdByGovt: " + remainignDetail[1]);
      console.log("currentOwner: " + remainignDetail[2]);
      console.log("khaataNumber: " + remainignDetail[3]);
      console.log("khaatoniNumber: " + remainignDetail[4]);
      console.log("landType: " + remainignDetail[5]);

      console.log("---------------------------------");
    });
  }

  async viewDetail(id, tempAddress) {
    console.log("ID : " + id);

    this.state.lat = "";
    this.state.lng = "";
    this.state.north = "";
    this.state.south = "";
    this.state.east = "";
    this.state.west = "";
    this.state.ownerName = "";

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
      .remainingMoreDetail(id)
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

    this.setState({ openDialog: true });
  }

  handleClose(e, r) {
    if (r === "clickaway") {
      return;
    }

    this.setState({ open: false });
    this.setState({ openi: false });
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

    const dataAll = this.state.allAssets;
    const statesAll = this.state.states;
    const districtAll = this.state.district;
    const villageAll = this.state.village;
    const statusAll = this.state.status;
    const marketValueAll = this.state.marketValue;
    const squareFootsAll = this.state.squareFoots;
    const inchesAll = this.state.inches;
    const idsAll = this.state.ids;

    const ipfsAll = this.state.ipfsHash;
    const createdByGovtAll = this.state.createdByGovt;
    const currentOwnerAll = this.state.currentOwner;
    const khaataNumberAll = this.state.khaataNumber;
    const khaatoniNumberAll = this.state.khaatoniNumber;
    const landTypeAll = this.state.landType;

    let ListTemplate;

    if (dataAll.length) {
      ListTemplate = dataAll.map((value, index) => (
        <Slide
          direction="left"
          in={true}
          timeout={1500}
          mountOnEnter
          unmountOnExit
        >
          <div
            style={{
              maxWidth: "1030px",
              marginBottom: "60px",
              marginLeft: "5.5%",
            }}
          >
            <Card
              className={makeStyles({
                maxWidth: 345,
              })}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  className={classes.Typo1}
                >
                  <h5 style={{ textAlign: "center" }}>
                    Current Owner: {currentOwnerAll[index]}
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
                  <span>Square Foots: {squareFootsAll[index]}</span>
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
                  <span>Created By: {createdByGovtAll[index]}</span>
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
              <CardActions style={{ float: "left" }}>
                <Button
                  buttonSize="btn--wide"
                  buttonColor="blue"
                  onClick={this.viewDetail.bind(
                    this,
                    idsAll[index],
                    currentOwnerAll[index]
                  )}
                >
                  View Land at Map
                </Button>

                <Link
                  to={"/detail-of-land-by-owner/" + dataAll[index]}
                  style={{ marginLeft: "10px" }}
                >
                  <Button
                    buttonStyle="btn--primary"
                    buttonSize="btn--wide"
                    buttonColor="golden"
                  >
                    Detail of Land
                  </Button>
                </Link>
              </CardActions>
              <CardActions style={{ float: "right" }}>
                <Button
                  buttonSize="btn--wide"
                  buttonColor={statusAll[index] ? "red" : "blue"}
                  onClick={this.myFunction.bind(
                    this,
                    idsAll[index],
                    statusAll[index]
                  )}
                >
                  {statusAll[index] ? "Marked" : "Mark Available"}
                </Button>
              </CardActions>
            </Card>
          </div>
        </Slide>
      ));
    } else {
      ListTemplate = <div>Records Not Found</div>;
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
            <h1 className="pricing__heading">Properties</h1>

            {ListTemplate}

            <div>
              <Dialog
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
                    <span style={{ float: "right" }}>
                      Longitude: {this.state.lng}
                    </span>
                    <br />
                    <span>North: {this.state.north}</span>
                    <span style={{ float: "right" }}>
                      South: {this.state.south}
                    </span>
                    <br />
                    <span>East: {this.state.east}</span>
                    <span style={{ float: "right" }}>
                      West: {this.state.west}
                    </span>
                    <br />
                  </DialogContentText>
                  <div>
                    <MyMapComponent isMarkerShown={true} />
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button
                    buttonSize="btn--medium"
                    onClick={this.handleCloseDialog}
                    buttonColor="blue"
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>

            <Snackbar
              open={this.state.open}
              autoHideDuration={6000}
              onClose={this.handleClose}
            >
              <Alert onClose={this.handleClose} severity="success">
                Land Marked successfully.
              </Alert>
            </Snackbar>

            <Snackbar
              open={this.state.openi}
              autoHideDuration={6000}
              onClose={this.handleClose}
            >
              <Alert onClose={this.handleClose} severity="error">
                {"Already Marked"}
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Property);
