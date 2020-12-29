import { React, useState, useEffect } from 'react';
import { TextField, InputLabel, MenuItem, Select, FormControl, Button, Box, Grid, makeStyles } from '@material-ui/core'
import PokemonGQLClient from '../../Client/PokemonGQL/PokemonGQLClient'
const useStyles = makeStyles((theme) => ({
}));

const Search = (props) => {
    const classes = useStyles()
    const [formState, setFormState] = useState({ pageSize: 10 })
    const [cardSets, setCardSets] = useState([])
    const client = new PokemonGQLClient('http://localhost:4000')

    useEffect(() => {
        client.getSets()
            .then(results => {
                let setNames = []
                results.data.sets.forEach(set => {
                    setNames.push(set.name)
                })

                setNames.sort()
                setCardSets(setNames)
            })
    }, [])

    const handleChanged = (event) => {
        console.log(event)
        var value = event.target.value
        if (!isNaN(parseInt(value))) {
            //Change value to numeric if it is
            value = parseInt(value)
        }

        setFormState({
            ...formState,
            [event.target.name]: value
        })
        console.log(event)
    }

    const handleSearchClicked = (event) => {
        props.onSearching()
        client.getCards(formState)
            .then(results => {
                console.log(results)
                props.handleSearch(results.data.cards)
            })
            .catch(err => {
                console.log(err)
                props.handleSearch([], "No Results Found")
            })
        event.preventDefault();
    }

    const handleClearClicked = (event) => {
        props.handleSearch([], "")
        setFormState({ pageSize: 10 })
    }

    return (
        <div>
            <form onSubmit={handleSearchClicked} className={classes.formControl}>
                <Box margin="10px">
                <Grid container direction="column" spacing={2} >
                    <Grid item xs={2}>
                        <TextField fullWidth name="name" id="name" label="Card Name: " onChange={handleChanged} placeholder="slazzle, professor's letter..."></TextField>
                    </Grid>
                    <Grid item xs={2} >
                    <FormControl fullWidth >
                        <InputLabel id="cardSetName-label">Search by Set: </InputLabel>
                        <Select labelId="cardSetName-label" id="set" name="set" value={formState.set == undefined ? '': formState.set} onChange={handleChanged}>
                            {cardSets.map((setName, index) => {
                                return <MenuItem key={`${setName}-${index}`} value={setName}>{setName}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={1}>
                    <FormControl fullWidth >
                        <InputLabel id="pageSize-label">Limit Results: </InputLabel>
                        <Select labelId="pageSize-label" id="pageSize" name="pageSize" value={formState.pageSize} onChange={handleChanged}>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item >
                        <Box>
                        <Button type="submit" variant="contained" color="primary">Search</Button>
                        <Button type="button" variant="contained" color="secondary" onClick={ handleClearClicked }>Clear</Button>
                        </Box>
                    </Grid>
                </Grid>
                </Box>
            </form>
        </div>

    );
};

export default Search;