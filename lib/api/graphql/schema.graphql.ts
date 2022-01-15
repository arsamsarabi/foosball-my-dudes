import { gql } from "apollo-server-micro";

export default gql`
  type Player {
    nickname: String!
    friends: [Player]!
    tag: String!
    createdAt: String!
  }

  type Game {
    teamOne: [Player!]!
    teamTwo: [Player!]!
    teamOneScore: Int!
    teamTwoScore: Int!
    createdAt: String!
  }

  type Query {
    ping: String!
  }

  input FetchPlayerByIdInput {
    id: String!
  }

  input CreatePlayerInput {
    nickname: String!
  }

  type Mutation {
    createPlayer(input: CreatePlayerInput!): Player
    fetchPlayerById(input: FetchPlayerByIdInput!): Player
  }
`;
