import React, { Component } from "react";
import "./FrontSection.css";
import { Button } from "../../Button";
import { Link } from "react-router-dom";

import Web3 from "web3";
import contract from "../../../build/contracts/Land.json";

class ForgetPasswordUser extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCNICChange = this.handleCNICChange.bind(this);
    this.state = {
      password: "",
      confirmPassword: "",
      account: "",
    };
  }

  async forgetPassword(e) {
    e.preventDefault();

    if (this.state.password == this.state.confirmPassword) {
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

      console.log("Password:", this.state.password);
      console.log("Confirm Password:", this.state.confirmPassword);

      const authContract = new web3.eth.Contract(
        contract.abi,
        deployedNetwork.address
      );

      await authContract.methods
        .forgetPasswordUser(this.state.account, this.state.password)
        .send({ from: this.state.account });
    } else {
      alert("Password does not match");
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleCNICChange(e) {
    if (e.target.value.length <= 13) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
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
                  <div className="top-line">{"Recover Your Password"}</div>
                  <h1 className={true ? "heading" : "heading dark"}>
                    {"Forget Password"}
                  </h1>
                  <div className="input-areas">
                    <form>
                      <div>
                        <input
                          style={{ width: "530px" }}
                          className="footer-input"
                          name="password"
                          type="password"
                          placeholder="New Password"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div>
                        <input
                          style={{ width: "530px" }}
                          className="footer-input"
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm Password"
                          onChange={this.handleChange}
                          value={this.state.confirmPassword}
                        />
                      </div>

                      <Button
                        buttonSize="btn--wide"
                        buttonColor="blue"
                        onClick={this.forgetPassword.bind(this)}
                      >
                        Confirm
                      </Button>
                    </form>
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
    return <ForgetPasswordUser />;
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
