import React, {  } from "react";
import { Button } from "./Button";
import "./Property.css";
import { FaFire } from "react-icons/fa";
import { BsXDiamondFill } from "react-icons/bs";
import { GiCrystalize } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";

import xtype from 'xtypejs'

import contract from "../build/contracts/Land.json";




function Property() {

  const [ids, setids] = useState([]);
  const [owner, setOwner] = useState([]);
  const [landValue, setlandValue] = useState([]);
  const [city, setCity] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [status, setStatus] = useState([]);

  const loadBlockchainData = async () => {
    
    const web3 = window.web3;
    const landCon = new web3.eth.Contract(contract.abi, "0x6E68253Bb0286f977B27704b82bCC511252D4845");

    const allLands = await landCon.methods.getAllDetails().call();


    for (const [index, value] of allLands["0"].entries()) {
      console.log({ value })
    }

    for (const [index, value] of allLands["1"].entries()) {
      console.log({ value })
    }

    for (const [index, value] of allLands["2"].entries()) {
      owner.push("12")
      console.log({ value })
      //setOwner(owner)
    }

    

    for (const [index, value] of allLands["3"].entries()) {
      console.log({ value })
    }

    for (const [index, value] of allLands["4"].entries()) {
      console.log({ value })
    }

    for (const [index, value] of allLands["5"].entries()) {
      console.log({ value })
    }

  };


  useEffect(() => {

    loadBlockchainData()

    console.log("Type: " + owner)

    const result2 = owner.filter(letter => letter.length > 4);

    console.log(result2);
  

  }, []);


 
  return (
    <IconContext.Provider value={{ color: "#fff", size: 64 }}>
      <div className="pricing__section">
        <div className="pricing__wrapper">
          <h1 className="pricing__heading">Properties</h1>
          <div className="pricing__container">


            <Link to="/sign-up" className="pricing__container-card">
              <div className="pricing__container-cardInfo">
                <div className="icon">
                  <BsXDiamondFill />
                </div>
                <h3>Land</h3>
                <h4>10 Ether</h4>
                <p>value</p>
                <ul className="pricing__container-features">
                  <li>Property No: 1234</li>
                  <li>City: Sahiwal</li>
                  <li>Measurements: 120 sq/ft</li>
                </ul>
                <Button buttonSize="btn--wide" buttonColor="primary">
                  Mark Available
                </Button>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}
export default Property;
