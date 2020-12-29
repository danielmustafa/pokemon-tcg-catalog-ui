import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Queries from '../../Constants/Queries/Queries'

class PokemonGQLClient {
    constructor(uri) {
        this.client = new ApolloClient({ uri: uri, cache: new InMemoryCache() })
    }
    
    getCards(args) {
        let query = gql(Queries.GET_CARDS)
        return this.client.query({ query: query, variables: args })
    }

    getSets() {
        let query = gql(Queries.GET_SETS)
        //hardcoding updatedSince so we dont get sets older than 2015 that haven't been updated
        let updatedSince = "01-01-2015"
        return this.client.query({ query: query, variables: { updatedSince: updatedSince}})
    }

}

export default PokemonGQLClient