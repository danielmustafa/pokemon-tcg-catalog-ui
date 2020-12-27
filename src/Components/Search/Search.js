import { React, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import styles from './Search.module.css'

const Search = (props) => {
    const [formState, setFormState] = useState({ pageSize: 10})
    const client = new ApolloClient({ uri: 'http://localhost:4000', cache: new InMemoryCache() })
    const GET_CARDS = gql`
    query getCards($name: String, $pageSize: Int, $page: Int = 1) {
       cards(name: $name, page: $page, pageSize: $pageSize) {
           id
           types
           name
           hp
           number
           imageUrlHiRes
           ability {
               name
               text
               type
           }
           weaknesses {
               type
               value
               }
           }
   }`

    const handleChanged = (event) => {
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
        client.query({ query: GET_CARDS, variables: formState })
            .then(results => {
                console.log(results)
                props.handleSearch(results.data.cards)
            })
            .catch(err => {
                console.log(err)
                props.handleSearch([])
            })
        event.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSearchClicked}>
                <div>
                    <label>Pokemans: </label>
                    <input type="text" placeholder="pikachu" name="name" onChange={ handleChanged } />
                </div>
                <div>
                    <label>Limit results: </label>
                    <select name="pageSize" onChange={ handleChanged }  >
                        <option defaultValue value="10">10</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <div>
                    <input type="submit" value="Search" />
                </div>
            </form>
        </div>

    );
};

export default Search;