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
                  <div className="top-line">{"Market of Land Changes After Years"}</div>
                  <h1 className={true ? "heading" : "heading dark"}>
                    {"Change Market Value"}
                  </h1>
                  <div className="input-areas">

                    <input
                      className="footer-input"
                      name="changeValue"
                      type="text"
                      placeholder="Change Value"
                      value={this.state.changeValue}
                      onChange={this.handleChange}
                    />

                    {/* <Button
                      onClick={this.loadBlockchainData.bind(this, this.state.searchKeyword, this.state.searchKeyword1)}
                      buttonSize="btn--wide" buttonColor="blue">
                      Search
                    </Button> */}

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
