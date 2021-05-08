import React, { useState, useEffect, Component } from "react";
import "./App.css";
import Home from "./components/pages/HomePage/Home";
import Services from "./components/pages/Services/Services";
import Products from "./components/pages/Products/Products";
import SignUp from "./components/pages/SignUp/SignUp";
import SignIn from "./components/pages/SignIn/SignIn";
import fire from '../src/components/pages/fire'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/pages/Footer.js/Footer";
import ReactLoading from "react-loading";
import TextTransition, { presets } from "react-text-transition";
// import Web3 from "web3";
// import { render } from "@testing-library/react";

const TEXTS = [
  "Land Records System",
  "| Secure",
  "| DApp",
  "| Smart Contracts",
  "| Ethereum",
  "| Solidity",
];

class App extends Component {

  constructor(props)
  {
    super(props);
    this.state={
      user : {}
    }
  }

  componentDidMount() {
    this.authListener();
    this.intervalId = setInterval(this.timer.bind(this), 1000);
  }

  authListener(){
    fire.auth().onAuthStateChanged((user)=>{
      if(user)
      {
        this.setState({user})
      }
      else{
        this.setState({user : null})
      }
    })
  }


  async componentWillMount() {
    setInterval(() => {
      this.setState({
        loading: false,
        index: 1,
      });
    }, 8000);
    // await this.loadWeb3();
  }
  // async loadWeb3() {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum);
  //     await window.ethereum.enable();
  //   } else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider);
  //   } else {
  //     window.alert(
  //       "Non-Ethereum browser detected. You should consider trying MetaMask!"
  //     );
  //   }
  // }

  state = {
    index: 0,
    loading: true,
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
            <h1 className="Textblock">Blockchain</h1>
            <h1 className="Textland">
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
            <Navbar />
            <Switch>
            {this.state.user ? (<Route path="/" exact component={Home} />) :  (<Route path="/sign-in" component={SignIn} />)}
            {this.state.user ? (<Route path="/services" component={Services} />) : (<Route path="/sign-up" component={SignUp} />)}
            {this.state.user ? ((<Route path="/products" component={Products} />)) : (<Route path="/sign-up" component={SignUp} />)}
            {/* {this.state.user ? (<Route path="/" exact component={Home} />) : (<Route path="/sign-in" component={SignIn} />)} */}
            
              
              
              
              
            </Switch>
            <Footer />
          </Router>
        )}
      </div>
    );
  }
}

export default App;
