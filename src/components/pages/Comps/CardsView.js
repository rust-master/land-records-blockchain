import React, {useState, useEffect} from 'react';
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


    // write async function inside useEffect
    useEffect(() => {
        async function getTotalIDs() {
            const web3 = window.web3
            const webeProvider = new Web3(Web3.givenProvider || "http://localhost:7545")
            const accounts = await webeProvider.eth.getAccounts()
         
            const landCon = new web3.eth.Contract(contract.abi, "0xc268D1cf5B568dDD50cB0728b2290Fd81E3E00a0")
            const allLandsIDs = await lan
            settotalIDs(result);
        }
        getTotalIDs();

    }, []);


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
                                {totalIDs}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.TypoP}>
                                Property Transferred In Punjab-2021
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
                                309,513
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.TypoP}>
                                Property Transferred In Punjab-2020
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
                                359,972
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" className={classes.TypoP}>
                                Property Transferred In Punjab-2019
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </Slide>
    );
}

export default ImgMediaCard;