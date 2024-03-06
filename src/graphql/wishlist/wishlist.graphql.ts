import { gql } from "@apollo/client";

export const GENERATE_WISHLIST = gql`
    mutation createAWishlist ($object: CreateWishlistDTO!) {
        createAWishlist (object: $object){
            id
            userId
        }
    }
`

export const ADD_PRODUCT_WISHLIST = gql `
    mutation addProductInWishlist($object: AddProductWishlistDTO!){
        addProductInWishlist(object: $object){
            id
            name
            reference
            description
            price
        }
    }
`

export const GET_ITEMS_WISHLIST = gql `
    query getItemsWishlist($wishlistId: String!) {
        getItemsWishlist(wishlistId: $wishlistId){
            id
            name
            reference
            price
            sizes {
                id
                name
                stockQuantity
            }
            images {
                name
                url
                seqNum
                colorId
            }
            colors {
                id
                name
                codeHex
            }
        }
    }
`