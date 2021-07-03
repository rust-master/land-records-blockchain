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
      allAssets: [],
      states: [],
      district: [],
      village: [],
      survyNo: [],
      status: [],  
      account: "",
    };
  }


  async loadBlockchainData() {
    const web3 = window.web3

    const webeProvider = new Web3(Web3.givenProvider || "http://localhost:7545")
    const accounts = await webeProvider.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log("Account: " + this.state.account);

    const landCon = new web3.eth.Contract(contract.abi, "0x9113E01de9765d9A56c7E8C932a524fBB4dE5535")
    
    const assets = await landCon.methods.viewAssets().call({ from: this.state.account } )
    
    this.state.allAssets = assets

    for(let i=1; i<=assets.length; i++){
      
      const detail = await landCon.methods.landInfoOwner(i).call({ from: this.state.account })
      
      this.state.states.push(detail[0])
      this.state.district.push(detail[1])
      this.state.village.push(detail[2])
      this.state.survyNo.push(detail[3])
      this.state.status.push(detail[4])

      console.log("State: " + detail[0])
      console.log("Destrict: " + detail[1])
      console.log("Village: " + detail[2])
      console.log("Status: " + detail[4])

      console.log("---------------------------------")
    }

  }



  render() {

    const dataAll = this.state.allAssets;
    const statesAll = this.state.states;
    const districtAll = this.state.district;
    const villageAll = this.state.village;
    const survyNoAll = this.state.survyNo;
    const statusAll = this.state.status;


    console.log("Survy : " + survyNoAll[0])


    let ListTemplate

    
    if (dataAll.length) {

      ListTemplate = dataAll.map((value, index) =>


        <Link to="/sign-up" className="pricing__container-card">
          <div className="pricing__container-cardInfo">
            <div className="icon">
              <BsXDiamondFill />
            </div>
            <h3>Land Info</h3>
            <h4>{statesAll[index]}</h4>
            <p>state</p>
            <ul className="pricing__container-features">
              <li>Village: {villageAll[index]}</li>
              <li style={{fontSize:"10px"}}>District: {districtAll[index]}</li>
              {/* <li style={{fontSize:"10px"}}>Status: {statusAll[index].toString}</li> */}
              <li>Survey No: {survyNoAll[index]} sq/ft</li>
              {/* <li>Survey No: {survyNoAll[index]} sq/ft</li> */}
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
