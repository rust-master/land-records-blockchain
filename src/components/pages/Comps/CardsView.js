import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '../Comps/growing.png';
import logo1 from '../Comps/decreasing.png';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Web3 from "web3";
import contract from "../../../build/contracts/Land.json";

const useStyles = makeStyles({
    main: {

        position: 'relative',
    },
    root1: {
        backgroundColor: '#1C2237',
        maxWidth: 345,
        position: 'absolute',
        marginLeft: 100,
    },
    root2: {
        maxWidth: 345,
        position: 'absolute',
        marginLeft: 480,
        backgroundColor: '#1C2237',
        marginBottom: 40,
    },
    root3: {
        backgroundColor: '#1C2237',
        maxWidth: 345,
        position: 'relative',
        marginLeft: 860,
        marginTop: 40,
        marginBottom: 40,
    },
    Typo: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    TypoP: {
        color: '#fff',
        textAlign: 'center',
    },
});

function ImgMediaCard() {
    const classes = useStyles();

    const [totalIDs, settotalIDs] = useState([]);

    useEffect(() => {
        async function getToken() {
            const web3 = window.web3
            const webeProvider = new Web3(Web3.givenProvider || "http://localhost:7545")
            const accounts = await webeProvider.eth.getAccounts()

            const landCon = new web3.eth.Contract(contract.abi, "0x30dD1a044975bc0E555c7a6aF5eBeA12Aa8D47A0")
            const allLandsIDs = await landCon.methods.getAllLands().call({ from: accounts[0] })

            settotalIDs(allLandsIDs)
            console.log("Total IDs: " + allLandsIDs.length)
        }
        getToken();
    }, [])

    return (
        <Slide direction="right" in={true} timeout={3000} mountOnEnter unmountOnExit>

            <div className={classes.main}>
                <Card className={classes.root1}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            width="140"
                            height="270"
                            image={logo}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h3" component="h2" className={classes.Typo}>
                                {totalIDs.length ? totalIDs.length : "No Land"}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.TypoP}>
                                Total Registered Lands In Pakistan-2021
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
                            image={logo1}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h3" component="h2" className={classes.Typo}>
                                No Land
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.TypoP}>
                                Total Registered Lands In Pakistan-2020
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
                            image={logo}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h3" component="h2" className={classes.Typo}>
                                No Land
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.TypoP}>
                                Total Registered Lands In Pakistan-2019
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </Slide>
    );
}

export default ImgMediaCard;