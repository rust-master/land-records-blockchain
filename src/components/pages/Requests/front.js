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

class RequestsFront extends Component {
  componentWillMount() {
    this.loadBlockchainData();
  }

  constructor(props) {
    super(props);
    this.state = {
      allAssets: [],
      ids: [],
      owner: [],
      marketValue: [],
      status: [],
      requester: [],
      requestStatus: [],
      account: "",
    };
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

    const assets = await landCon.methods
      .viewAssets()
      .call({ from: this.state.account });

    this.state.allAssets = assets;
    for (let i = 0; i <= assets.length; i++) {
      this.state.ids.push(assets[i]);
    }

    this.state.allAssets.map(async (value, index) => {
      const detail = await landCon.methods
        .landInfoUser(this.state.ids[index])
        .call({ from: this.state.account });

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
    });
  }

  render() {
    const dataAll = this.state.allAssets;
    const ownerAll = this.state.owner;
    const marketValueAll = this.state.marketValue;
    const statusAll = this.state.status;
    const requesterAll = this.state.requester;
    const requestStatusAll = this.state.requestStatus;
    const idsAll = this.state.ids;

    let ListTemplate;

    if (dataAll.length) {
      ListTemplate = dataAll.map((value, index) => (
        <div>
          <Card
            className={makeStyles({
              maxWidth: 345,
            })}
          >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h4" component="h4">
                Buyer: {requesterAll[index]}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Value: {marketValueAll[index]} Ether
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Owner : {ownerAll[index]}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                
                  Request Status: {requestStatusAll[index] == 1 ? "Default" : "pending"}

                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" variant="contained" color="secondary">
                Reject
              </Button>
              <Button size="small" variant="contained" color="primary">
                Accept
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
                  <div className="top-line">{"VIEW REQUESTS"}</div>
                  <h1 className={true ? "heading" : "heading dark"}>
                    {"Requests"}
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
    return <RequestsFront />;
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
