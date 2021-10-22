import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import "./FrontSection.css";
import { Link } from "react-router-dom";
import Zoom from "@material-ui/core/Zoom";

class InheritanceCalaculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      propertyAmount: "",
      genderOfOwnInheritance: "Select Gender",
      father: "",
      mother: "",
      wife: "",
      noOfSons: "",
      noOfDaughters: "",
      noOfPaternalBrothers: "",
      noOfPaternalSister: "",
      noOfMaternalBrothers: "",
      noOfMaternalSister: "",
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const lightBg = true;
    const lightTextDesc = false;
    const topLine = "Islamic Inheritance Calculator";
    const description = "Calaculate Inheritance";
    const buttonLabel = "Calculate";
    const imgStart = "";
    const img = "images/svg-1.svg";
    const alt = "Credit Card";

    return (
      <div>
        <div
          className={
            lightBg ? "home__hero-section" : "home__hero-section darkBg"
          }
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
                  <h2
                    className={
                      lightTextDesc
                        ? "home__hero-subtitle"
                        : "home__hero-subtitle dark"
                    }
                  >
                    {description}
                  </h2>

                  <div className="input-areas">
                    <TextField
                      color="secondary"
                      margin="dense"
                      name="propertyAmount"
                      label="Property Amount"
                      type="number"
                      value={this.state.propertyAmount}
                      onChange={this.handleChange}
                      fullWidth
                    />

                    <Select
                      fullWidth
                      name="genderOfOwnInheritance"
                      value={this.state.genderOfOwnInheritance}
                      label="Gender of the person who owns the inheritance"
                      onChange={this.handleChange}
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                    </Select>

                    <TextField
                      color="secondary"
                      margin="dense"
                      name="propertyAmount"
                      label="Father"
                      type="number"
                      value={this.state.propertyAmount}
                      onChange={this.handleChange}
                      fullWidth
                    />

                    <TextField
                      color="secondary"
                      margin="dense"
                      name="noOfSons"
                      label="Number of Sons"
                      type="number"
                      value={this.state.noOfSons}
                      onChange={this.handleChange}
                      fullWidth
                    />

                    <TextField
                      color="secondary"
                      margin="dense"
                      name="noOfDaughters"
                      label="Number of Daughters"
                      type="number"
                      value={this.state.noOfDaughters}
                      onChange={this.handleChange}
                      fullWidth
                    />

                    <TextField
                      color="secondary"
                      margin="dense"
                      name="noOfPaternalBrothers"
                      label="Number of Paternal Brothers"
                      type="number"
                      value={this.state.noOfPaternalBrothers}
                      onChange={this.handleChange}
                      fullWidth
                    />

                    <TextField
                      color="secondary"
                      margin="dense"
                      name="noOfPaternalSister"
                      label="Number of Paternal Sisters"
                      type="number"
                      value={this.state.noOfPaternalSister}
                      onChange={this.handleChange}
                      fullWidth
                    />

                    <TextField
                      color="secondary"
                      margin="dense"
                      name="noOfMaternalBrothers"
                      label="Number of Maternal Brothers"
                      type="number"
                      value={this.state.noOfMaternalBrothers}
                      onChange={this.handleChange}
                      fullWidth
                    />

                    <TextField
                      color="secondary"
                      margin="dense"
                      name="noOfMaternalSister"
                      label="Number of Maternal Sisters"
                      type="number"
                      value={this.state.noOfMaternalSister}
                      onChange={this.handleChange}
                      fullWidth
                    />

                    <Button
                      style={{ marginTop: "20px" }}
                      variant="contained"
                      color="primary"
                    >
                      {buttonLabel}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="home__hero-img-wrapper">
                  <Zoom
                    in={true}
                    timeout={3000}
                    style={{ transitionDelay: true ? "1000ms" : "0ms" }}
                  >
                    <img src={img} alt={alt} className="home__hero-img" />
                  </Zoom>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InheritanceCalaculator;
