import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { MdFingerprint } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import logo from '../components/logo.png';
import fire from "../components/pages/fire";

function Navbar() {
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

  const [user, setUser] = useState(null)

  useEffect(() => {
    fire.auth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
  }, []);

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return {
      // window.removeEventListener('resize', showButton)
    };
  }, []);

  if (user != null) {
    console.log("User: ", { user });
    return (<Home />);
  } else {
    console.log("User: ", { user });
    return (<LoginSignUp />);
  }

  function Home(props) {
    return (
      <>
        <IconContext.Provider value={{ color: "#fff" }}>
          <nav className="navbar">
            <div className="navbar-container container">
              <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                {/* <MdFingerprint className="navbar-icon" /> */}
                <img src={logo} alt="Logo" width="40" height="40" />&nbsp;<p style={{ color: '#EF8E19' }}>Blockchain</p> &nbsp; <p>Land Records System</p>
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

                <li className="nav-btn">
                  {button ? (
                    <Link to="/" className="btn-link">
                      <Button
                        buttonStyle="btn--outline"
                        onClick={() => fire.auth().signOut()}
                      >
                        SIGN OUT
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/" className="btn-link">
                      <Button
                        buttonStyle="btn--outline"
                        buttonSize="btn--mobile"
                        onClick={() => fire.auth().signOut()}
                      >
                        SIGN OUT
                      </Button>
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </nav>
        </IconContext.Provider>
      </>
    );
  }

  function LoginSignUp(props) {
    return (
      <>
        <IconContext.Provider value={{ color: "#fff" }}>
          <nav className="navbar">
            <div className="navbar-container container">
              <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                {/* <MdFingerprint className="navbar-icon" />
                Blockchain Land Records System */}
                <img src={logo} alt="Logo" width="40" height="40" />&nbsp;<p style={{ color: '#EF8E19' }}>Blockchain</p> &nbsp; <p>Land Records System</p>

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
      </>
    );
  }
}

export default Navbar;
