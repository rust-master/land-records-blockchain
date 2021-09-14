import React, { Component } from "react";
import "./FrontSection.css";
import { Button } from "../../Button";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Slide from "@material-ui/core/Slide";

import Web3 from "web3";
import contract from "../../../build/contracts/Land.json";

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

import {
  Image,
  Svg,
  Line,
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const stylesPDF = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#e5be84",
  },
  section: {
    marginLeft: 10,
    paddingLeft: 10,
  },
  title: {
    marginLeft: 10,
    fontSize: "26px",
    fontWeight: "bold",
    color: "#000",
  },
  centertitle: {
    flexDirection: "row",
    marginTop: "20px",
    marginLeft: "12%",
    alignItems: "center",
  },
  stampTitle: {
    width: "50px",
    height: "50px",
  },
  heading1: {
    fontSize: "22px",
    fontWeight: "bold",
    fontStyle: "bold",
    marginBottom: "5px",
    marginTop: "5px",
  },
  heading2: {
    fontSize: "22px",
    fontWeight: "bold",
    fontStyle: "bold",
    marginBottom: "5px",
    marginTop: "5px",
  },
  text: {
    margin: "5px",
    fontSize: "16px",
  },
  rightStamp: {
    width: "100px",
    height: "100px",
    marginBottom: "10px",
    marginLeft: "350px",
  },
  leftStamp: {
    width: "100px",
    height: "100px",
    marginBottom: "10px",
    marginLeft: "20px",
  },
  row: {
    flexDirection: "row",
    marginTop: "10px",
  },
});

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
});

class DetailOfLand extends Component {
  // componentWillMount() {
  //   this.loadBlockchainData();
  // }

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
      khataNumber: [],
      khatooniNumber: [],
      previousOwner: [],
      lati: [],
      lngi: [],
      northi: [],
      southi: [],
      easti: [],
      westi: [],
      ownerNamei: [],
    };
  }

  alertMessage(){
    console.log("Passed ID: " + this.props.match.params.id);
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

      this.state.createdBy.push(remainignDetail[0]);
      this.state.previousOwner.push(remainignDetail[2]);
      this.state.khataNumber.push(remainignDetail[3]);
      this.state.khatooniNumber.push(remainignDetail[4]);
      this.state.landType.push(remainignDetail[5]);

      console.log("landType", remainignDetail[5]);

      console.log("---------------------------------");
    });

    this.state.allIDs.map(async (value, index) => {
      const detailMap = await landCon.methods
        .remainingMoreDetail(this.state.allIDs[index])
        .call({ from: this.state.account });

      this.state.lati.push(detailMap[0]);
      this.state.lngi.push(detailMap[1]);
      this.state.northi.push(detailMap[2]);
      this.state.southi.push(detailMap[3]);
      this.state.easti.push(detailMap[4]);
      this.state.westi.push(detailMap[5]);
      this.state.ownerNamei.push(detailMap[6]);

      console.log("lati", detailMap[0]);
      console.log("lngi", detailMap[1]);
      console.log("northi", detailMap[2]);
      console.log("southi", detailMap[3]);
      console.log("easti", detailMap[4]);
      console.log("westi", detailMap[5]);
      console.log("ownerNamei", detailMap[6]);
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

    this.setState({ openDialog: true });
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
    const landTypeAll = this.state.landType;
    const createdByAll = this.state.createdBy;
    const khataNumberAll = this.state.khataNumber;
    const khatooniNumberAll = this.state.khatooniNumber;
    const previousOwnerAll = this.state.previousOwner;
    const latAll = this.state.lati;
    const lngAll = this.state.lngi;
    const northAll = this.state.northi;
    const southAll = this.state.southi;
    const eastAll = this.state.easti;
    const westAll = this.state.westi;
    const ownerNameAll = this.state.ownerNamei;

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
              <CardContent>
                <PDFViewer
                  style={{
                    width: "100%",
                    height: "1200px",
                  }}
                >
                  <Document>
                    <Page size="A4" style={stylesPDF.page}>
                      <View style={stylesPDF.centertitle}>
                        <Image
                          src={{
                            uri: `https://i.ibb.co/Db0nCmX/BLRS-LOGO.png`,
                          }}
                          style={stylesPDF.stampTitle}
                        />
                        <Text style={stylesPDF.title}>
                          Blockchain Land Records System
                        </Text>
                      </View>
                      <Svg
                        height="15"
                        width="550"
                        style={{ marginTop: "10px", alignSelf: "center" }}
                      >
                        <Line
                          x1="0"
                          y1="0"
                          x2="550"
                          y2="0"
                          strokeWidth={4}
                          stroke="#123d61"
                        />
                      </Svg>
                      <View style={stylesPDF.section}>
                        <Text style={stylesPDF.heading1}>Land Detail</Text>
                        <Text style={stylesPDF.text}>
                          State: {statesAll[index]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          District: {districtAll[index]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          Village: {villageAll[index]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          Khata No: {khataNumberAll[index]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          Khatooni No: {khatooniNumberAll[index]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          Market Value: {marketValueAll[index]} Ether
                        </Text>
                        <Text style={stylesPDF.text}>
                          Square Foots: {measureAll[index]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          Inches: {inchesAll[index]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          Land ID: {dataAll[index]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          Land Type: {landTypeAll[index]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          Latitude: {latAll[index]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          Longitude: {lngAll[index]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          North: {northAll[index]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          South: {southAll[index]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          East: {eastAll[index]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          West: {westAll[index]}
                        </Text>
                      </View>
                      <View style={stylesPDF.section}>
                        <Text style={stylesPDF.heading2}>Owner Detail</Text>
                        <Text style={stylesPDF.text}>
                          Owner Name: {ownerNameAll[index]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          Owner Address: {ownersAll[index]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          Previous Owner: {previousOwnerAll[index]}
                        </Text>
                        <Text style={stylesPDF.text}>
                          Created By: {createdByAll[index]}
                        </Text>
                      </View>
                      <View style={stylesPDF.row}>
                        <Image
                          src={{
                            uri: `https://i.ibb.co/rdMH7Mv/Only-Goverment.png`,
                          }}
                          style={stylesPDF.leftStamp}
                        />

                        <Image
                          src={{
                            uri: `https://i.ibb.co/Db0nCmX/BLRS-LOGO.png`,
                          }}
                          style={stylesPDF.rightStamp}
                        />
                      </View>
                    </Page>
                  </Document>
                </PDFViewer>

                <span style={{ float: "right", marginBottom: "20px" }}>
                  <ButtonCore
                    variant="outlined"
                    color="primary"
                    onClick={this.viewDetails.bind(
                      this,
                      dataAll[index],
                      ownersAll[index]
                    )}
                  >
                    View Detail
                  </ButtonCore>
                </span>
              </CardContent>
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

            <button onClick={()=>{this.alertMessage()}}>click me to see log</button>

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


export default withStyles(styles)(DetailOfLand);
