import React, { Component } from "react";
import { Button } from "./Button";
import "./Property.css";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from "@material-ui/core/CardMedia";
import Typography from '@material-ui/core/Typography';

import Web3 from "web3";
import Slide from "@material-ui/core/Slide";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import contract from "../build/contracts/Land.json";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class Property extends Component {

  componentWillMount() {
    this.loadBlockchainData();
  }

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      allAssets: [],
      ids: [],
      states: [],
      district: [],
      village: [],
      survyNo: [],
      marketValue: [],
      measurements: [],
      ipfsHash: [],
      status: [],
      account: "",
      open: false,
      openi: false,
    };
  }



  async myFunction(id, status) {
    if (!status) {
      console.log("ID : " + id)
      console.log("Account: " + this.state.account)

      const web3 = window.web3

      const landCon = new web3.eth.Contract(contract.abi, "0xA99C0Aa14B61D147404BeCA1695088a2F7b9cBA2")

      await landCon.methods.makeAvailable(id).send({ from: this.state.account })

      this.setState({ open: true })

      this.loadBlockchainData();

    } else {
      console.log("Status : " + status)
      this.setState({ openi: true })
    }
  }


  async loadBlockchainData() {
    const web3 = window.web3

    const webeProvider = new Web3(Web3.givenProvider || "http://localhost:7545")
    const accounts = await webeProvider.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log("Account: " + this.state.account);

    const landCon = new web3.eth.Contract(contract.abi, "0xA99C0Aa14B61D147404BeCA1695088a2F7b9cBA2")

    const assets = await landCon.methods.viewAssets().call({ from: this.state.account })

    this.state.allAssets = assets
    for (let i = 0; i <= assets.length; i++) {
      this.state.ids.push(assets[i])
    }


    this.state.allAssets.map(async (value, index) => {
      const detail = await landCon.methods.landInfoOwner(this.state.ids[index]).call({ from: this.state.account })
      const remainignDetail = await landCon.methods.remainingDetail(this.state.ids[index]).call({ from: this.state.account })

      this.state.states.push(detail[0])
      this.state.district.push(detail[1])
      this.state.village.push(detail[2])
      this.state.survyNo.push(detail[3])
      this.state.status.push(detail[4])
      this.state.marketValue.push(detail[5])
      this.state.measurements.push(detail[6])

      this.state.ipfsHash.push(remainignDetail)

      console.log("State: " + detail[0])
      console.log("Destrict: " + detail[1])
      console.log("Village: " + detail[2])
      console.log("Status: " + detail[4])
      console.log("marketValue: " + detail[5])
      console.log("measurements: " + detail[6])

      console.log("ipfsHash: " + remainignDetail)

      console.log("---------------------------------")
    })
  }

  handleClose(e, r) {
    if (r === 'clickaway') {
      return;
    }

    this.setState({ open: false })
    this.setState({ openi: false })
  }


  render() {

    const dataAll = this.state.allAssets;
    const statesAll = this.state.states;
    const districtAll = this.state.district;
    const villageAll = this.state.village;
    const survyNoAll = this.state.survyNo;
    const statusAll = this.state.status;
    const marketValueAll = this.state.marketValue;
    const measurementsAll = this.state.measurements;
    const idsAll = this.state.ids;

    const ipfsAll = this.state.ipfsHash;

    let ListTemplate

    if (dataAll.length) {

      ListTemplate = dataAll.map((value, index) =>

        <Slide direction="left" in={true} timeout={1500} mountOnEnter unmountOnExit>

          <div style={{maxWidth:"1030px", marginBottom:"20px"}}>
            <Card className={makeStyles({
              maxWidth: 345,
            })}>
              <CardMedia
                component="img"
                alt="Image not load"
                width="1030"
                height="550"
                image={`https://ipfs.io/ipfs/${ipfsAll[index]}`}
                title={survyNoAll[index]}
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="h3">
                  Survey No: {survyNoAll[index]}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Market Value: {marketValueAll[index]}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  State: {statesAll[index]}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  District: {districtAll[index]}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Village: {villageAll[index]}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Measurements: {measurementsAll[index]}
                </Typography>
              </CardContent>
              <CardActions style={{ float:"right" }}>
                <Button  buttonSize="btn--wide" buttonColor={statusAll[index] ? "red" : "primary"}
                  disabled={statusAll[index]}
                  onClick={this.myFunction.bind(this, idsAll[index], statusAll[index])} >
                  {statusAll[index] ? "Marked" : "Mark Available"}
                </Button>
              </CardActions>
            </Card>
          </div>

        </Slide>

      );
    }
    else {
      ListTemplate = <div>Records Not Found</div>;
    }

    return (
        <div>
          <div
            className={false ? "home__hero-section" : "home__hero-section darkBg"}
          >
            <div className="container">
              <h1 className="pricing__heading">Properties</h1>


              {ListTemplate}


              <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                <Alert onClose={this.handleClose} severity="success">
                  Land Marked successfully.
                </Alert>
              </Snackbar>


              <Snackbar open={this.state.openi} autoHideDuration={6000} onClose={this.handleClose}>
                <Alert onClose={this.handleClose} severity="error">
                  {"Already Marked"}
                </Alert>
              </Snackbar>



            </div>
          </div>
        </div>
    );
  }
}
export default Property;
