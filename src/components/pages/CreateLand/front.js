import React, { Component } from "react";
import "./FrontSection.css";
import { Button } from "../../Button";
import { Link } from "react-router-dom";
import Web3 from "web3";
import contract from "../../../build/contracts/Land.json";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import ButtonCore from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import districts from "./district.json";

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

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#e5be84",
  },
  section: {
    margin: 10,
    padding: 10,
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
    marginBottom: "10px",
    marginTop: "20px",
  },
  heading2: {
    fontSize: "22px",
    fontWeight: "bold",
    fontStyle: "bold",
    marginBottom: "10px",
  },
  text: {
    margin: "5px",
    fontSize: "16px",
  },
  rightStamp: {
    marginBottom: "10px",
    alignItems: "center",
    marginLeft: "75%",
  },
  stamp: {
    width: "100px",
    height: "100px",
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class CreateLand extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.addPolylineData = this.addPolylineData.bind(this);
    this.addData = this.addData.bind(this);
    this.state = {
      account: "",
      states: "",
      district: "",
      village: "",
      khataNumber: "",
      khatooniNumber: "",
      CurrentOwner: "",
      ownerName: "",
      previousOwner: "",
      marketValue: "",
      squareFoots: "",
      inches: "",
      landType: "",
      open: false,
      success: "",
      openi: false,
      errori: "",
      openDialog: false,
      lat: "",
      lng: "",
      north: "",
      south: "",
      east: "",
      west: "",
    };
  }

  async addData() {
    // check conditon for all the fields
    if (
      this.state.states === "" ||
      this.state.district === "" ||
      this.state.village === "" ||
      this.state.khataNumber === "" ||
      this.state.khatooniNumber === "" ||
      this.state.CurrentOwner === "" ||
      this.state.ownerName === "" ||
      this.state.previousOwner === "" ||
      this.state.marketValue === "" ||
      this.state.squareFoots === "" ||
      this.state.inches === "" ||
      this.state.landType === ""
    ) {
      this.setState({
        openi: true,
        errori: "Please fill all the fields",
      });
    } else {
      try {
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

        console.log("CurrentOwner: " + this.state.CurrentOwner);
        console.log("ownerName: " + this.state.ownerName);
        console.log("state: " + this.state.states);
        console.log("district: " + this.state.district);
        console.log("village: " + this.state.village);
        console.log("khataNumber: " + this.state.khataNumber);
        console.log("khatooniNumber: " + this.state.khatooniNumber);
        console.log("marketValue: " + this.state.marketValue);
        console.log("squareFoots: " + this.state.squareFoots);
        console.log("inches: " + this.state.inches);
        console.log("landType: " + this.state.landType);

        await landCon.methods
          .Registration(
            this.state.states,
            this.state.district,
            this.state.village,
            this.state.khataNumber,
            this.state.khatooniNumber,
            this.state.CurrentOwner,
            this.state.ownerName,
            this.state.previousOwner,
            this.state.marketValue,
            this.state.squareFoots,
            this.state.inches,
            this.state.landType,
            this.state.account
          )
          .send({ from: this.state.account });

        this.setState({ openDialog: true });
        this.setState({ open: true });
        this.setState({
          success:
            "Land Created Successfully. Owner " + this.state.CurrentOwner,
        });
      } catch (e) {
        this.setState({ openi: true });
        this.setState({ errori: e.toString() });
        console.log("Error : ", e.toString());
      }
    }
  }

  async addPolylineData() {
    if (
      this.state.lat === "" ||
      this.state.lng === "" ||
      this.state.north === "" ||
      this.state.south === "" ||
      this.state.east === "" ||
      this.state.west === ""
    ) {
      alert("Please enter all the values");
    } else {
      try {
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

        console.log("Lat : ", this.state.lat);
        console.log("Lng : ", this.state.lng);
        console.log("North : ", this.state.north);
        console.log("South : ", this.state.south);
        console.log("East : ", this.state.east);
        console.log("West : ", this.state.west);

        await landCon.methods
          .registerLandPolyline(
            this.state.lat,
            this.state.lng,
            this.state.north,
            this.state.south,
            this.state.east,
            this.state.west
          )
          .send({ from: this.state.account });

        this.setState({ open: true });
        this.setState({ success: "Polyline Data Added Successfuly" });

        this.setState({ openDialog: false });
        this.clear();
      } catch (e) {
        this.setState({ openi: true });
        this.setState({ errori: e.toString() });
        console.log("Error : ", e.toString());
      }
    }
  }

  // clear function to clear the fields
  clear() {
    this.setState({
      states: "",
      district: "",
      village: "",
      khataNumber: "",
      khatooniNumber: "",
      CurrentOwner: "",
      ownerName: "",
      previousOwner: "",
      marketValue: "",
      squareFoots: "",
      inches: "",
      landType: "",
      lat: "",
      lng: "",
      north: "",
      south: "",
      east: "",
      west: "",
      open: false,
      openi: false,
      errori: "",
      success: "",
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleClose(e, r) {
    if (r === "clickaway") {
      return;
    }

    this.setState({ open: false });
    this.setState({ openi: false });
  }

  handleClickOpen = () => {
    this.setState({ openDialog: true });
  };

  render() {
    const MyDocument = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.centertitle}>
            <Image
              src={{ uri: `https://i.ibb.co/Db0nCmX/BLRS-LOGO.png` }}
              style={styles.stampTitle}
            />
            <Text style={styles.title}>Blockchain Land Records System</Text>
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
          <View style={styles.section}>
            <Text style={styles.heading1}>Land Detail</Text>
            <Text style={styles.text}>State: {this.state.states}</Text>
            <Text style={styles.text}>District: {this.state.district}</Text>
            <Text style={styles.text}>Village: {this.state.village}</Text>
            <Text style={styles.text}>Khata No: {this.state.khataNumber}</Text>
            <Text style={styles.text}>
              Khatooni No: {this.state.khatooniNumber}
            </Text>
            <Text style={styles.text}>
              Market Value: {this.state.marketValue} Ether
            </Text>
            <Text style={styles.text}>
              Square Foots: {this.state.squareFoots}
            </Text>
            <Text style={styles.text}>Inches: {this.state.inches}</Text>
            <Text style={styles.text}>Land Type: {this.state.landType}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.heading2}>Owner Detail</Text>
            <Text style={styles.text}>Owner Name: {this.state.ownerName}</Text>
            <Text style={styles.text}>
              Owner Address: {this.state.CurrentOwner}
            </Text>
            <Text style={styles.text}>
              Previous Owner: {this.state.previousOwner}
            </Text>
          </View>
          <View style={styles.rightStamp}>
            <Image
              src={{ uri: `https://i.ibb.co/Db0nCmX/BLRS-LOGO.png` }}
              style={styles.stamp}
            />
          </View>
        </Page>
      </Document>
    );

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
              <div className="col">
                <div className="home__hero-text-wrapper">
                  <div className="top-line">{"SECURE DATA"}</div>
                  <h1 className={true ? "heading" : "heading dark"}>
                    {"Create Land"}
                  </h1>
                  <div className="input-areas">
                    <input
                      autoFocus
                      style={{ width: "530px" }}
                      className="footer-input"
                      name="CurrentOwner"
                      type="text"
                      placeholder="Owner Address"
                      value={this.state.CurrentOwner}
                      onChange={this.handleChange}
                    />

                    <input
                      style={{ width: "530px" }}
                      className="footer-input"
                      name="ownerName"
                      type="text"
                      placeholder="Name Owner"
                      value={this.state.ownerName}
                      onChange={this.handleChange}
                    />

                    <input
                      style={{ width: "530px" }}
                      className="footer-input"
                      name="previousOwner"
                      type="text"
                      placeholder="Previous Owner Address"
                      value={this.state.previousOwner}
                      onChange={this.handleChange}
                    />

                    <select
                      style={{ width: "225px" }}
                      className="footer-input"
                      name="states"
                      value={this.state.states}
                      onChange={this.handleChange}
                    >
                      <option value="" disabled selected>
                        Select The State
                      </option>
                      <option value="Punjab">Punjab</option>
                      <option value="KPK">KPK</option>
                      <option value="Sindh">Sindh</option>
                      <option value="Balochistan">Balochistan</option>
                    </select>

                    <select
                      className="footer-input"
                      name="district"
                      value={this.state.district}
                      onChange={this.handleChange}
                    >
                      <option value="" disabled selected>
                        Select The District
                      </option>
                      {districts.map((item) => (
                        <option value={item}>{item}</option>
                      ))}
                    </select>

                    <input
                      className="footer-input"
                      name="village"
                      type="text"
                      placeholder="Village"
                      value={this.state.village}
                      onChange={this.handleChange}
                    />

                    <input
                      className="footer-input"
                      name="khataNumber"
                      type="number"
                      min="1"
                      placeholder="Khata Number"
                      value={this.state.khataNumber}
                      onChange={this.handleChange}
                    />

                    <input
                      className="footer-input"
                      name="khatooniNumber"
                      type="number"
                      min="1"
                      placeholder="khatooni Number"
                      value={this.state.khatooniNumber}
                      onChange={this.handleChange}
                    />

                    <input
                      className="footer-input"
                      name="marketValue"
                      type="number"
                      min="1"
                      placeholder="Market Value"
                      value={this.state.marketValue}
                      onChange={this.handleChange}
                    />

                    <input
                      className="footer-input"
                      name="squareFoots"
                      type="number"
                      min="1"
                      placeholder="Square Foots"
                      value={this.state.squareFoots}
                      onChange={this.handleChange}
                    />

                    <input
                      className="footer-input"
                      name="inches"
                      type="number"
                      min="1"
                      placeholder="Inches"
                      value={this.state.inches}
                      onChange={this.handleChange}
                    />

                    <select
                      style={{ width: "260px" }}
                      className="footer-input"
                      name="landType"
                      value={this.state.landType}
                      onChange={this.handleChange}
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Plot">Plot</option>
                    </select>

                    <Button
                      buttonSize="btn--mobile"
                      buttonColor="blue"
                      onClick={this.addData}
                    >
                      Create Land
                    </Button>

                    <Snackbar
                      open={this.state.open}
                      autoHideDuration={6000}
                      onClose={this.handleClose}
                    >
                      <Alert onClose={this.handleClose} severity="success">
                        {this.state.success}
                      </Alert>
                    </Snackbar>

                    <Snackbar
                      open={this.state.openi}
                      autoHideDuration={6000}
                      onClose={this.handleClose}
                    >
                      <Alert onClose={this.handleClose} severity="error">
                        {this.state.errori}
                      </Alert>
                    </Snackbar>
                  </div>
                </div>
              </div>
              <div className="col">
                <PDFViewer style={{ width: "700px", height: "1010px" }}>
                  <MyDocument />
                </PDFViewer>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Dialog
            open={this.state.openDialog}
            onClose={(event, reason) => reason !== "backdropClick"}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add Polyline Data</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add latitude and longitude points to the polyline and bounds of
                land north, south, east, west
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                name="lat"
                label="Latitude"
                type="number"
                value={this.state.lat}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                margin="dense"
                name="lng"
                label="Longitude"
                type="number"
                value={this.state.lng}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                margin="dense"
                name="north"
                label="North"
                type="number"
                value={this.state.north}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                margin="dense"
                name="south"
                label="South"
                type="number"
                value={this.state.south}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                margin="dense"
                name="east"
                label="East"
                type="number"
                value={this.state.east}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                margin="dense"
                name="west"
                label="West"
                type="number"
                value={this.state.west}
                onChange={this.handleChange}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <ButtonCore
                onClick={this.addPolylineData}
                variant="contained"
                color="secondary"
              >
                Add Polyline Data
              </ButtonCore>
            </DialogActions>
          </Dialog>
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
    return <CreateLand />;
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

export default FrontSection;
