import React, { Component } from "react";
import "./FrontSection.css";
import { Button } from "../../Button";
import { Link } from "react-router-dom";
import Web3 from "web3";

// import contract from "../../../build/contracts/Auth.json";
import contract from "../../../build/contracts/Land.json";
import Snackbar from "@material-ui/core/Snackbar";
import Cookies from "universal-cookie";

import MuiAlert from "@material-ui/lab/Alert";

const cookies = new Cookies();

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class UserSignIn extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      account: "",
      password: "",
      openi: false,
      errori: "",
    };
  }

  async login(e) {
    e.preventDefault();
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
      .loginUser(this.state.account, this.state.password)
      .send({ from: this.state.account });

    const checkIsUser = await authContract.methods
      .checkIsUserLogged(this.state.account)
      .call({ from: this.state.account });

    console.log("Login : " + checkIsUser[0]);

    if (checkIsUser[0]) {
      cookies.set("checkIsUser", true, { path: "/" });
      cookies.set("Username", checkIsUser[2], { path: "/" });
      console.log(cookies.get("checkIsUser"));
      console.log(cookies.get("Username"));
      window.location = "/";
    } else {
      cookies.remove("checkIsUser");
      cookies.remove("Username");

      console.log(cookies.get("checkIsUser"));
      console.log(cookies.get("Username"));

      this.setState({ errori: "Login Failed" });
      this.setState({ openi: true });
    }
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
                <div className="home__hero-text-wrapper">
                  <div className="top-line">{"SIGN IN TODAY"}</div>
                  <h1 className={true ? "heading" : "heading dark"}>
                    {"BLRS Secure Your Records"}
                  </h1>
                  <div className="input-areas">
                    <form>
                      <input
                        className="footer-input"
                        name="password"
                        type="password"
                        placeholder="Your Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />

                      <Button
                        buttonSize="btn--wide"
                        buttonColor="blue"
                        onClick={this.login}
                      >
                        Sign In
                      </Button>
                    </form>

                    <Snackbar
                      open={this.state.openi}
                      autoHideDuration={6000}
                      onClose={this.handleClose}
                    >
                      <Alert onClose={this.handleClose} severity="error">
                        Error: {this.state.errori}
                      </Alert>
                    </Snackbar>

                    <Link to="/goverment-login" className="btn-link">
                      <div class="btnGoverment">
                        <Button buttonSize="btn--wide" buttonColor="red">
                          Government Sign In
                        </Button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="home__hero-img-wrapper">
                  <img
                    src={"images/svg-6.svg"}
                    alt={"Credit Card"}
                    className="home__hero-img"
                  />
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
    return <UserSignIn />;
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
