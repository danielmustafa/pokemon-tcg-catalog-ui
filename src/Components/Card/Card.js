import React from 'react';
import styles from './Card.module.css'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex'
    },
  }));
const Card = (props) => {
    const classes  = useStyles()
    const { onSelected, card } = props


    const handleClicked = (event) => {
        onSelected(card)
        event.stopPropagation()
    }

    return (
             <Paper className={classes.paper} square elevation={3} >
                    <img style={{height: props.height, width: props.width}} src={card.imageUrlHiRes} alt={props.name} onClick={ handleClicked } />
            </Paper>
    );
};

export default Card;