import React, { Component } from "react";
import "./FrontSection.css";
import { Button } from "../../Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Web3 from "web3";
import contract from "../../../build/contracts/Land.json";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class ChangeMarketValue extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      changeValue: "",
      landType: "",
      open: false,
      openi: false,
    };
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

  async changeMarketValueData(sendValue) {
    console.log("Data " + sendValue);

    const web3 = window.web3;
    const webeProvider = new Web3(
      Web3.givenProvider || "http://localhost:7545"
    );
    const accounts = await webeProvider.eth.getAccounts();

    const netId = await web3.eth.net.getId();
    const deployedNetwork = contract.networks[netId];

    console.log(deployedNetwork.address);

    const landCon = new web3.eth.Contract(
      contract.abi,
      deployedNetwork.address
    );

    // if (sendValue > 0) {

    await landCon.methods
      .changeMarketValue(5, sendValue)
      .send({ from: accounts[0] });

    this.setState({ open: true });

    // } else {
    //   this.setState({ openi: true });
    // }
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
                  <div className="top-line">
                    {"Market Value of Land Changes After Years"}
                  </div>
                  <h1 className={true ? "heading" : "heading dark"}>
                    {"Change Market Value"}
                  </h1>
                  <div className="input-areas">
                    <input
                      className="footer-input"
                      name="changeValue"
                      type="number"
                      min="1"
                      placeholder="Change Value"
                      value={this.state.changeValue}
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
                      onClick={this.changeMarketValueData.bind(
                        this,
                        this.state.changeValue
                      )}
                      buttonSize="btn--wide"
                      buttonColor="blue"
                    >
                      Change Market Value
                    </Button>
                  </div>

                  <Snackbar
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                  >
                    <Alert onClose={this.handleClose} severity="success">
                      Market Value Change of All Lands Succefully
                    </Alert>
                  </Snackbar>

                  <Snackbar
                    open={this.state.openi}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                  >
                    <Alert onClose={this.handleClose} severity="error">
                      Market Value is Wrong. Please Try Again
                    </Alert>
                  </Snackbar>
                </div>
              </div>
              <div className="col">
                <div className="home__hero-img-wrapper">
                  <img
                    src={"images/svg-7.svg"}
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

export default ChangeMarketValue;
