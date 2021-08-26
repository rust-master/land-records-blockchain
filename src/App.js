import React, { Component } from "react";
import "./App.css";
import Home from "./components/pages/HomePage/Home";
import Properties from "./components/pages/Properties/Properties";
import Requests from "./components/pages/Requests/Requests";
import SignUp from "./components/pages/SignUp/SignUp";
import SignIn from "./components/pages/SignIn/SignIn";
import GovermentLogin from "./components/pages/GovermentLogin/GovtLogin";
import GovermentSignUp from "./components/pages/GovermentSignUp/GovtSignUp";
import SearchProperty from "./components/pages/SearchProperty/SearchProperty";
import RequestedLands from "./components/pages/RequestedLands/RequestedLands";
import Profile from "./components/pages/Profile/Profile";

import CreateLand from "./components/pages/CreateLand/CreatLand";
import ShowAllLands from "./components/pages/ShowAllLands/ShowAllLands";
import ChangeMarketValue from "./components/pages/ChangeMarketValue/ChangeMarketValue";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NavbarGovt from "./components/NavbarGovt";
import Footer from "./components/pages/Footer.js/Footer";
import ReactLoading from "react-loading";
import TextTransition, { presets } from "react-text-transition";
import Web3 from "web3";

import Cookies from "universal-cookie";

const cookiesAdmin = new Cookies();
const cookiesUser = new Cookies();

console.log(cookiesAdmin.get("checkIsAdmin"));
console.log(cookiesUser.get("checkIsUserLogged"));

const TEXTS = [
  "Land Records System",
  // "| Secure",
  // "| DApp",
  // "| Smart Contracts",
  // "| Ethereum",
  // "| Solidity",
];

class App extends Component {
  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), 400);
  }

  async componentWillMount() {
    setInterval(() => {
      this.setState({
        loading: false,
        index: 1,
      });
    }, 8000);
    await this.loadWeb3();
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      window.location.href =
        "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";
    }
  }

    state = {
      index: 0,
      loading: true,
      cookieAdmin: cookiesAdmin.get("checkIsAdmin"),
      cookieUser: cookiesUser.get("checkIsUserLogged"),
    };

  timer() {
    this.setState({
      index: this.state.index + 1,
    });
    if (this.state.index > 6) {
      clearInterval(this.intervalId);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div className="App" height={"100%"}>
            <ReactLoading
              type={"cubes"}
              color={"#EF8E19"}
              loading={this.state.loading}
              height={"20%"}
              width={"20%"}
            />
            <h1
              className="Textblock"
              style={{ fontSize: 45, marginBottom: 10 }}
            >
              Blockchain
            </h1>
            <h1 className="Textland" style={{ fontSize: 45, marginBottom: 10 }}>
              <TextTransition
                text={TEXTS[this.state.index % TEXTS.length]}
                springConfig={presets.wobbly}
              />
            </h1>
            <ReactLoading
              type={"bars"}
              color={"#EF8E19"}
              loading={this.state.loading}
              height={"20%"}
              width={"20%"}
            />
          </div>
        ) : (
          <Router>
            {this.state.cookieAdmin ? <NavbarGovt /> : <Navbar />}

            <Switch>
              <Route path="/" exact component={Home} />
              {/* <Route path="/services" component={Services} />
              <Route path="/products" component={Products} />
              <Route path="/sign-in" component={SignIn} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/search-property" component={SearchProperty} /> */}
              {this.state.cookieUser ? (
                <Route path="/properties" component={Properties} />
              ) : (
                <Route path="/sign-in" component={SignIn} />
              )}
              {this.state.cookieUser ? (
                <Route path="/search-property" component={SearchProperty} />
              ) : (
                <Route path="/sign-in" component={SignIn} />
              )}
              {this.state.cookieUser ? (
                <Route path="/requests" component={Requests} />
              ) : (
                <Route path="/sign-in" component={SignIn} />
              )}
              {this.state.cookieUser ? (
                <Route path="/properties" component={Properties} />
              ) : (
                <Route path="/sign-up" component={SignUp} />
              )}
              {this.state.cookieUser ? (
                <Route path="/requested-lands" component={RequestedLands} />
              ) : (
                <Route path="/sign-up" component={SignUp} />
              )}
                {this.state.cookieUser ? (
                <Route path="/profile" component={Profile} />
              ) : (
                <Route path="/sign-up" component={SignUp} />
              )}

              {this.state.cookieAdmin ? (
                <Route path="/create-land" component={CreateLand} />
              ) : (
                <Route path="/goverment-login" component={GovermentLogin} />
              )}

              {this.state.cookieAdmin ? (
                <Route path="/show-all-lands" component={ShowAllLands} />
              ) : (
                <Route path="/goverment-login" component={GovermentLogin} />
              )}

              {this.state.cookieAdmin ? (
                <Route
                  path="/change-market-value"
                  component={ChangeMarketValue}
                />
              ) : (
                <Route path="/goverment-signup" component={GovermentSignUp} />
              )}
            </Switch>
            <Footer />
          </Router>
        )}
      </div>
    );
  }
}

export default App;
