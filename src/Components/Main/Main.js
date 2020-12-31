import { React, useRef, useState } from 'react'
import _ from 'lodash'
import Search from '../Search/Search'
import CardViewer from '../CardViewer/CardViewer'
import { Button } from '@material-ui/core'
export const Main = (props) => {
    const [cardState, setCardState] = useState([])
    const [alertState, setAlertState] = useState("")
    

    console.log('main - render')

    const handleSearchResults = (results, alertMessage) => {
        if (_.isNull(results)) {
            //clear the card state
            setCardState([])
            return
        }

        if (_.isEmpty(results) && _.isNull(alertMessage)) {
            setAlertState("No results found")
        } else {
            setAlertState(alertMessage)
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