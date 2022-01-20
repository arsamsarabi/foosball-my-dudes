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
    creator: Player!
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
    resourceId: String
    notificationType: NotificationType!
    done: Boolean
  }

  type PlayerStat {
    playerId: String!
    gamesPlayed: Int!
    gamesWon: Int!
    gamesLost: Int!
    gamesTied: Int!
    goalsScored: Int!
    goalsConceded: Int!
    playerScore: Float!
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

  input FetchMyNotificationsInput {
    id: String!
    includeDone: Boolean
  }

  input FetchMyGamesInput {
    playerId: String!
    skip: Int!
    limit: Int!
  }

  input FetchLeaderboardInput {
    players: [String!]!
  }

  type Query {
    ping: String!
    fetchPlayer(input: FetchPlayerInput!): Player
    fetchPlayerByEmail: Player
    fetchGame(input: FetchGameInput!): Game
    searchPlayersByTag(input: SearchPlayersByTagInput!): Player
    sendFriendRequest(input: SendFriendRequestInput!): String
    fetchMyNotifications(input: FetchMyNotificationsInput!): [Notification]!
    fetchMyGames(input: FetchMyGamesInput!): [Game]!
    fetchLeaderboard(input: FetchLeaderboardInput!): [PlayerStat]!
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
    picture: String
    friends: [String]
    friendRequests: [String]
  }

  input CreateGameInput {
    teamOne: [String!]!
    teamTwo: [String!]!
    teamOneScore: Int!
    teamTwoScore: Int!
    creator: String!
  }

  input CreateNotificationInput {
    from: String!
    to: String!
    context: NotificationContext!
    resourceId: String
    notificationType: NotificationType!
  }

  input MarkNotificationAsDoneInput {
    id: String!
  }

  input FriendRequestsPlayerInput {
    id: String!
    friends: [String]!
    friendRequests: [String]!
  }

  input AcceptFriendRequestInput {
    from: FriendRequestsPlayerInput!
    to: FriendRequestsPlayerInput!
  }

  input RejectFriendRequestInput {
    from: FriendRequestsPlayerInput!
    to: FriendRequestsPlayerInput!
  }

  type Mutation {
    createPlayer(input: CreatePlayerInput!): Player
    updatePlayer(input: UpdatePlayerInput!): Player
    createGame(input: CreateGameInput!): Game
    createNotification(input: CreateNotificationInput!): Notification
    markNotificationAsDone(input: MarkNotificationAsDoneInput!): Notification
    acceptFriendRequest(input: AcceptFriendRequestInput!): String
    rejectFriendRequest(input: RejectFriendRequestInput!): String
  }
`;
