import React, { Component } from "react";
import "./FrontSection.css";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class RequestsFront extends Component {

  render() {
    return (
      <>
        <div
          className={false ? "home__hero-section" : "home__hero-section darkBg"}
        >
          <div className="container">
            <div
              className="row home__hero-row"
              style={{
                display: "flex",
                flexDirection: "" === "start" ? "row-reverse" : "row",
              }}
            >
              <div className="col">
                <div className="home__hero-text-wrapper">
                  <div className="top-line">{"VIEW REQUESTS"}</div>
                  <h1 className={true ? "heading" : "heading dark"}>
                    {"Requests"}
                  </h1>
                  <div className="input-areas">
                    <div>
                      <Card className={makeStyles({
                        maxWidth: 345,
                      })}>
                        <CardActionArea>
                          <CardContent>
                            <Typography gutterBottom variant="h4" component="h2">
                              Property No: 1234
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              Value: 20 Ether
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              Location: Sahiwal
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              Measurements: 120 sq/ft
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" variant="contained" color="secondary">
                            Reject
                          </Button>
                          <Button size="small" variant="contained" color="primary" >
                            Accept
                          </Button>
                        </CardActions>
                      </Card>
                    </div>

                    <div style={{ marginTop: 40 }}>
                      <Card className={makeStyles({
                        maxWidth: 345,
                      })}>
                        <CardActionArea>
                          <CardContent>
                            <Typography gutterBottom variant="h4" component="h2">
                              Property No: 2334
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              Value: 40 Ether
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              Location: Lahore
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              Measurements: 110 sq/ft
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" variant="contained" color="secondary">
                            Reject
                          </Button>
                          <Button size="small" variant="contained" color="primary" >
                            Accept
                          </Button>
                        </CardActions>
                      </Card>
                    </div>

                    <div style={{ marginTop: 40 }}>
                      <Card className={makeStyles({
                        maxWidth: 345,
                      })}>
                        <CardActionArea>
                          <CardContent>
                            <Typography gutterBottom variant="h4" component="h2">
                              Property No: 1454
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              Value: 20 Ether
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              Location: Sahiwal
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              Measurements: 120 sq/ft
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" variant="contained" color="secondary">
                            Reject
                          </Button>
                          <Button size="small" variant="contained" color="primary" >
                            Accept
                          </Button>
                        </CardActions>
                      </Card>
                    </div>

                    <div style={{ marginTop: 40 }}>
                      <Card className={makeStyles({
                        maxWidth: 345,
                      })}>
                        <CardActionArea>
                          <CardContent>
                            <Typography gutterBottom variant="h4" component="h2">
                              Property No: 2554
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              Value: 30 Ether
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              Location: Karachi
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              Measurements: 130 sq/ft
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" variant="contained" color="secondary">
                            Reject
                          </Button>
                          <Button size="small" variant="contained" color="primary" >
                            Accept
                          </Button>
                        </CardActions>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="home__hero-img-wrapper">
                  <img
                    src={"images/svg-2.svg"}
                    alt={"Credit Card"}
                    className="home__hero-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function FrontSection({
  lightBg,
  topLine,
  lightText,
  headline,
  buttonLabel,
  form,
  img,
  alt,
  imgStart,
}) {
  if (form) {
    return <RequestsFront />;
  }

  return (
    <>
      <div
        className={lightBg ? "home__hero-section" : "home__hero-section darkBg"}
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
                <h1 className={lightText ? "heading" : "heading dark"}>
                  {headline}
                </h1>

                <Link to="/sign-up">
                  <Button buttonSize="btn--wide" buttonColor="blue">
                    {buttonLabel}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="home__hero-img-wrapper">
                <img src={img} alt={alt} className="home__hero-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FrontSection;
