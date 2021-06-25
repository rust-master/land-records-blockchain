import React from "react";
import { Button } from "./Button";
import "./Property.css";
import { FaFire } from "react-icons/fa";
import { BsXDiamondFill } from "react-icons/bs";
import { GiCrystalize } from "react-icons/gi";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";

function Property() {
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
            <Link to="/sign-up" className="pricing__container-card">
              <div className="pricing__container-cardInfo">
                <div className="icon">
                  <BsXDiamondFill />
                </div>
                <h3>Land</h3>
                <h4>20 Ether</h4>
                <p>value</p>
                <ul className="pricing__container-features">
                  <li>Property No: 1234</li>
                  <li>City: Sahiwal</li>
                  <li>Measurements: 120 sq/ft</li>
                </ul>
                <Button buttonSize="btn--wide" buttonColor="blue">
                  Mark Available
                </Button>
              </div>
            </Link>
            <Link to="/sign-up" className="pricing__container-card">
              <div className="pricing__container-cardInfo">
                <div className="icon">
                  <BsXDiamondFill />
                </div>
                <h3>Land</h3>
                <h4>20 Ether</h4>
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
