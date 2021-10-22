import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import "./FrontSection.css";
import { Link } from "react-router-dom";
import Zoom from "@material-ui/core/Zoom";

class InheritanceCalaculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      propertyAmount: "0",
      genderOfOwnInheritance: "Select Gender",
      father: "",
      mother: "",
      husband: "",
      wife: "",
      noOfSons: "0",
      noOfDaughters: "0",
      noOfPaternalBrothers: "0",
      noOfPaternalSister: "0",
      noOfMaternalBrothers: "0",
      noOfMaternalSister: "0",
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
                  <h1
                    className={
                      lightTextDesc
                        ? "home__hero-subtitle"
                        : "home__hero-subtitle dark"
                    }
                  >
                    {description}
                  </h1>

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

                    <InputLabel
                      style={{ marginTop: "20px" }}
                      id="demo-simple-select-label"
                    >
                      Gender of the person who owns the inheritance
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      fullWidth
                      name="genderOfOwnInheritance"
                      value={this.state.genderOfOwnInheritance}
                      label="Gender"
                      onChange={this.handleChange}
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                    </Select>

                    <InputLabel style={{ marginTop: "20px" }} id="idF">
                      Father
                    </InputLabel>
                    <Select
                      labelId="idF"
                      fullWidth
                      name="father"
                      value={this.state.father}
                      onChange={this.handleChange}
                    >
                      <MenuItem value={"No"}>No</MenuItem>
                      <MenuItem value={"Yes"}>Yes</MenuItem>
                    </Select>

                    <InputLabel style={{ marginTop: "20px" }} id="idM">
                      Mother
                    </InputLabel>
                    <Select
                      labelId="idM"
                      fullWidth
                      name="mother"
                      value={this.state.mother}
                      onChange={this.handleChange}
                    >
                      <MenuItem value={"No"}>No</MenuItem>
                      <MenuItem value={"Yes"}>Yes</MenuItem>
                    </Select>

                    <InputLabel style={{ marginTop: "20px" }} id="idHusb">
                      Husband
                    </InputLabel>
                    <Select
                      labelId="idHusb"
                      fullWidth
                      name="husband"
                      value={this.state.husband}
                      onChange={this.handleChange}
                    >
                      <MenuItem value={"No"}>No</MenuItem>
                      <MenuItem value={"Yes"}>Yes</MenuItem>
                    </Select>

                    <InputLabel style={{ marginTop: "20px" }} id="idW">
                      Wife
                    </InputLabel>
                    <Select
                      labelId="idW"
                      fullWidth
                      name="wife"
                      value={this.state.wife}
                      onChange={this.handleChange}
                    >
                      <MenuItem value={"No"}>No</MenuItem>
                      <MenuItem value={"Yes"}>Yes</MenuItem>
                    </Select>

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
                      style={{ marginTop: "20px", float: "right" }}
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
