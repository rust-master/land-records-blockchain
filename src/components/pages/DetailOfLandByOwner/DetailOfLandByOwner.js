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
  PDFDownloadLink,
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

class DetailOfLandByOwner extends Component {
  componentWillMount() {
    this.loadBlockchainData();
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.state = {
      allIDs: "",
      states: "",
      district: "",
      village: "",
      owners: "",
      marketValue: "",
      squareFoots: "",
      inches: "",
      ipfsHash: "",
      landType: "",
      createdBy: "",
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
      khataNumber: "",
      khatooniNumber: "",
      previousOwner: "",
      lati: "",
      lngi: "",
      northi: "",
      southi: "",
      easti: "",
      westi: "",
      ownerNamei: "",
    };
  }

  async loadBlockchainData() {
    this.state.Id = "";
    this.state.states = "";
    this.state.owners = "";
    this.state.district = "";
    this.state.marketValue = "";
    this.state.squareFoots = "";
    this.state.inches = "";
    this.state.landType = "";
    this.state.village = "";
    this.state.createdBy = "";
    this.state.khataNumber = "";
    this.state.khatooniNumber = "";
    this.state.previousOwner = "";
    this.state.lati = "";
    this.state.lngi = "";
    this.state.northi = "";
    this.state.southi = "";
    this.state.easti = "";
    this.state.westi = "";
    this.state.ownerNamei = "";

    console.log("Passed ID: " + this.props.match.params.id);

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

    const remainignDetail = await landCon.methods
      .remainingDetail(this.props.match.params.id)
      .call({ from: this.state.account });

    this.setState({ createdBy: remainignDetail[0] });
    this.setState({ previousOwner: remainignDetail[2] });
    this.setState({ khataNumber: remainignDetail[3] });
    this.setState({ khatooniNumber: remainignDetail[4] });
    this.setState({ landType: remainignDetail[5] });

    console.log("Created By: " + this.state.createdBy);
    console.log("Previous Owner: " + this.state.previousOwner);
    console.log("Khata Number: " + this.state.khataNumber);
    console.log("Khatooni Number: " + this.state.khatooniNumber);
    console.log("landType", this.state.landType);

    console.log("---------------------------------");

    const detailMap = await landCon.methods
      .remainingMoreDetail(this.props.match.params.id)
      .call({ from: this.state.account });

    this.setState({ lati: detailMap[0] });
    this.setState({ lngi: detailMap[1] });
    this.setState({ northi: detailMap[2] });
    this.setState({ southi: detailMap[3] });
    this.setState({ easti: detailMap[4] });
    this.setState({ westi: detailMap[5] });
    this.setState({ ownerNamei: detailMap[6] });

    this.setState({ Id: this.props.match.params.id });

    console.log("lati", detailMap[0]);
    console.log("lngi", detailMap[1]);
    console.log("northi", detailMap[2]);
    console.log("southi", detailMap[3]);
    console.log("easti", detailMap[4]);
    console.log("westi", detailMap[5]);
    console.log("ownerNamei", detailMap[6]);

    console.log("---------------------------------");

    const detail = await landCon.methods
      .showAllLands(this.props.match.params.id)
      .call({ from: this.state.account });

    this.setState({ owners: detail[0] });
    this.setState({ states: detail[1] });
    this.setState({ district: detail[2] });
    this.setState({ village: detail[3] });
    this.setState({ marketValue: detail[4] });
    this.setState({ squareFoots: detail[5] });
    this.setState({ inches: detail[6] });

    console.log("Owner: " + detail[0]);
    console.log("State: " + detail[1]);
    console.log("District: " + detail[2]);
    console.log("village: " + detail[3]);
    console.log("marketValue: " + detail[4]);
    console.log("squareFoots: " + detail[5]);
    console.log("Inches: " + detail[6]);

    console.log("---------------------------------");

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

    const MyDocument = () => (
      <Document>
        <Page size="A4" style={stylesPDF.page}>
          <View style={stylesPDF.centertitle}>
            <Image
              src={{
                uri: `https://i.ibb.co/Db0nCmX/BLRS-LOGO.png`,
              }}
              style={stylesPDF.stampTitle}
            />
            <Text style={stylesPDF.title}>Blockchain Land Records System</Text>
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
            <Text style={stylesPDF.text}>State: {this.state.states}</Text>
            <Text style={stylesPDF.text}>District: {this.state.district}</Text>
            <Text style={stylesPDF.text}>Village: {this.state.village}</Text>
            <Text style={stylesPDF.text}>
              Khata No: {this.state.khataNumber}
            </Text>
            <Text style={stylesPDF.text}>
              Khatooni No: {this.state.khatooniNumber}
            </Text>
            <Text style={stylesPDF.text}>
              Market Value: {this.state.marketValue} Ether
            </Text>
            <Text style={stylesPDF.text}>
              Square Foots: {this.state.squareFoots}
            </Text>
            <Text style={stylesPDF.text}>Inches: {this.state.inches}</Text>
            <Text style={stylesPDF.text}>Land ID: {this.state.Id}</Text>
            <Text style={stylesPDF.text}>Land Type: {this.state.landType}</Text>
            <Text style={stylesPDF.text}>Latitude: {this.state.lati}</Text>
            <Text style={stylesPDF.text}>Longitude: {this.state.lngi}</Text>
            <Text style={stylesPDF.text}>North: {this.state.northi}</Text>
            <Text style={stylesPDF.text}>South: {this.state.southi}</Text>
            <Text style={stylesPDF.text}>East: {this.state.easti}</Text>
            <Text style={stylesPDF.text}>West: {this.state.westi}</Text>
          </View>
          <View style={stylesPDF.section}>
            <Text style={stylesPDF.heading2}>Owner Detail</Text>
            <Text style={stylesPDF.text}>
              Owner Name: {this.state.ownerNamei}
            </Text>
            <Text style={stylesPDF.text}>
              Owner Address: {this.state.owners}
            </Text>
            <Text style={stylesPDF.text}>
              Previous Owner: {this.state.previousOwner}
            </Text>
            <Text style={stylesPDF.text}>
              Created By: {this.state.createdBy}
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
    );

    let ListTemplate;

    console.log("Land ID", this.state.Id);

    if (this.state.Id != "") {
      ListTemplate = (
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
                  <MyDocument />
                </PDFViewer>
                <span style={{ float: "right", marginBottom: "20px" }}>
                  <ButtonCore variant="contained" color="secondary">
                    <PDFDownloadLink
                      document={<MyDocument />}
                      fileName={`Land_${this.state.Id}_${this.state.ownerNamei}_${this.state.khataNumber}_${this.state.khatooniNumber}.pdf`}
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? "Loading document..." : "Download now!"
                      }
                    </PDFDownloadLink>
                  </ButtonCore>

                  <ButtonCore
                    style={{ marginLeft: "10px" }}
                    variant="outlined"
                    color="primary"
                    onClick={this.viewDetails.bind(
                      this,
                      this.state.Id,
                      this.state.owners
                    )}
                  >
                    View Detail
                  </ButtonCore>
                </span>
              </CardContent>
            </Card>
          </div>
        </Slide>
      );
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
                <div className="top-line">{"Registered Land by Goverment"}</div>
                <h1 className={true ? "heading" : "heading dark"}>
                  {"Registered Land Detail"}
                </h1>
                <Link to={"/properties"}>
                  <Button
                    buttonStyle="btn--primary"
                    buttonSize="btn--medium"
                    buttonColor="blue"
                  >
                    &#x2B05;{" Back"}
                  </Button>
                </Link>
              </div>
            </div>

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
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DetailOfLandByOwner);
