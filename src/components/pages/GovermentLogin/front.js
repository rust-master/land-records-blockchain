import React, { Component } from "react";
import "./FrontSection.css";
import { Button } from "../../Button";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Web3 from "web3";
import contract from "../../../build/contracts/Auth.json";

const cookies = new Cookies();

class GovermentLogin extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      password: "",
      account: "",
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
    console.log("Password", this.state.password);

    const authContract = new web3.eth.Contract(
      contract.abi,
      deployedNetwork.address
    );

    await authContract.methods
      .loginAdmin(this.state.account, this.state.password)
      .send({ from: this.state.account });

    const checkIsAdmin = await authContract.methods
      .checkIsAdminLogged(this.state.account)
      .call({ from: this.state.account });

    console.log("checkIsAdmin : " + checkIsAdmin[0]);
    console.log("checkIsAdmin : " + checkIsAdmin[1]);

    if (checkIsAdmin[0]) {
      console.log("Passed");

      cookies.set("checkIsAdmin", checkIsAdmin[0], { path: "/" });
      cookies.set("AdminName", checkIsAdmin[2], { path: "/" });
      console.log(cookies.get("checkIsAdmin"));
      console.log(cookies.get("AdminName"));

      window.location = "/";
    } else {
      cookies.remove("checkIsAdmin");
      cookies.remove("checkIsAdmin");

      console.log(cookies.get("checkIsAdmin"));
      console.log(cookies.get("AdminName"));

      console.log("Failed");
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
                  <div className="top-line">{"GOVERTMENT SIGN IN"}</div>
                  <h1 className={true ? "heading" : "heading dark"}>
                    {"Blockchain based Land Records System"}
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
                    </form>

                    <div class="btnGoverment">
                      <Link to="/goverment-signup">
                        <Button buttonSize="btn--wide" buttonColor="blue">
                          {"Sign Up"}
                        </Button>
                      </Link>
                      <span> {" | "} </span>
                      <Button
                        buttonSize="btn--wide"
                        buttonColor="red"
                        onClick={this.login.bind(this)}
                      >
                        {"Government Sign In"}
                      </Button>
                    </div>
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
    return <GovermentLogin />;
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
