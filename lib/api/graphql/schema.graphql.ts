import { gql } from "apollo-server-micro";

export default gql`
  type Player {
    id: String
    email: String!
    nickname: String!
    friends: [Player]!
    tag: String!
    createdAt: String!
    updatedAt: String!
    picture: String
    friendRequests: [Player]!
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

  enum NotificationContext {
    Game
    Comment
    Player
  }

  enum NotificationType {
    GAME_RECORDED
    COMMENT_RECEIVED
    FRIEND_REQUEST
  }

  type Notification {
    id: String
    from: Player!
    to: Player!
    context: NotificationContext!
    resourceUrl: String
    notificationType: NotificationType!
    done: Boolean
  }

  input FetchPlayerInput {
    id: String!
  }

  input FetchGameInput {
    id: String!
  }

  input SearchPlayersByTagInput {
    tag: String!
  }

  input SendFriendRequestInput {
    myId: String!
    theirId: String!
  }

  input FetchNotificationInput {
    id: String!
    includeDone: Boolean
  }

  type Query {
    ping: String!
    fetchPlayer(input: FetchPlayerInput): Player
    fetchPlayerByEmail: Player
    fetchGame(input: FetchGameInput!): Game
    searchPlayersByTag(input: SearchPlayersByTagInput): Player
    sendFriendRequest(input: SendFriendRequestInput!): String
    fetchNotification(input: FetchNotificationInput!): Notification
  }

  input CreatePlayerInput {
    nickname: String!
    picture: String
    email: String!
  }

  input UpdatePlayerInput {
    id: String!
    nickname: String
    tag: String
    friends: [String]
    friendRequests: [String]
  }

  input CreateGameInput {
    teamOne: [String!]!
    teamTwo: [String!]!
    teamOneScore: Int!
    teamTwoScore: Int!
  }

  input CreateNotificationInput {
    from: String!
    to: String!
    context: NotificationContext!
    resourceUrl: String
    notificationType: NotificationType!
  }

  input MarkNotificationAsDoneInput {
    id: String!
  }

  type Mutation {
    createPlayer(input: CreatePlayerInput!): Player
    updatePlayer(input: UpdatePlayerInput!): Player
    createGame(input: CreateGameInput!): Game
    createNotification(input: CreateNotificationInput!): Notification
    markNotificationAsDone(input: MarkNotificationAsDoneInput!): Notification
  }
`;
