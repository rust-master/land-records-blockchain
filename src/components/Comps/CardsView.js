import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '../Comps/growing.png';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    main:{

        position: 'relative',
    },
    root1: {
        backgroundColor: '#1C2237',
        maxWidth: 345,
        position: 'absolute',
        marginLeft: 40,
    },
    root2:{
        maxWidth: 345,
        position: 'absolute',
        marginLeft: 400,
        backgroundColor: '#1C2237',
        marginBottom:40,
    },
    root3:{
        backgroundColor: '#1C2237',
        maxWidth: 345,
        position: 'relative',
        marginLeft: 760,
        marginTop: 40,
        marginBottom:40,
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

export default function ImgMediaCard() {
    const classes = useStyles();

    return (
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
                        109,190
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
                        image={logo}
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
    );
}