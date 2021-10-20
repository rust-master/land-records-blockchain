import React from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import Zoom from "@material-ui/core/Zoom";

class InheritanceCalaculator extends React.Component {
  render() {
    const lightBg = false;
    const lightText = true;
    const lightTextDesc = true;
    const topLine = 'Exclusive Access';
    const headline = 'Unlimited Transactions with gas fees';
    const description =
      'Get access to our exclusive diamond card that allows you to  send unlimited transactions without getting charged any fees',
    const buttonLabel = 'Get Started';
    const imgStart = '';
    const img = 'images/svg-1.svg';
    const alt = 'Credit Card';

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
                  <h1 className={lightText ? "heading" : "heading dark"}>
                    {headline}
                  </h1>
                  <p
                    className={
                      lightTextDesc
                        ? "home__hero-subtitle"
                        : "home__hero-subtitle dark"
                    }
                  >
                    {description}
                  </p>
                  <Link to="/sign-up">
                    <Button buttonSize="btn--wide" buttonColor="blue">
                      {buttonLabel}
                    </Button>
                  </Link>
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

export default ImgMediaCard;
