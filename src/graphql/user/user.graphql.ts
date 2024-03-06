import { gql } from "@apollo/client";

export const GENERATE_USER_VISITOR = gql`
    mutation createAnonymousUser {
        createAnonymousUser {
            id
            name
        }
    }
`

export const CONSULTING_USER_EXIST = gql `
    query getUserById($user_code: String!){
        getUserById(user_code: $user_code){
            id
            email
            password
            name
            lastName
        }
    }
`