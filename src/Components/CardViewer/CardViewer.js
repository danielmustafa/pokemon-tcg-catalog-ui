import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import Filters from './Filters';
import _, { forIn } from 'lodash'

const CardViewer = ({ cards }) => {
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
            for (var key of Object.keys(card)) {
                if (_.includes(CARD_FILTERS, key)) {
                    if (!(key in filters)) {
                        filters[key] = []
                    }

                    if (card[key] != null) {

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

        for (var filter of Object.keys(filters)) {
            var values = filters[filter]
            filters[filter] = _.uniq(values)

            let filtersObjs = filters[filter].map(filterValue => {
                return {
                    key: filterValue,
                    selected: false
                }
            })
            filters[filter] = filtersObjs
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

        /* filterType: [
            {
                key: String,
                selected: boolean
            }
        ] */
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

        /*         const filterCards = (cards, filters) => {
                    cards = cards.filter(card => {
                        return !_.isNull(card.types)
                    })
                        .filter(card => {
                            return card.types.some(type => filters.includes(type))
                        })
                    return cards
                }
        
                let typeFilters = getCheckedTypeFilters()
                if (!_.isEmpty(typeFilters)) {
                    displayableCards = filterCards(displayableCards, typeFilters)
                } */

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
        <div>
            {cardResultsNotEmpty() && <Filters filters={filters} onFilterSelected={onFilterSelected} />}
            {cardResultsNotEmpty() && <h4>Showing: {filteredCardCount}/{cardResultsCount}</h4>}
            {cardResultsNotEmpty() && displayCards()}
        </div>
    );
};

export default CardViewer;