import React, { Component } from "react";
import "./FrontSection.css";
import { Button } from "../../Button";
import { Link } from "react-router-dom";
import fire from "../fire";

class Profile extends Component {

  componentWillMount() {
    this.loadFirebaseData();
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.changeProfile = this.changeProfile.bind(this);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  loadFirebaseData() {
  try {
      const uid = fire.auth().currentUser.uid;
      const database = fire.database();
      const ref = database.ref("users").child(uid);
      ref.on("value", (snapshot) => {
        console.log("FireB ", snapshot);
        if (snapshot && snapshot.exists()) {
          this.setState({ name: snapshot.val().name });
          this.setState({ email: snapshot.val().email });
          this.setState({ password: snapshot.val().password });
        }
      });
    } catch (e) {
      console.log("Exception: " + e);
    }
  }

  changeProfile(e) {
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
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
                <div className="home__hero-img-wrapper">
                  <img
                    src={"images/svg-6.svg"}
                    alt={"Credit Card"}
                    className="home__hero-img"
                  />
                </div>
              </div>
              <div className="col">
                <div className="home__hero-text-wrapper">
                  <div className="top-line">{"Profle"}</div>
                  <h1 className={true ? "heading" : "heading dark"}>
                    {"BLRS Profile"}
                  </h1>
                  <div className="input-areas">
                    <form>
                      <div>
                        <input
                          style={{ width: "100%" }}
                          className="footer-input"
                          name="name"
                          type="text"
                          placeholder="Your Name"
                          onChange={this.handleChange}
                          value={this.state.name}
                        />
                      </div>
                      <div>
                        <input
                          style={{ width: "100%" }}
                          className="footer-input"
                          name="email"
                          type="email"
                          disabled="true"
                          placeholder="Your Email"
                          onChange={this.handleChange}
                          value={this.state.email}
                        />
                      </div>
                      <div>
                        <input
                          style={{ width: "100%" }}
                          className="footer-input"
                          name="password"
                          type="password"
                          placeholder="Your Password"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </div>

                      <Button
                        style={{ float: "right" }}
                        buttonSize="btn--wide"
                        buttonColor="blue"
                        onClick={this.changeProfile}
                      >
                        Sign Up
                      </Button>
                    </form>
                  </div>
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
    return <Profile />;
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
