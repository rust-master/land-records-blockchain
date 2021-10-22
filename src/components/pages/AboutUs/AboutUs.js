import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import zaryab from "../AboutUs/zaryab.png";
import amir from "../AboutUs/amir.jpeg";
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
    marginLeft: 100,
  },
  root2: {
    maxWidth: 345,
    position: "absolute",
    marginLeft: 480,
    backgroundColor: "#1C2237",
    marginBottom: 40,
  },
  root3: {
    backgroundColor: "#1C2237",
    maxWidth: 345,
    position: "relative",
    marginLeft: 860,
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
        <Card className={classes.root2}>
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
                Mr. Amir Ali Rizvi
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
  );
}

export default AboutUs;
