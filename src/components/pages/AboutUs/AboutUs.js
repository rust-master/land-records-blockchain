import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import zaryab from "../AboutUs/zaryab.png";
import amir from "../AboutUs/amir.jpeg";
import zohaib from "../AboutUs/zohaib.jpeg";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  main: {
    marginLeft: 80,
    position: "relative",
  },
  root1: {
    backgroundColor: "#1C2237",
    maxWidth: 345,
    position: "absolute",
    marginLeft: 180,
  },
  root3: {
    backgroundColor: "#1C2237",
    maxWidth: 345,
    position: "relative",
    marginLeft: 850,
    marginTop: 40,
    marginBottom: 40,
  },
  root4: {
    backgroundColor: "#1C2237",
    margin: "0px auto",
    maxWidth: 345,
    marginTop: 40,
    marginBottom: 40,
  },
  Typo: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  TypoP: {
    color: "#fff",
    textAlign: "center",
  },
});

function AboutUs() {
  const classes = useStyles();

  return (
    <div style={{ backgroundColor: "#000" }}>
      <h1 style={{ textAlign: "center", color: "#ef8221", marginTop: "30px" }}>
        Project Development Team
      </h1>

      <Slide
        direction="right"
        in={true}
        timeout={3000}
        mountOnEnter
        unmountOnExit
      >
        <div className={classes.main}>
          <Card className={classes.root1}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                width="140"
                height="270"
                image={zaryab}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  className={classes.Typo}
                >
                  {"Muhammad Zaryab Rafique"}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.TypoP}
                >
                  Blockchain Developer
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card className={classes.root3}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                width="140"
                height="270"
                image={amir}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  className={classes.Typo}
                >
                  Expert Blockchain Consultant
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.TypoP}
                >
                  Expert Blockchain Consultant
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card className={classes.root4}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                width="140"
                height="270"
                image={zohaib}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h5"
                  className={classes.Typo}
                >
                  Muhammad Zohaib Arshad
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.TypoP}
                >
                  Blockchain Developer
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Slide>
    </div>
  );
}

export default AboutUs;
