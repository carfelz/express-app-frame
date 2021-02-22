import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CartContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import img from './../assets/img/unicornbike.jpg'

const useStyle = makeStyles( theme => ({
    card:{
        maxWidth: 500,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title:{
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    media:{
        minHeight: 400
    }
}))

export default function Home(){
    const classes = useStyle()
    return(
        <Card className={classes.card}>
            <Typography variant="h6" className={classes.title}>
                Home page
            </Typography>
            <CardMedia className={classes.media} image={img} title="Unicorn Bicycle"/>
            <CartContent>
                <Typography variant="body2" component="p">
                    Welcome to the MERN Skeleton home page
                </Typography>
            </CartContent>
        </Card>
    )
}