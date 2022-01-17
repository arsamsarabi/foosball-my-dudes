import { DeepPartial } from 'utility-types';
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<DeepPartial<Scalars['Boolean']>>;
  CreateGameInput: ResolverTypeWrapper<DeepPartial<CreateGameInput>>;
  CreatePlayerInput: ResolverTypeWrapper<DeepPartial<CreatePlayerInput>>;
  FetchGameInput: ResolverTypeWrapper<DeepPartial<FetchGameInput>>;
  Game: ResolverTypeWrapper<DeepPartial<Game>>;
  Int: ResolverTypeWrapper<DeepPartial<Scalars['Int']>>;
  Mutation: ResolverTypeWrapper<{}>;
  Player: ResolverTypeWrapper<DeepPartial<Player>>;
  Query: ResolverTypeWrapper<{}>;
  SearchPlayersByTagInput: ResolverTypeWrapper<DeepPartial<SearchPlayersByTagInput>>;
  String: ResolverTypeWrapper<DeepPartial<Scalars['String']>>;
  UpdatePlayerInput: ResolverTypeWrapper<DeepPartial<UpdatePlayerInput>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: DeepPartial<Scalars['Boolean']>;
  CreateGameInput: DeepPartial<CreateGameInput>;
  CreatePlayerInput: DeepPartial<CreatePlayerInput>;
  FetchGameInput: DeepPartial<FetchGameInput>;
  Game: DeepPartial<Game>;
  Int: DeepPartial<Scalars['Int']>;
  Mutation: {};
  Player: DeepPartial<Player>;
  Query: {};
  SearchPlayersByTagInput: DeepPartial<SearchPlayersByTagInput>;
  String: DeepPartial<Scalars['String']>;
  UpdatePlayerInput: DeepPartial<UpdatePlayerInput>;
}>;

export type GameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  teamOne?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType>;
  teamOneScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  teamTwo?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType>;
  teamTwoScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createGame?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType, RequireFields<MutationCreateGameArgs, 'input'>>;
  createPlayer?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<MutationCreatePlayerArgs, 'input'>>;
  updatePlayer?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<MutationUpdatePlayerArgs, 'input'>>;
}>;

export type PlayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  friends?: Resolver<Array<Maybe<ResolversTypes['Player']>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  fetchGame?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType, RequireFields<QueryFetchGameArgs, 'input'>>;
  fetchPlayer?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType>;
  ping?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  searchPlayersByTag?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<QuerySearchPlayersByTagArgs, never>>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Game?: GameResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

