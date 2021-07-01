import React, { Component } from "react";
import "./FrontSection.css";
import { Button } from "../../Button";
import { Link } from "react-router-dom";
import Web3 from "web3";
import contract from "../../../build/contracts/Land.json"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class CreateLand extends Component {

  constructor(props) {
    super(props);
    this.addData = this.addData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      account: "",
      id: "",
      owner: "",
      landno: "",
      price: "",
      city: "",
      measurement: "",
      open: false,
    };
  }


  async addData(e) {
    e.preventDefault();
    const web3 = window.web3

    const webeProvider = new Web3(Web3.givenProvider || "http://localhost:7545")
    const accounts = await webeProvider.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log("Account: " + this.state.account);

    const landCon = new web3.eth.Contract(contract.abi, "0x28252844a10ABE60B6C74A5AD1C66FCECfEc01f6")
    console.log("Owner: " + this.state.owner);
    console.log("Land No: " + this.state.landno);
    console.log("Land Value: " + this.state.price);
    console.log("City: " + this.state.city);
    console.log("Measurment: " + this.state.measurement);

    await landCon.methods.createProperty(this.state.landno, this.state.price, this.state.owner, this.state.city, this.state.measurement).send({ from: this.state.account })

    this.setState({open : true})


 
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleClose(e ,r){
    if (r === 'clickaway') {
      return;
    }

    this.setState({open : false})

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

                    <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
        <Alert onClose={this.handleClose} severity="success">
          Land Created successfully. Owner: {this.state.owner}
        </Alert>
      </Snackbar>
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
