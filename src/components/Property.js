import React, { Component } from "react";
import { Button } from "./Button";
import "./Property.css";
import { FaFire } from "react-icons/fa";
import { BsXDiamondFill } from "react-icons/bs";
import { GiCrystalize } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";
import Web3 from "web3";
import xtype from 'xtypejs'

import contract from "../build/contracts/Land.json";




class Property extends Component {

  componentWillMount() {
    this.loadBlockchainData();
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      itemsIds: [],
      itemsOwner: [],
      itemsValues: [],
      itemsCity: [],
      itemsMeasure: [],
      itemsStatus: [],
    };
  }


  async loadBlockchainData() {
    const web3 = window.web3
    
    const webeProvider = new Web3(Web3.givenProvider || "http://localhost:7545")
    const accounts = await webeProvider.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log("Account: " + this.state.account);

    const landCon = new web3.eth.Contract(contract.abi, "0x6E68253Bb0286f977B27704b82bCC511252D4845");

    const allLands = await landCon.methods.getAllDetails().call();


    for (const [index, value] of allLands["0"].entries()) {
      this.state.itemsIds.push(value);
    }

    for (const [index, value] of allLands["1"].entries()) {
      this.state.itemsValues.push(value);
    }

    for (const [index, value] of allLands["2"].entries()) {
      this.state.itemsOwner.push(value);
    }

    for (const [index, value] of allLands["3"].entries()) {
      this.state.itemsCity.push(value);
    }

    for (const [index, value] of allLands["4"].entries()) {
      this.state.itemsMeasure.push(value);
    }

    for (const [index, value] of allLands["5"].entries()) {
      this.state.itemsStatus.push(value);
    }

  };



  render() {

    const ids = this.state.itemsIds;
    const address = this.state.itemsOwner;
    const price = this.state.itemsValues;
    const city = this.state.itemsCity;
    const measure = this.state.itemsMeasure;
    const status = this.state.itemsStatus;

    const result2 = address.filter(letter => letter.length > 4);

    console.log(result2);


    let ListTemplate;

    if (status.length) {
      ListTemplate = address.filter(item => item == this.state.account).map((value, index) =>

        <Link to="/sign-up" className="pricing__container-card">
          <div className="pricing__container-cardInfo">
            <div className="icon">
              <BsXDiamondFill />
            </div>
            <h3>Land</h3>
            <h4>{price[index]} Ether</h4>
            <p>value</p>
            <ul className="pricing__container-features">
              <li>Property No: {ids[index]}</li>
              <li>City: {city[index]}</li>
              <li>Measurements: {measure[index]} sq/ft</li>
            </ul>
            <Button buttonSize="btn--wide" buttonColor="primary">
              Mark Available
            </Button>
          </div>
        </Link>
      );
    }
    else {
      ListTemplate = <div > Records Not Found </div>;
    }



    return (
      <IconContext.Provider value={{ color: "#fff", size: 64 }}>
        <div className="pricing__section">
          <div className="pricing__wrapper">
            <h1 className="pricing__heading">Properties</h1>
            <div className="pricing__container">

              {ListTemplate}


            </div>
          </div>
        </div>
      </IconContext.Provider>
    );
  }
}
export default Property;
