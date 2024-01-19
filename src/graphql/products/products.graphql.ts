import { gql } from "@apollo/client";

export const SEARCH_PRODUCTS = gql`
    query getProductsByFilter($object: ProductByFilterDTO!) {
        getProductsByFilter(object: $object){
            currentPage
            count
            listObject {
                id
                name
                reference
                price
            }
        }
    }
`