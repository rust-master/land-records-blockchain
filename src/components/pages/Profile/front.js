import React, { Component } from "react";
import "./FrontSection.css";
import { Button } from "../../Button";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

import Web3 from "web3";
import contract from "../../../build/contracts/Land.json";

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
      email: "",
      password: "",
      open: false,
      openi: false,
      errori: "",
      ipfsHash: "",
      profileImage: "",
      image: null,
      imageUrl: null,
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

    this.setState({ name: name });
  }

  changeProfile(e) {
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });

    if (e.target.files[0]) {
      this.setState({
        image: e.target.files[0],
      });
    }
  }

  handleClose(e, r) {
    if (r === "clickaway") {
      return;
    }

    this.setState({ open: false });
    this.setState({ openi: false });
  }

  handleUpload = () => {
    console.log(this.state.image);
    let file = this.state.image;
  };

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
                          src={this.state.profileImage}
                          alt={"Profile Image"}
                          className="home__hero-img"
                        />
                      </div>

                      <div>
                        <input
                          style={{ width: "100%" }}
                          className="footer-input"
                          name="name"
                          type="text"
                          placeholder="Your Name"
                          onChange={this.handleChange}
                          value={this.state.name}
                        />
                      </div>
                      <div>
                        <input
                          style={{ width: "100%" }}
                          className="footer-input"
                          name="email"
                          type="email"
                          disabled="true"
                          placeholder="Your Email"
                          onChange={this.handleChange}
                          value={this.state.email}
                        />
                      </div>
                      <div>
                        <input
                          style={{ width: "100%" }}
                          className="footer-input"
                          name="password"
                          type="password"
                          disabled="true"
                          placeholder="Your Password"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </div>

                      <div>
                        <input
                          style={{ width: "100%" }}
                          className="footer-input"
                          name="image"
                          type="file"
                          onChange={this.handleChange}
                        />
                      </div>

                      <Button
                        style={{ marginLeft: "200px" }}
                        buttonSize="btn--wide"
                        buttonColor="blue"
                        onClick={this.changeProfile}
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
