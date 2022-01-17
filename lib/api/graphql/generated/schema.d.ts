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

export interface CreateGameInput {
  teamOne: Array<Scalars['String']>;
  teamOneScore: Scalars['Int'];
  teamTwo: Array<Scalars['String']>;
  teamTwoScore: Scalars['Int'];
}

export interface CreateNotificationInput {
  context: NotificationContext;
  from: Scalars['String'];
  notificationType: NotificationType;
  resourceUrl?: InputMaybe<Scalars['String']>;
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

export interface FetchNotificationInput {
  id: Scalars['String'];
  includeDone?: InputMaybe<Scalars['Boolean']>;
}

export interface FetchPlayerInput {
  id: Scalars['String'];
}

export interface Game {
  __typename?: 'Game';
  createdAt: Scalars['String'];
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
  createGame?: Maybe<Game>;
  createNotification?: Maybe<Notification>;
  createPlayer?: Maybe<Player>;
  markNotificationAsDone?: Maybe<Notification>;
  updatePlayer?: Maybe<Player>;
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
  resourceUrl?: Maybe<Scalars['String']>;
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

export interface Query {
  __typename?: 'Query';
  fetchGame?: Maybe<Game>;
  fetchNotification?: Maybe<Notification>;
  fetchPlayer?: Maybe<Player>;
  fetchPlayerByEmail?: Maybe<Player>;
  ping: Scalars['String'];
  searchPlayersByTag?: Maybe<Player>;
  sendFriendRequest?: Maybe<Scalars['String']>;
}


export interface QueryFetchGameArgs {
  input: FetchGameInput;
}


export interface QueryFetchNotificationArgs {
  input: FetchNotificationInput;
}


export interface QueryFetchPlayerArgs {
  input?: InputMaybe<FetchPlayerInput>;
}


export interface QuerySearchPlayersByTagArgs {
  input?: InputMaybe<SearchPlayersByTagInput>;
}


export interface QuerySendFriendRequestArgs {
  input: SendFriendRequestInput;
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
  tag?: InputMaybe<Scalars['String']>;
}
