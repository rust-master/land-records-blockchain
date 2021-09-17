import React, { Component } from "react";
import "./FrontSection.css";
import { Button } from "../../Button";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

import logo from "../../../components/logo.png";

import Web3 from "web3";
import contract from "../../../build/contracts/Land.json";
import ipfs from "../../../ipfs";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Profile extends Component {
  componentWillMount() {
    this.loadProfileData();
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.changeProfile = this.changeProfile.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      name: "",
      account: "",
      password: "",
      open: false,
      openi: false,
      errori: "",
      ipfsHash: "",
      fileImage: "",
      buffer: null,
      progress: 0,
    };
  }

  async loadProfileData() {
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

    const authContract = new web3.eth.Contract(
      contract.abi,
      deployedNetwork.address
    );

    const name = await authContract.methods
      .getUserName(this.state.account)
      .call({ from: this.state.account });

    const hash = await authContract.methods
      .getUserIpfsImageHash(this.state.account)
      .call({ from: this.state.account });

    this.setState({ name: name, ipfsHash: hash });
  }

  async changeProfile(hash) {
    console.log("Hash: " + hash);
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

    const authContract = new web3.eth.Contract(
      contract.abi,
      deployedNetwork.address
    );

    await authContract.methods
      .setUserIpfsImageHash(this.state.account, hash)
      .send({ from: this.state.account });

    this.loadProfileData();

    // for loop profress bar
    for (let i = 0; i < 100; i++) {
      this.setState({ progress: i });
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    this.setState({ progress: 0 });

    this.setState({ open: true });
  }

  captureFile = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    this.setState({ fileImage: URL.createObjectURL(event.target.files[0]) });
    console.log("File: " + file);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log("buffer", this.state.buffer);
    };
  };

  onSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting file");
    if (this.state.buffer == null) {
      alert("Please select a file");
    } else {
      const file = await ipfs.add(this.state.buffer);
      const hash = file[0].hash;
      this.changeProfile(hash);
    }
  };

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

  render() {
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
                <div className="home__hero-img-wrapper">
                  <img
                    src={"images/svg-6.svg"}
                    alt={"Credit Card"}
                    className="home__hero-img"
                  />
                </div>
              </div>

              <div className="col">
                <div className="home__hero-text-wrapper">
                  <div className="top-line">{"Profile"}</div>
                  <h1 className={true ? "heading" : "heading dark"}>
                    {"BLRS Profile"}
                  </h1>
                  <Progress
                    theme={{
                      success: {
                        symbol: "🏄‍",
                        color: "rgb(223, 105, 180)",
                      },
                      active: {
                        symbol: "😀",
                        color: "#fbc630",
                      },
                      default: {
                        symbol: "😱",
                        color: "#fbc630",
                      },
                    }}
                    style={{ marginBottom: 30 }}
                    percent={this.state.progress}
                    status={this.state.progress == 100 ? "success" : "active"}
                  />
                  <div className="input-areas">
                    <form>
                      <div>
                        <img
                          style={{
                            width: 100,
                            height: 100,
                            marginBottom: 20,

                            horizentalAlign: "center",
                          }}
                          src={
                            this.state.ipfsHash == ""
                              ? logo
                              : `https://ipfs.io/ipfs/${this.state.ipfsHash}`
                          }
                          alt={"Profile Image"}
                          className="home__hero-img"
                        />
                      </div>

                      <div>
                        <input
                          style={{ width: "100%", color: "#fff" }}
                          className="footer-input"
                          name="name"
                          disabled="true"
                          type="text"
                          placeholder="Your Name"
                          onChange={this.handleChange}
                          value={this.state.name}
                        />
                      </div>
                      <div>
                        <input
                          style={{ width: "100%", color: "#fff" }}
                          className="footer-input"
                          name="account"
                          type="text"
                          disabled="true"
                          placeholder="Your Address"
                          onChange={this.handleChange}
                          value={this.state.account}
                        />
                      </div>

                      <div>
                        <input
                          style={{ width: "100%" }}
                          className="footer-input"
                          name="image"
                          type="file"
                          onChange={this.captureFile}
                        />
                      </div>

                      <Button
                        style={{ marginLeft: "200px" }}
                        buttonSize="btn--wide"
                        buttonColor="blue"
                        onClick={this.onSubmit}
                      >
                        Update Profile Image
                      </Button>
                    </form>

                    <Snackbar
                      open={this.state.open}
                      autoHideDuration={6000}
                      onClose={this.handleClose}
                    >
                      <Alert onClose={this.handleClose} severity="success">
                        Profile changed successfully
                        {this.state.CurrentOwner}
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
    return <Profile />;
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
