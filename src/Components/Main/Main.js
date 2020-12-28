import { React, useState } from 'react'
import _ from 'lodash'
import Search from '../Search/Search'
import CardViewer from '../CardViewer/CardViewer'

export const Main = (props) => {
    const [cardState, setCardState] = useState([])
    const [alertState, setAlertState] = useState("")

    console.log('main - render')

    const showNoResultsFound = () => {
        setAlertState("No results found")
    }

    const handleSearchResults = (results) => {
        if (_.isEmpty(results)) {
            showNoResultsFound()
        } else {
            setAlertState(null)    
        }
        setCardState(results)
    }

    const onSearching = () => {
        setAlertState("Searching...")
    }

    return (
        <div>
            <Search handleSearch={handleSearchResults} onSearching={onSearching} />
            <br />
            {alertState}
            <div>
            {!_.isEmpty(cardState) && <CardViewer cards={cardState} />}
            </div>

        </div>
    )
}