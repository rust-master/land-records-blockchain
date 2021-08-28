import React, { useState, useEffect, useRef } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
//import { MdFingerprint } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import logo from "../components/logo.png";

import "./menu.css";
import "../App.css";
import Web3 from "web3";
import Cookies from "universal-cookie";

function Navbar() {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  const [name, setName] = useState(false);
  const [profileLink, setprofileLink] = useState(false);
  const [balance, setbalance] = useState("");

  const cookies = new Cookies();

  useEffect(() => {
    const pageClickEvent = (e) => {
      // If the active element exists and is clicked outside of
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsActive(!isActive);
      }
    };

    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isActive]);

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };




  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return {
      // window.removeEventListener('resize', showButton)
    };
  }, []);

  // Getting Balance of MetaMask Account
  useEffect(() => {
    async function getBalance() {
      const web3 = window.web3;
      const webeProvider = new Web3(
        Web3.givenProvider || "http://localhost:7545"
      );
      const accounts = await webeProvider.eth.getAccounts();

      const blnce = web3.utils.fromWei(
        await web3.eth.getBalance(accounts[0]),
        "ether"
      );
      console.log(blnce);
      setbalance(blnce);
    }
    getBalance();

    setName(cookies.get("Username"));

  }, []);

  if (cookies.get("checkIsUser")) {
    console.log("checkIsUser: ", cookies.get("checkIsUser"));

    return <Home />;
  } else {
    console.log("checkIsUser: ", cookies.get("checkIsUser"));
    return <LoginSignUp />;
  }

  function Home(props) {
    return (
      <div>
        <IconContext.Provider value={{ color: "#fff" }}>
          <nav className="navbar">
            <div className="navbar-container container">
              <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                {/* <MdFingerprint className="navbar-icon" /> */}
                <img
                  src={logo}
                  className="App-logo"
                  alt="Logo"
                  width="40"
                  height="40"
                />
                &nbsp;&nbsp;{" "}
                <p>
                  <font color="#EF8E19">Blockchain</font> Land Records System
                </p>
              </Link>
              <div className="menu-icon" onClick={handleClick}>
                {click ? <FaTimes /> : <FaBars />}
              </div>
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                    {" "}
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/search-property"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Explore
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/properties"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Properties
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/requests"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Requests
                  </Link>
                </li>

                <div className="menu-container">
                  <button onClick={onClick} className="menu-trigger">
                    <span>User</span>
                    <img
                      width="40"
                      height="40"
                      src={profileLink}
                      alt="User avatar"
                    />
                  </button>
                  <nav
                    ref={dropdownRef}
                    className={`menu ${isActive ? "active" : "inactive"}`}
                  >
                    <ul>
                      <li>
                        <h3 style={{ color: "#35A246" }}>{name}</h3>
                      </li>
                      <li>
                        <h4 style={{ color: "#EF8E19" }}>
                          Balance: {balance} ETH
                        </h4>
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          className="nav-links"
                          onClick={closeMobileMenu}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/requested-lands"
                          className="nav-links"
                          onClick={closeMobileMenu}
                        >
                          Requested Lands
                        </Link>
                      </li>
                      <li>
                        {button ? (
                          <Link to="/">
                            <Button
                              buttonSize="btn--wide"
                              onClick={() => fire.auth().signOut()}
                            >
                              Sign Out
                            </Button>
                          </Link>
                        ) : (
                          <Link to="/">
                            <Button
                              buttonSize="btn--wide"
                              onClick={() => fire.auth().signOut()}
                            >
                              Sign Out
                            </Button>
                          </Link>
                        )}
                      </li>
                    </ul>
                  </nav>
                </div>
              </ul>
            </div>
          </nav>
        </IconContext.Provider>
      </div>
    );
  }

  function LoginSignUp(props) {
    return (
      <div>
        <IconContext.Provider value={{ color: "#fff" }}>
          <nav className="navbar">
            <div className="navbar-container container">
              <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                {/* <MdFingerprint className="navbar-icon" />
                Blockchain Land Records System */}
                {/* <img src={logo} alt="Logo" width="40" height="40" />&nbsp;<p style={{ color: '#EF8E19' }}>Blockchain</p> &nbsp; <p>Land Records System</p> */}
                <img
                  src={logo}
                  className="App-logo"
                  alt="Logo"
                  width="40"
                  height="40"
                />{" "}
                &nbsp;&nbsp;{" "}
                <p>
                  <font color="#EF8E19">Blockchain</font> Land Records System
                </p>
              </Link>
              <div className="menu-icon" onClick={handleClick}>
                {click ? <FaTimes /> : <FaBars />}
              </div>
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                    Home
                  </Link>
                </li>

                <li className="nav-btn">
                  {button ? (
                    <Link to="/sign-in" className="btn-link">
                      <Button buttonStyle="btn--outline">SIGN IN</Button>
                    </Link>
                  ) : (
                    <Link to="/sign-in" className="btn-link">
                      <Button
                        buttonStyle="btn--outline"
                        buttonSize="btn--mobile"
                        onClick={closeMobileMenu}
                      >
                        SIGN IN
                      </Button>
                    </Link>
                  )}
                </li>
                <li className="nav-btn">
                  {button ? (
                    <Link to="/sign-up" className="btn-link">
                      <Button buttonStyle="btn--outline">SIGN UP</Button>
                    </Link>
                  ) : (
                    <Link to="/sign-up" className="btn-link">
                      <Button
                        buttonStyle="btn--outline"
                        buttonSize="btn--mobile"
                        onClick={closeMobileMenu}
                      >
                        SIGN UP
                      </Button>
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </nav>
        </IconContext.Provider>
      </div>
    );
  }
}

export default Navbar;
