import React from "react";
import { Button } from "../../Button";
import "./FrontSection.css";
import { Link } from "react-router-dom";
import Zoom from "@material-ui/core/Zoom";

class InheritanceCalaculator extends React.Component {
  render() {
    const lightBg = false;
    const lightTextDesc = true;
    const topLine = "Islamic Inheritance Calculator";
    const description = "Calaculate Your Inheritance";
    const buttonLabel = "Get Started";
    const imgStart = "";
    const img = "images/svg-1.svg";
    const alt = "Credit Card";

    return (
      <div>
        <div
          className={
            lightBg ? "home__hero-section" : "home__hero-section darkBg"
          }
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
                  <p
                    className={
                      lightTextDesc
                        ? "home__hero-subtitle"
                        : "home__hero-subtitle dark"
                    }
                  >
                    {description}
                  </p>

                  <div className="input-areas">
                    <input
                      className="footer-input"
                      name="marketValue"
                      type="number"
                      min="1"
                      placeholder="Market Value"
                      value={1}
                      // onChange={}
                    />

                    <Button buttonSize="btn--wide" buttonColor="blue">
                      {buttonLabel}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="home__hero-img-wrapper">
                  <Zoom
                    in={true}
                    timeout={3000}
                    style={{ transitionDelay: true ? "1000ms" : "0ms" }}
                  >
                    <img src={img} alt={alt} className="home__hero-img" />
                  </Zoom>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InheritanceCalaculator;
