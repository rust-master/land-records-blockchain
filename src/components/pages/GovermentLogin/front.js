import React, { Component } from "react";
import "./FrontSection.css";
import { Button } from "../../Button";
import { Link } from "react-router-dom";
import fire from "../fire";

class GovermentLogin extends Component {

  constructor(props) {
    super(props);
    // this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.signup = this.signup.bind(this);
    this.state = {
      email: "",
      password: "",
    };
  }

  // login(e) {
  //   e.preventDefault();
  //   fire
  //     .auth()
  //     .signInWithEmailAndPassword(this.state.email, this.state.password)
  //     .then((u) => {
  //       console.log(u);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

      
  // }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <>
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
                  <div className="top-line">{"GOVERTMENT SIGN IN"}</div>
                  <h1 className={true ? "heading" : "heading dark"}>
                    {"Blockchain based Land Records System"}
                  </h1>
                  <div className="input-areas">
                    <form>
                      <input
                        className="footer-input"
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        onChange={this.handleChange}
                        value={this.state.email}
                      />
                      <input
                        className="footer-input"
                        name="password"
                        type="password"
                        placeholder="Your Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                    </form>
                    <Link to="/sign-up" className="btn-link" >
                    <div class="btnGoverment">
                        <Button buttonSize="btn--wide" buttonColor="red">
                          Goverment Sign In
                        </Button>
                      </div>
                    </Link>  
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="home__hero-img-wrapper">
                  <img
                    src={"images/svg-6.svg"}
                    alt={"Credit Card"}
                    className="home__hero-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
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
    return <GovermentLogin />;
  }

  return (
    <>
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
    </>
  );
}

export default FrontSection;
