import React, { Component } from "react";
import "./FrontSection.css";
import { Button } from "../../Button";
import Web3 from "web3";
import contract from "../../../build/contracts/Land.json";


class ChangeMarketValue extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      allIDs: [],
      changeValue: [],
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async changeMarketValueData(sendValue) {
    console.log("Data " + sendValue)
    this.state.allIDs = []

    const web3 = window.web3
    const webeProvider = new Web3(Web3.givenProvider || "http://localhost:7545")
    const accounts = await webeProvider.eth.getAccounts()

    const landCon = new web3.eth.Contract(contract.abi, "0x5ec9Df553fBF2498Aa252f62999DB6F46e25E164")
    const allLandsIDs = await landCon.methods.getAllLands().call({ from: accounts[0] })

    this.state.allIDs = allLandsIDs
    console.log("IDs", this.state.allIDs)

    this.state.allIDs.map(async (value, index) => {

      const detail = await landCon.methods.showAllLands(this.state.allIDs[index]).call({ from: accounts[0] })
      var newValue = detail[5] + sendValue

      //await landCon.methods.changeMarketValue(this.state.allIDs[index],newValue).send({ from: accounts[0] })

    console.log("newValue " + newValue)

    })
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
                  <div className="top-line">{"Market Value of Land Changes After Years"}</div>
                  <h1 className={true ? "heading" : "heading dark"}>
                    {"Change Market Value"}
                  </h1>
                  <div className="input-areas">

                    <input
                      style={{ width: "520px" }}
                      className="footer-input"
                      name="changeValue"
                      type="number"
                      placeholder="Change Value"
                      value={this.state.changeValue}
                      onChange={this.handleChange}
                    />

                    <Button
                      onClick={this.changeMarketValueData.bind(this, this.state.changeValue)}
                      buttonSize="btn--wide" buttonColor="blue">
                      Change Market Value
                    </Button>

                  </div>
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
