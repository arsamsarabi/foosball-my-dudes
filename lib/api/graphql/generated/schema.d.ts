export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

export interface AcceptFriendRequestInput {
  from: FriendRequestsPlayerInput;
  to: FriendRequestsPlayerInput;
}

export interface CreateGameInput {
  creator: Scalars['String'];
  teamOne: Array<Scalars['String']>;
  teamOneScore: Scalars['Int'];
  teamTwo: Array<Scalars['String']>;
  teamTwoScore: Scalars['Int'];
}

export interface CreateNotificationInput {
  context: NotificationContext;
  from: Scalars['String'];
  notificationType: NotificationType;
  resourceId?: InputMaybe<Scalars['String']>;
  to: Scalars['String'];
}

export interface CreatePlayerInput {
  email: Scalars['String'];
  nickname: Scalars['String'];
  picture?: InputMaybe<Scalars['String']>;
}

export interface FetchGameInput {
  id: Scalars['String'];
}

export interface FetchLeaderboardInput {
  players: Array<Scalars['String']>;
}

export interface FetchMyGamesInput {
  limit: Scalars['Int'];
  playerId: Scalars['String'];
  skip: Scalars['Int'];
}

export interface FetchMyNotificationsInput {
  id: Scalars['String'];
  includeDone?: InputMaybe<Scalars['Boolean']>;
}

export interface FetchPlayerInput {
  id: Scalars['String'];
}

export interface FriendRequestsPlayerInput {
  friendRequests: Array<InputMaybe<Scalars['String']>>;
  friends: Array<InputMaybe<Scalars['String']>>;
  id: Scalars['String'];
}

export interface Game {
  __typename?: 'Game';
  createdAt: Scalars['String'];
  creator: Player;
  id?: Maybe<Scalars['String']>;
  teamOne: Array<Player>;
  teamOneScore: Scalars['Int'];
  teamTwo: Array<Player>;
  teamTwoScore: Scalars['Int'];
  updatedAt: Scalars['String'];
}

export interface MarkNotificationAsDoneInput {
  id: Scalars['String'];
}

export interface Mutation {
  __typename?: 'Mutation';
  acceptFriendRequest?: Maybe<Scalars['String']>;
  createGame?: Maybe<Game>;
  createNotification?: Maybe<Notification>;
  createPlayer?: Maybe<Player>;
  markNotificationAsDone?: Maybe<Notification>;
  rejectFriendRequest?: Maybe<Scalars['String']>;
  updatePlayer?: Maybe<Player>;
}


export interface MutationAcceptFriendRequestArgs {
  input: AcceptFriendRequestInput;
}


export interface MutationCreateGameArgs {
  input: CreateGameInput;
}


export interface MutationCreateNotificationArgs {
  input: CreateNotificationInput;
}


export interface MutationCreatePlayerArgs {
  input: CreatePlayerInput;
}


export interface MutationMarkNotificationAsDoneArgs {
  input: MarkNotificationAsDoneInput;
}


export interface MutationRejectFriendRequestArgs {
  input: RejectFriendRequestInput;
}


export interface MutationUpdatePlayerArgs {
  input: UpdatePlayerInput;
}

export interface Notification {
  __typename?: 'Notification';
  context: NotificationContext;
  done?: Maybe<Scalars['Boolean']>;
  from: Player;
  id?: Maybe<Scalars['String']>;
  notificationType: NotificationType;
  resourceId?: Maybe<Scalars['String']>;
  to: Player;
}

export type NotificationContext =
  | 'Comment'
  | 'Game'
  | 'Player';

export type NotificationType =
  | 'COMMENT_RECEIVED'
  | 'FRIEND_REQUEST'
  | 'GAME_RECORDED';

export interface Player {
  __typename?: 'Player';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  friendRequests: Array<Maybe<Player>>;
  friends: Array<Maybe<Player>>;
  id?: Maybe<Scalars['String']>;
  nickname: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
  tag: Scalars['String'];
  updatedAt: Scalars['String'];
}

export interface PlayerStat {
  __typename?: 'PlayerStat';
  gamesLost: Scalars['Int'];
  gamesPlayed: Scalars['Int'];
  gamesTied: Scalars['Int'];
  gamesWon: Scalars['Int'];
  goalsConceded: Scalars['Int'];
  goalsScored: Scalars['Int'];
  playerId: Scalars['String'];
  playerScore: Scalars['Int'];
}

export interface Query {
  __typename?: 'Query';
  fetchGame?: Maybe<Game>;
  fetchLeaderboard: Array<Maybe<PlayerStat>>;
  fetchMyGames: Array<Maybe<Game>>;
  fetchMyNotifications: Array<Maybe<Notification>>;
  fetchPlayer?: Maybe<Player>;
  fetchPlayerByEmail?: Maybe<Player>;
  ping: Scalars['String'];
  searchPlayersByTag?: Maybe<Player>;
  sendFriendRequest?: Maybe<Scalars['String']>;
}


export interface QueryFetchGameArgs {
  input: FetchGameInput;
}


export interface QueryFetchLeaderboardArgs {
  input: FetchLeaderboardInput;
}


export interface QueryFetchMyGamesArgs {
  input: FetchMyGamesInput;
}


export interface QueryFetchMyNotificationsArgs {
  input: FetchMyNotificationsInput;
}


export interface QueryFetchPlayerArgs {
  input: FetchPlayerInput;
}


export interface QuerySearchPlayersByTagArgs {
  input: SearchPlayersByTagInput;
}


export interface QuerySendFriendRequestArgs {
  input: SendFriendRequestInput;
}

export interface RejectFriendRequestInput {
  from: FriendRequestsPlayerInput;
  to: FriendRequestsPlayerInput;
}

export interface SearchPlayersByTagInput {
  tag: Scalars['String'];
}

export interface SendFriendRequestInput {
  myId: Scalars['String'];
  theirId: Scalars['String'];
}

export interface UpdatePlayerInput {
  friendRequests?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  friends?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id: Scalars['String'];
  nickname?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['String']>;
}
