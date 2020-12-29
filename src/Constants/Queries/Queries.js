const Queries = {
    GET_CARDS: `query getCards($name: String, $pageSize: Int, $page: Int = 1, $set: String) {
        cards(name: $name, page: $page, pageSize: $pageSize, set: $set) {
            id
            types
            name
            hp
            number
            subtype
            supertype
            rarity
            set
            setCode
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
    }`,

    GET_SETS: `query getSetsByUpdatedSince($updatedSince: String) {
        sets(updatedSince: $updatedSince) {
            name
        }
    }`
}

export default Queries;