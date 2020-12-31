import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid'
import Card from '../Card/Card';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'
import _ from 'lodash'
const useStyles = makeStyles((theme) => ({
    cardDisplay: {
        margin: '10px'
    },
    cardDetails: {
        width: '100%',
        height: '100%'
    },
    attrTitle: {
        fontWeight: 'bold',
        textTransform: 'capitalize'
    }
}));

const CardDetailsView = (props) => {
    const ATTRIBUTES = ['name', 'supertype', 'subtype', 'types', 'rarity', 'set']
    const classes = useStyles()
    const { card } = props
    console.log(card)
    const handleCardSelected = () => {
        return
    }

    return (
        <div className={classes.cardDisplay}>
            <Grid container spacing={2} item xs={12} justify="center" >
                <Grid item>
                    <Card key={card.id} card={card} height="600px" width="450px" onSelected={handleCardSelected} />
                </Grid>
                <Grid item xs={2}>
                <Paper className={classes.cardDetails}>
                    <Grid container xs={12} direction="column" >
                        {ATTRIBUTES.map(attr => {
                            return (
                                <Grid item ><Typography><span className={classes.attrTitle}>{attr}: </span>{_.isNull(card[attr]) ? <em>N/A</em> : card[attr]}</Typography></Grid>
                            )
                        })}
                    </Grid>
                </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default CardDetailsView;