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

export interface CreatePlayerInput {
  nickname: Scalars['String'];
}

export interface FetchGameInput {
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

export interface Mutation {
  __typename?: 'Mutation';
  createGame?: Maybe<Game>;
  createPlayer?: Maybe<Player>;
  updatePlayer?: Maybe<Player>;
}


export interface MutationCreateGameArgs {
  input: CreateGameInput;
}


export interface MutationCreatePlayerArgs {
  input: CreatePlayerInput;
}


export interface MutationUpdatePlayerArgs {
  input: UpdatePlayerInput;
}

export interface Player {
  __typename?: 'Player';
  createdAt: Scalars['String'];
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
  fetchPlayer?: Maybe<Player>;
  ping: Scalars['String'];
  searchPlayersByTag?: Maybe<Player>;
}


export interface QueryFetchGameArgs {
  input: FetchGameInput;
}


export interface QuerySearchPlayersByTagArgs {
  input?: InputMaybe<SearchPlayersByTagInput>;
}

export interface SearchPlayersByTagInput {
  tag: Scalars['String'];
}

export interface UpdatePlayerInput {
  id?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['String']>;
}
