import { gql } from "@apollo/client";

export const GENERATE_USER_VISITOR = gql`
    mutation createAnonymousUser {
        createAnonymousUser {
            id
            name
        }
    }
`