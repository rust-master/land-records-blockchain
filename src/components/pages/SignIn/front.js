import React, { Component } from "react";
import "./FrontSection.css";
import { Button } from "../../Button";
import { Link } from "react-router-dom";
import fire from "../fire";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class UserSignIn extends Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    
    this.state = {
      email: "",
      password: "",
      open: false,
      openi: false,
      errori: "",
    };
  }

  login(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        this.setState({ open: true })
        console.log(u);
        window.location = "/";
      })
      .catch((err) => {
        this.setState({ errori: "Login Failed" })
        console.log(err);
        this.setState({ openi: true })
      });

  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleClose(e, r) {
    if (r === 'clickaway') {
      return;
    }

    this.setState({ open: false })
    this.setState({ openi: false })
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
                  <div className="top-line">{"SIGN IN TODAY"}</div>
                  <h1 className={true ? "heading" : "heading dark"}>
                    {"BLRS Secure Your Records"}
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

                      <Button
                        buttonSize="btn--wide"
                        buttonColor="blue"
                        onClick={this.login}
                      >
                        Sign In
                      </Button>

                    </form>


                    <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                      <Alert onClose={this.handleClose} severity="success">
                        Login successfully. Email: {this.state.email}
                      </Alert>
                    </Snackbar>

                    <Snackbar open={this.state.openi} autoHideDuration={6000} onClose={this.handleClose}>
                      <Alert onClose={this.handleClose} severity="error">
                        Error: {this.state.errori}
                      </Alert>
                    </Snackbar>


                    <Link to="/goverment-login" className="btn-link" >
                      <div class="btnGoverment">
                        <Button buttonSize="btn--wide" buttonColor="red">
                          Government Sign In
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
    return <UserSignIn />;
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
