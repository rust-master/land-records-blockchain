import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import logo from "../components/logo.png";
import Cookies from "universal-cookie";
import "./menu.css";
import "../App.css";
import Web3 from "web3";
import contract from "../build/contracts/Auth.json";

const cookies = new Cookies();

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.showButton = this.showButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.closeMobileMenu = this.closeMobileMenu.bind(this);
    this.state = {
      isActive: false,
      name: false,
      balance: "",
      dropdownRef: null,
      click: false,
      button: true,
    };
  }

  componentWillMount() {
    console.log("isActive", this.state.isActive);

    if (this.state.isActive) {
      this.pageClickEvent();

      if (this.state.isActive) {
        window.addEventListener("click", this.state.pageClickEvent);
      }

      window.removeEventListener("click", this.state.pageClickEvent);
    }

    this.showButton();

    window.addEventListener("resize", this.showButton());

    this.setState({ name: cookies.get("checkIsAdmin") });
    console.log("name", this.state.name);

    this.getBalance();
  }

  onClick() {
    this.setState({ isActive: !this.state.isActive });
  }

  pageClickEvent(e) {
    if (
      this.state.dropdownRef.current !== null &&
      !this.state.dropdownRef.current.contains(e.target)
    ) {
      this.setState({ isActive: !this.state.isActive });
    }
  }

  handleClick() {
    this.setState({ click: !this.state.click });
  }

  closeMobileMenu() {
    this.setState({ click: false });
  }

  showButton() {
    if (window.innerWidth <= 960) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  }

  async getBalance() {
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
    this.setState({ balance: blnce });
  }

  // async function to logout

  async logout() {
    const web3 = window.web3;

    const webeProvider = new Web3(
      Web3.givenProvider || "http://localhost:7545"
    );
    const accounts = await webeProvider.eth.getAccounts();
    console.log("Account: " + accounts[0]);

    const netId = await web3.eth.net.getId();
    const deployedNetwork = contract.networks[netId];

    const authContract = new web3.eth.Contract(
      contract.abi,
      deployedNetwork.address
    );

    await authContract.methods
      .logoutAdmin(accounts[0])
      .send({ from: accounts[0] });

    const checkIsAdmin = await authContract.methods
      .checkIsAdminLogged(accounts[0])
      .call({ from: accounts[0] });

    console.log("checkIsAdmin : " + checkIsAdmin[0]);
    console.log("checkIsAdmin : " + checkIsAdmin[1]);

    cookies.remove("checkIsAdmin");
    console.log(cookies.get("checkIsAdmin"));
    window.location = "/";
  }

  render() {
    return (
      <div>
        <IconContext.Provider value={{ color: "#fff" }}>
          <nav className="navbar">
            <div className="navbar-container container">
              <Link
                to="/"
                className="navbar-logo"
                onClick={this.closeMobileMenu}
              >
                {/* <MdFingerprint className="navbar-icon" /> */}
                <img
                  src={logo}
                  alt="Logo"
                  className="App-logo"
                  width="40"
                  height="40"
                />
                &nbsp;&nbsp;{" "}
                <p>
                  <font color="#EF8E19">Blockchain</font> Land Records System
                </p>
              </Link>

              <div className="menu-icon" onClick={this.handleClick}>
                {this.state.click ? <FaTimes /> : <FaBars />}
              </div>
              <ul className={this.state.click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-links"
                    onClick={this.closeMobileMenu}
                  >
                    {" "}
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/show-all-lands"
                    className="nav-links"
                    onClick={this.closeMobileMenu}
                  >
                    All Lands
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/create-land"
                    className="nav-links"
                    onClick={this.closeMobileMenu}
                  >
                    Create Land
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/change-market-value"
                    className="nav-links"
                    onClick={this.closeMobileMenu}
                  >
                    Land Update
                  </Link>
                </li>

                <div className="menu-container">
                  <button onClick={this.onClick} className="menu-trigger">
                    <span>Government</span>
                    <img
                      src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
                      alt="User avatar"
                    />
                  </button>
                  <nav
                    ref={this.state.dropdownRef}
                    className={`menu ${
                      this.state.isActive ? "active" : "inactive"
                    }`}
                  >
                    <ul>
                      <li>
                        <h4 style={{ color: "red", padding: 10 }}>
                          {this.state.name}
                        </h4>
                      </li>
                      <li>
                        <h4 style={{ color: "#EF8E19" }}>
                          Balance: {this.state.balance} ETH
                        </h4>
                      </li>
                      <li>
                        <a href="/trips">Trips</a>
                      </li>
                      <li>
                        <a href="/saved">Saved</a>
                      </li>
                      <li>
                        <Button
                          buttonSize="btn--wide"
                          onClick={this.logout.bind(this)}
                        >
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
      </div>
    );
  }
}

export default Navbar;
