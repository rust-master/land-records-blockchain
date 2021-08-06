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
                  <div className="input-areas">
                    <div>
                      <Card
                        className={makeStyles({
                          maxWidth: 345,
                        })}
                      >
                        <CardActionArea>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h4"
                              component="h2"
                            >
                              Property No: 1234
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              Value: 20 Ether
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              Location: Sahiwal
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              Measurements: 120 sq/ft
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                          >
                            Reject
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                          >
                            Accept
                          </Button>
                        </CardActions>
                      </Card>
                    </div>

                    <div style={{ marginTop: 40 }}>
                      <Card
                        className={makeStyles({
                          maxWidth: 345,
                        })}
                      >
                        <CardActionArea>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h4"
                              component="h2"
                            >
                              Property No: 2334
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              Value: 40 Ether
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              Location: Lahore
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              Measurements: 110 sq/ft
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                          >
                            Reject
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                          >
                            Accept
                          </Button>
                        </CardActions>
                      </Card>
                    </div>

                    <div style={{ marginTop: 40 }}>
                      <Card
                        className={makeStyles({
                          maxWidth: 345,
                        })}
                      >
                        <CardActionArea>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h4"
                              component="h2"
                            >
                              Property No: 1454
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              Value: 20 Ether
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              Location: Sahiwal
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              Measurements: 120 sq/ft
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                          >
                            Reject
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                          >
                            Accept
                          </Button>
                        </CardActions>
                      </Card>
                    </div>

                    <div style={{ marginTop: 40 }}>
                      <Card
                        className={makeStyles({
                          maxWidth: 345,
                        })}
                      >
                        <CardActionArea>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h4"
                              component="h2"
                            >
                              Property No: 2554
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              Value: 30 Ether
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              Location: Karachi
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              Measurements: 130 sq/ft
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                          >
                            Reject
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                          >
                            Accept
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                  </div>
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
