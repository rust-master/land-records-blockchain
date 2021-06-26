import React, { Component } from "react";
import "./FrontSection.css";
import { Button } from "../../Button";
import { Link } from "react-router-dom";
import Web3 from "web3";
import contract from "../../../build/contracts/Land.json"


class CreateLand extends Component {

  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const landCon = new web3.eth.Contract(contract.abi, "0xC87e8B11B4587A2BfBebc469dE3aa8ea81Fd81C6")
    const detail = await landCon.methods.properties(1).call()
    console.log("Detail: "+ detail['currOwner'])

      const allLands = await landCon.methods.getAllDetails().call()
      for(var i=0; i< allLands['0'].length; i++) {
        console.log("Price: " + allLands['0'].[i])
        console.log("Address: " + allLands['1'].[i])
      }
      
  
  }


  constructor(props) {
    super(props);
    this.addData = this.addData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      account: "",
      id: "",
      owner: "",
      landno: "",
      price: "",
      city: "",
      measurement: "",
    };
  }



  async addData(e) {
    e.preventDefault();
    const web3 = window.web3

    const webeProvider = new Web3(Web3.givenProvider || "http://localhost:7545")
    const accounts = await webeProvider.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log("Account: " + this.state.account);

    const landCon = new web3.eth.Contract(contract.abi, "0x41E2B02C09E82816a8c2ee1b2cdf312510a237Ec")
    console.log("Owner: "+this.state.owner);
    console.log("Land No: "+this.state.landno);
    console.log("Land Value: "+this.state.price);

    const bool = await landCon.methods.createProperty(this.state.landno,this.state.price,this.state.owner).send({from: this.state.account} )

    console.log("Check: " + bool)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }


  render() {
    return (
      <>
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
                    <form>
                      <input
                        className="footer-input"
                        name="owner"
                        type="text"
                        placeholder="Owner Address"
                        value={this.state.owner}
                        onChange={this.handleChange}
                      />

                      <input
                        className="footer-input"
                        name="landno"
                        type="text"
                        placeholder="Land No"
                        value={this.state.landno}
                        onChange={this.handleChange}
                      />

                      <input
                        className="footer-input"
                        name="price"
                        type="text"
                        placeholder="Land Value"
                        value={this.state.price}
                        onChange={this.handleChange}
                      />

                      <input
                        className="footer-input"
                        name="city"
                        type="text"
                        placeholder="City"
                        value={this.state.city}
                        onChange={this.handleChange}
                      />

                      <input
                        className="footer-input"
                        name="measurement"
                        type="text"
                        placeholder="Measurements"
                        value={this.state.measurement}
                        onChange={this.handleChange}
                      />



                      <Button
                        buttonSize="btn--mobile"
                        buttonColor="blue"
                        onClick={this.addData}
                      >
                        Create Land
                      </Button>

                    </form>
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
      </>
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
    <>
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
    </>
  );
}

export default FrontSection;
