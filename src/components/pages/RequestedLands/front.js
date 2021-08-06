import React, { Component } from "react";
import "./FrontSection.css";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Web3 from "web3";
import contract from "../../../build/contracts/Land.json";

class RequestedLandsFront extends Component {
  componentWillMount() {
    this.loadBlockchainData();
  }

  constructor(props) {
    super(props);
    this.state = {
      allLandsData: [],
      ids: [],
      owner: [],
      marketValue: [],
      status: [],
      requester: [],
      requestStatus: [],
      account: "",
    };
  }

  async buyLand(idLand) {
    console.log("ID : ", idLand);


    // const web3 = window.web3;

    // const webeProvider = new Web3(
    //   Web3.givenProvider || "http://localhost:7545"
    // );
    // const accounts = await webeProvider.eth.getAccounts();
    // this.setState({ account: accounts[0] });
    // console.log("Account: " + this.state.account);

    // const landContract = new web3.eth.Contract(
    //   contract.abi,
    //   "0xdB2655705f835ab52ca6Ab04AFd2650D1C7047cD"
    // );

    // await landContract.methods
    //   .processRequest(idLand, reqStatus)
    //   .send({ from: this.state.account });

    console.log("Buy Land Confirm");
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    const webeProvider = new Web3(
      Web3.givenProvider || "http://localhost:7545"
    );
    const accounts = await webeProvider.eth.getAccounts();

    this.setState({ account: accounts[0] });
    console.log("Account: " + this.state.account);

    const landCon = new web3.eth.Contract(
      contract.abi,
      "0xdB2655705f835ab52ca6Ab04AFd2650D1C7047cD"
    );

    const allLands = await landCon.methods
      .getAllLands()
      .call({ from: this.state.account });

    this.state.allLandsData = allLands;
    for (let i = 0; i <= allLands.length; i++) {
      this.state.ids.push(allLands[i]);
    }

    this.state.allLandsData.map(async (value, index) => {
      const detail = await landCon.methods
        .landInfoUser(this.state.ids[index])
        .call({ from: this.state.account });

      if (detail[0] != this.state.account && detail[3] == this.state.account) {
        this.state.owner.push(detail[0]);
        this.state.marketValue.push(detail[1]);
        this.state.status.push(detail[2]);
        this.state.requester.push(detail[3]);
        this.state.requestStatus.push(detail[4]);

        console.log("owner: " + detail[0]);
        console.log("marketValue: " + detail[1]);
        console.log("status: " + detail[2]);
        console.log("requester: " + detail[3]);
        console.log("requestStatus: " + detail[4]);

        console.log("---------------------------------");
      }
    });
  }

  render() {
    const dataAll = this.state.allLandsData;
    const ownerAll = this.state.owner;
    const marketValueAll = this.state.marketValue;
    const statusAll = this.state.status;
    const requesterAll = this.state.requester;
    const requestStatusAll = this.state.requestStatus;
    const idsAll = this.state.ids;

    let ListTemplate;

    if (dataAll.length && marketValueAll.length > 0) {
      ListTemplate = dataAll.map((value, index) => (
        <div>
          <Card
            className={makeStyles({
              maxWidth: 345,
            })}
          >
            <CardActionArea>
              <CardContent>
                <Typography
                  style={{ fontSize: 18 }}
                  gutterBottom
                  variant="h6"
                  component="h6"
                >
                  Buyer: {requesterAll[index]}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Value: {marketValueAll[index]} Ether
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Owner : {ownerAll[index]}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Request Status:{" "}
                  {requestStatusAll[index] == 1 ? "Pending" : "Accepted"}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions style={{ float: "right" }}>
              <Button size="small" variant="contained" color="primary">
                Refuse to Buy
              </Button>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={this.buyLand.bind(this, dataAll[index])}
              >
                Buy
              </Button>
            </CardActions>
          </Card>
        </div>
      ));
    } else {
      ListTemplate = <div>Records Not Found</div>;
    }

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
                  <div className="top-line">{"VIEW REQUESTED LANDS"}</div>
                  <h1 className={true ? "heading" : "heading dark"}>
                    {"Requested Lands"}
                  </h1>
                  <div className="input-areas"></div>

                  {ListTemplate}
                </div>
              </div>
              <div className="col">
                <div className="home__hero-img-wrapper">
                  <img
                    src={"images/svg-2.svg"}
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
    return <RequestedLandsFront />;
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
