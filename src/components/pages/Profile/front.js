import React, { Component } from "react";
import "./FrontSection.css";
import { Button } from "../../Button";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import fire from "../fire";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Profile extends Component {
  componentWillMount() {
    this.loadFirebaseData();
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.changeProfile = this.changeProfile.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      name: "",
      email: "",
      password: "",
      open: false,
      openi: false,
      errori: "",
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
    try {
    e.preventDefault();

    const uid = fire.auth().currentUser.uid;
    const database = fire.database();
    const ref = database.ref("users").child(uid);
    ref.update({'name': this.state.name})

    this.setState({ open: true });
    } catch (e) {
      this.setState({ openi: true });
      this.setState({ errori: e.toString() });
      console.log("Exception: " + e);
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleClose(e, r) {
    if (r === "clickaway") {
      return;
    }

    this.setState({ open: false });
    this.setState({ openi: false });
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
                          disabled="true"
                          placeholder="Your Password"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </div>

                      <Button
                        style={{ marginLeft: "200px" }}
                        buttonSize="btn--wide"
                        buttonColor="blue"
                        onClick={this.changeProfile}
                      >
                        Save
                      </Button>
                    </form>

                    <Snackbar
                      open={this.state.open}
                      autoHideDuration={6000}
                      onClose={this.handleClose}
                    >
                      <Alert onClose={this.handleClose} severity="success">
                        Profile Change successfully
                        {this.state.CurrentOwner}
                      </Alert>
                    </Snackbar>

                    <Snackbar
                      open={this.state.openi}
                      autoHideDuration={6000}
                      onClose={this.handleClose}
                    >
                      <Alert onClose={this.handleClose} severity="error">
                        {this.state.errori}
                      </Alert>
                    </Snackbar>

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
