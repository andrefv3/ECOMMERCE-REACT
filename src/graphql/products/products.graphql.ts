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
                category {
                    id
                    name
                }
            }
        }
    }
`

export const PRODUCT_SINGLE = gql`
    query getProductById($object: ProductByIdDTO!){
        getProductById(object: $object){
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
                image
            }
            category {
                id
                name
            }
        }
    }
`