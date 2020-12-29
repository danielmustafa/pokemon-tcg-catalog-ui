import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import Filters from './Filters';
import _, { forIn } from 'lodash'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import {makeStyles} from '@material-ui/core'

const useStyles = (themes) => makeStyles({

})


const CardViewer = ({ cards }) => {
    const classes = useStyles()
    const CARD_FILTERS = ["types", "subtype", "supertype", "rarity", "set"/* , "ability" */]
    const [cardState, setCardState] = useState([])
    const [cardsToDisplay, setCardsToDisplay] = useState([])
    const [filters, setFilters] = useState({})
    const [cardResultsCount, setCardResultsCount] = useState(0)
    const [filteredCardCount, setFilteredCardCount] = useState(0)

    useEffect(() => {
        setCardState(cards)
    }, [cards])

    useEffect(() => {
        updateFilters()
        updateCardsToDisplay()
        setFilteredCardCount(cardState.length)
        setCardResultsCount(cardState.length)
    }, [cardState])

    useEffect(() => {
        updateCardsToDisplay()
    }, [filters])

    useEffect(() => {
        setFilteredCardCount(cardsToDisplay.length)
    }, [cardsToDisplay])

    const cardResultsNotEmpty = () => {
        return !_.isEmpty(cardState)
    }

    const onFilterSelected = (event) => {
        console.log(event)
        let updatedFilters = {}
        Object.assign(updatedFilters, filters)

        let filterType = event.target.attributes.filtertype.value
        let filterValue = event.target.name
        let selected = event.target.checked

        var filtersByType = filters[filterType]
        let index = filtersByType.findIndex(f => { return f.key === filterValue })
        var filter = filtersByType[index]

        filter.selected = selected
        updatedFilters[filterType] = filtersByType

        setFilters(updatedFilters)
    }

    const updateFilters = () => {
        let filters = {}
        cardState.forEach(card => {
            //buildFiltersByType
            for (var key of Object.keys(card)) {
                if (_.includes(CARD_FILTERS, key)) {
                    if (!(key in filters)) {
                        filters[key] = []
                    }

                      //check if card attribute value is null or empty
                      if (!_.isNull(card[key]) && !_.isEmpty(card[key])) {

                        if (Array.isArray(card[key])) {
                            card[key].forEach(val => {
                                filters[key].push(val)
                            })
                        } else {
                            filters[key].push(card[key])
                        }

                    }
                }
            }
        })

        //For each filter value, add 'selected' bool
        for (var filterType of Object.keys(filters)) {
            var values = filters[filterType]
            filters[filterType] = _.uniq(values)

            if (filters[filterType].length <= 1) {
                delete filters[filterType]
            } else {
                let filtersObjs = filters[filterType].map(filterValue => {
                    return {
                        key: filterValue,
                        selected: false
                    }
                })
                filters[filterType] = filtersObjs
            }
        }

        setFilters(filters)
    }

    const displayCards = () => {
        return cardsToDisplay.map(card => {
            return <Card key={card.id} imageUrl={card.imageUrlHiRes} name={card.name} />
        })
    }

    const updateCardsToDisplay = () => {
        let displayableCards = []
        Object.assign(displayableCards, cardState)

        const filterCards = (cards, filterType, filterValues) => {
            let selectedFilterValues = filterValues.filter(values => {
                return values.selected === true
            }).map(values => {
                return values.key
            })

            if (!_.isEmpty(selectedFilterValues)) {

                cards = cards.filter(card => {
                    if (_.isArray(card[filterType])) {
                        return card[filterType] != null && card[filterType].some(value => selectedFilterValues.includes(value))
                    } else if (_.isString(card[filterType])) {
                        return card[filterType] != null && selectedFilterValues.includes(card[filterType])

                    }

                })

            }

            return cards
        }

        for (const [key, value] of Object.entries(filters)) {
            displayableCards = filterCards(displayableCards, key, value)
        }

        let cardsDisplayOnly = displayableCards.map(card => {
            return {
                id: card.id,
                name: card.name,
                imageUrlHiRes: card.imageUrlHiRes
            }
        })

        setCardsToDisplay(cardsDisplayOnly)
    }

    return (

        <Box margin="10px">
            <Grid container spacing={2}>

                <Grid item xs={1}>
                    {cardResultsNotEmpty() &&  <Filters filters={filters} onFilterSelected={onFilterSelected} />}
                </Grid>
                {/*                 <Grid item>
                    {cardResultsNotEmpty() && <h4>Showing: {filteredCardCount}/{cardResultsCount}</h4>}
                </Grid> */}
                <Grid item xs sm md >
                    {cardResultsNotEmpty() && displayCards()}
                </Grid>

            </Grid>
        </Box>

    );
};

export default CardViewer;