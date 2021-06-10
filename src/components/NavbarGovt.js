import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import logo from "../components/logo.png";
import Cookies from 'universal-cookie';
import "./menu.css";

function Navbar() {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  const [name, setName] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    setName(cookies.get('username'))
  }, [cookies]);

    function logout() {
      
      cookies.remove('username')
      console.log(cookies.get('username'))
      window.location = '/home'
    } 
    

 return <Home />;


  

  function Home(props) {
    return (
      <>
        <IconContext.Provider value={{ color: "#fff" }}>
          <nav className="navbar">
            <div className="navbar-container container">
              <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                {/* <MdFingerprint className="navbar-icon" /> */}
                <img src={logo} alt="Logo" width="40" height="40" />
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
                    Create Land
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/properties"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Tax Wallet
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/requests"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Verify
                  </Link>
                </li>

                <div className="menu-container">
                  <button onClick={onClick} className="menu-trigger">
                    <span>Government</span>
                    <img
                      src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
                      alt="User avatar"
                    />
                  </button>
                  <nav
                    ref={dropdownRef}
                    className={`menu ${isActive ? "active" : "inactive"}`}
                  >
                    <ul>
                      <li>
                        <h5>{name}</h5>
                      </li>
                      <li>
                        <a href="/messages">Messages</a>
                      </li>
                      <li>
                        <a href="/trips">Trips</a>
                      </li>
                      <li>
                        <a href="/saved">Saved</a>
                      </li>
                      <li>
                      <Button buttonSize="btn--wide"  onClick={logout}>
                          Logout
                        </Button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </ul>
            </div>
          </nav>
        </IconContext.Provider>
      </>
    );
  }
}

export default Navbar;
