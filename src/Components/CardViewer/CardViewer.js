import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import Filters from './Filters';
import _ from 'lodash'

const CardViewer = ({cards}) => {
    const [cardState, setCardState] = useState([])
    const [typeFilterState, setTypeFilterState] = useState({})
    const [showFilterState, setShowFilterState] = useState(false)


    useEffect(() => {
        setCardState(cards)
    }, [cards])

    useEffect(() => { 
        setShowFilterState(!_.isEmpty(cardState)) 

        const updateTypeFilters = () => {
            let typeFilters = {}
            Array.from(new Set(cardState.map(card => {
                return card.types })
                .flatMap(type => {
                    return type
                }))).forEach(type => {
                    typeFilters[type] = true
                })
            setTypeFilterState(typeFilters)
        }


        updateTypeFilters()
    }, [cardState])

    const onFilterSelected = (event) => {
        let key = event.target.name
        let show = event.target.checked
        setTypeFilterState({
            ...typeFilterState,
            [key]: show,
        })
        console.log(typeFilterState)
    }

    const getUncheckedTypeFilters = () => {
        let uncheckedTypes = []
        for (var key of Object.keys(typeFilterState)) {
            if (typeFilterState[key] === false) {
                uncheckedTypes.push(key)
            }
        }
        return uncheckedTypes
    }

    const displayCards = () => {
        let cardsToDisplay = cardState

        const filterCards = (cards, filters) => {
            if (!_.isEmpty(filters)) {
                console.log(`filters: ${filters}`)
                cards = cards.filter(card => {
                    console.log(card)
                    //recheck this logic
                    return card.types.some(type => !filters.includes(type))
                })
            }
            return cards
        }

        cardsToDisplay = filterCards(cardsToDisplay, getUncheckedTypeFilters())

        return cardsToDisplay
    }

    return (
        <div>
            {showFilterState && <Filters filters={typeFilterState} onFilterSelected={ onFilterSelected } />}
            {!_.isEmpty(cardState) && displayCards().map(card => {
                return <Card key={card.id} imageUrl={card.imageUrlHiRes} name={card.name} />
            })}
        </div>
    );
};

export default CardViewer;