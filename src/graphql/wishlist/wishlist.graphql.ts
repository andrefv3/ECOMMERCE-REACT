import { gql } from "@apollo/client";

export const GENERATE_WISHLIST = gql`
    mutation createAWishlist ($object: CreateWishlistDTO!) {
        createAWishlist (object: $object){
            id
            userId
        }
    }
`