export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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

export interface CreatePlayerInput {
  nickname: Scalars['String'];
}

export interface FetchPlayerByIdInput {
  id: Scalars['String'];
}

export interface Game {
  __typename?: 'Game';
  createdAt: Scalars['String'];
  teamOne: Array<Player>;
  teamOneScore: Scalars['Int'];
  teamTwo: Array<Player>;
  teamTwoScore: Scalars['Int'];
}

export interface Mutation {
  __typename?: 'Mutation';
  createPlayer?: Maybe<Player>;
  fetchPlayerById?: Maybe<Player>;
}


export interface MutationCreatePlayerArgs {
  input: CreatePlayerInput;
}


export interface MutationFetchPlayerByIdArgs {
  input: FetchPlayerByIdInput;
}

export interface Player {
  __typename?: 'Player';
  createdAt: Scalars['String'];
  friends: Array<Maybe<Player>>;
  nickname: Scalars['String'];
  tag: Scalars['String'];
}

export interface Query {
  __typename?: 'Query';
  ping: Scalars['String'];
}
