import { gql } from "apollo-server-micro";

export default gql`
  type Player {
    id: String
    nickname: String!
    friends: [Player]!
    tag: String!
    createdAt: String!
    updatedAt: String!
    picture: String
  }

  type Game {
    id: String
    teamOne: [Player!]!
    teamTwo: [Player!]!
    teamOneScore: Int!
    teamTwoScore: Int!
    createdAt: String!
    updatedAt: String!
  }

  input FetchGameInput {
    id: String!
  }

  input SearchPlayersByTagInput {
    tag: String!
  }

  type Query {
    ping: String!
    fetchPlayer: Player
    fetchGame(input: FetchGameInput!): Game
    searchPlayersByTag(input: SearchPlayersByTagInput): Player
  }

  input CreatePlayerInput {
    nickname: String!
  }

  input UpdatePlayerInput {
    id: String
    nickname: String
    tag: String
  }

  input CreateGameInput {
    teamOne: [String!]!
    teamTwo: [String!]!
    teamOneScore: Int!
    teamTwoScore: Int!
  }

  type Mutation {
    createPlayer(input: CreatePlayerInput!): Player
    updatePlayer(input: UpdatePlayerInput!): Player
    createGame(input: CreateGameInput!): Game
  }
`;
